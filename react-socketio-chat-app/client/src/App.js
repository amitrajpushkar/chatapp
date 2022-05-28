import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App" style={{
      background:"#8360c3", 
      background: -"webkit-linear-gradient(to right, #2ebf91, #8360c3)",
      background: "linear-gradient(to right, #2ebf91, #8360c3)" ,

    }}>
      {!showChat ? (
        <div className="joinChatContainer" style={{
          background:"#ffffff",
          borderRadius:"15px",
          width:"500px"
        }}>
          <h4> Chat-Room </h4>
        
          <input style={{
            width:"470px",
            margin:"10px",
            borderColor:"#6368B3"
          }}
            type="text"
            placeholder="User name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input style={{
            width:"470px",
            margin:"10px",
            borderColor:"#6368B3"
          }}
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button style={{
            width:"440px",
            margin:"30px",
            background:"#6368B3",
            borderRadius:"25px"

          }} onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
