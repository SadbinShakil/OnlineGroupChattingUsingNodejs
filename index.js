// node server which will handle socket io connections
// const io = require('socket.io')(8000);
const users = {}; //for all the users

const express = require("express")
var app = express();
var server = app.listen(8000);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

// for
const PORT = process.env.PORT || 3030;

// your code

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});


//when new user joined
io.on('connection', socket=>{
    socket.on('new-user-joined', name =>{  //new-user-joined is an event
        // console.log("new user: ", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //let everyone know he/she joined
    });
//send-message, receive is all  custom events
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]}) 
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
});