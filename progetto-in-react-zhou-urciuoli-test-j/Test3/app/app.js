//will start connection to the URL specifide (remember to use ws protocol !!)
const socket = io("http://localhost:8080");
let room = "";
socket.on("messageWId", (text,id) => {  
  displayText(text,id);
});

function displayText(text,id){  
  const el = document.createElement("li");
  el.innerHTML = id + " said " +text;
  document.querySelector("ul").appendChild(el);
 
}

document.querySelector("#btn-msg").onclick = () => {
  const text = document.querySelector("#message").value;
  socket.emit("messageWId", text ,room);
  displayText(text,socket.id);
};  

document.querySelector("#btn-room").onclick = () => {
  const text = document.querySelector("#room").value;
  room = text;
  console.log(room)
};  
