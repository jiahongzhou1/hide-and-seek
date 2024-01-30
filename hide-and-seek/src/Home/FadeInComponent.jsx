import React, { useState } from "react";
import { useSocket } from "../SocketProvider.jsx";
import "./FadeInComponent.css";
import { Link, redirect } from "react-router-dom";
function FadeInComponent() {
  const [isComponentVisible, setComponentVisibility] = useState(false);

  const toggleComponentVisibility = () => {
    setComponentVisibility(!isComponentVisible);
  };

  return (
    <div>
      {!isComponentVisible && (
        <button className="bottoneGioca" onClick={toggleComponentVisibility}>
          PLAY
        </button>
      )}
      <div
        className={
          "fade-in-component " +
          `${isComponentVisible ? "fade-in" : "fade-out"}`
        }
      >
        {isComponentVisible && <MyComponent />}
      </div>
    </div>
  );
}

const MyComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const { socket, connectSocket } = useSocket();
  function createRoom() {
    socket.emit("createRoom", (roomID) => {
      console.log(roomID);
      redirect("/Lobby")
    });
  }
  const joinRoom = ()=> {
    socket.emit('joinRoom',inputValue , cb => {
      console.log(cb)
      redirect("/Lobby")
    })
  }
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <div className="buttons">
        <div>
          <button className="buttonAlone" onClick={createRoom}>
            <Link to="/Lobby">Create a Room</Link>
          </button>
        </div>
        <p>OR</p>
        <div className="pulsante">
          <input type="text" placeholder="Room Id" onChange={handleChange}/>
          <button className="buttonWithInput" onClick={joinRoom}>
            <Link to="/Lobby">Join Room</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default FadeInComponent;
