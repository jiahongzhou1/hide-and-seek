import "./Mappa.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSocket } from "../../SocketProvider";
import { Marker, Popup, useMap } from "react-leaflet";

function Mappa({ playerCords }) {
  const [playersInSameRoom, setPlayersInSameRoom] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    setPlayersInSameRoom(playerCords);
    console.log("coc", playersInSameRoom);
  }, [playerCords]);

  useEffect(() => {
    SetViewComponent();
  }, []);

  return (
    <>
      <MapContainer
        center={[0, 0]}
        zoom={13}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {playersInSameRoom.map((player, index) => (
          <Marker
            key={index}
            position={[player[1].latitude, player[1].longitude]}
          >
            <Popup>
              {player[0] === socket.id ? "YOU" + player[0] : player[0]}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default Mappa;
