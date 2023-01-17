const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageINP');
const messageContainer = document.querySelector(".container");

var audio = new Audio('beep.mp3');




//creating append function to put message in the box
const append = (message, position)=>{
    const messageElement = document.createElement('div'); //div creating for new message
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position == 'left'){
        audio.play();
    }

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const Name = prompt("Enter your name to join: ");
socket.emit('new-user-joined', Name);



//user-joined event listening
socket.on('user-joined', Name=>{
    append(`${Name} joined the chat`, 'left')
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message} `, 'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`, 'left')
})
