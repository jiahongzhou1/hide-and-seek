import {io}  from 'socket.io-client'

const msgButton = document.getElementById(btn-msg);
const roomButton = document.getElementById(btn-room);

const list = document.getElementById(list);

const socket = io('ws://localhost:8080')

socket.on('connect' , () => {
    const text = document.createElement('li');
    text.innerHTML(`${socket.id} joined the room`)
    list.appendChild(text)
})
