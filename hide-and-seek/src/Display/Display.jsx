import { useEffect, useState } from "react";
import Mappa from "./componentiDisplay/Mappa";
import UtentiCollegati from "./componentiDisplay/UtentiCollegati";
import "./Display.css";
import { useSocket } from "../SocketProvider";

function Display() {
  const { socket } = useSocket();
  const [playersInSameRoom, setPlayersInSameRoom] = useState([]);

  useEffect(() => {
    socket.on("playersCoordinates", (playerMapCoords) => {
      setPlayersInSameRoom(playerMapCoords);
      console.log("Players in the same room:", playersInSameRoom);
    });
  }, [socket]);

  useEffect(() => {
    const sendCoordinates = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("coordinates", socket.id, { latitude, longitude });
        console.log("Coordinates sent:", latitude, longitude);
        console.log("Players in the same room:", playersInSameRoom);
      });
    };

    sendCoordinates();
    const intervalId = setInterval(sendCoordinates, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [socket]);

  return (
    <div>
      <UtentiCollegati />
      <Mappa playerCords={playersInSameRoom} />
    </div>
  );
}

export default Display;
