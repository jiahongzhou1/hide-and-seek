import React, { useEffect, useState } from "react";
import { useSocket } from "../SocketProvider.jsx";
import "./Lobby.css";
import { redirect, useNavigate } from "react-router-dom";

function Lobby() {
  const [playerIds, setPlayerIds] = useState([]);
  const { socket } = useSocket();
  const [isLeaderGroup, setIsLeaderGroup] = useState(false);
  const [roomId, setRoomId] = useState("none");
  const navigate = useNavigate()
  useEffect(() => {
    socket.on("updateRoom", (updatedRoom , roomId) => {
      if (updatedRoom.socketIds.includes(socket.id)) {
        setPlayerIds(updatedRoom.socketIds);
        setRoomId(roomId);
      }
      socket.on("isLeader", () => {
        setIsLeaderGroup(true);
      });
      socket.on("startGame", () => {
        console.log("Game started");
        navigate("/Game")
      });
    });
  }, [socket]);

  const startGame = () => {
    if (isLeaderGroup) {
      socket.emit("startGameServer" , roomId);
      navigate("/Game")
    }
  };
  return (
    <>
      <div className="backGrownd">
        <div className="Player-Holder">
          <h1>Room ID : { roomId }</h1>
          <h2>Player IDs:</h2>
          <ol>
            {playerIds.map((playerId) => (
              <li key={playerId}>{playerId}</li>
            ))}
          </ol>
        </div>
        {isLeaderGroup ? (
          <button className="startButton" onClick={startGame}>
            Start Game
          </button>
        ) : (
          <span />
        )}
      </div>
    </>
  );
}

export default Lobby;
