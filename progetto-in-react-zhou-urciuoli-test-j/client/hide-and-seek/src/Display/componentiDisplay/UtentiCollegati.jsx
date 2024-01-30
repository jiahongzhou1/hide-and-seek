import React, { useEffect, useState } from "react";
import "./UtentiCollegati.css";
import { useSocket } from "../../SocketProvider";

function UtentiCollegati() {
  const [playerIds, setPlayerIds] = useState([]);
  const [roomId, setRoomId] = useState();
  const { socket } = useSocket();

  useEffect(() => {
    socket.emit("uptRoom");
    socket.on("updateRoom", (updatedRoom, roomId) => {
      if (updatedRoom.socketIds.includes(socket.id)) {
        console.log(updatedRoom);
        setPlayerIds(updatedRoom.socketIds);
        setRoomId(roomId);
      }
    });
  }, [socket]);

  return (
    <div className="ContenitoreListaUtenti">
      <h2>Connected Users</h2>
      <ul>
        {playerIds.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </div>
  );
}

export default UtentiCollegati;
