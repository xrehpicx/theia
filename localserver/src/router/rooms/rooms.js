const socket = require('socket.io');



var rooms = {};
module.exports = class RoomManager {
    constructor(http) {
        this.io = socket(http);

    }
    addRoom = (room) => {

        if (!rooms[room]) {

            //NEW CONECTION TO ROOM OPENED
            const nsp = this.io.of(`/${room}`);

            nsp.on('connection', socket => {
                rooms[room] = {};
                let user;
                //MESSAGE DELIVERY
                socket.on('message', message => {
                    socket.broadcast.emit('recieve', message);
                });

                //NEW USER JOINED NOTIFICATION
                socket.on('join', username => {


                    socket.broadcast.emit('events', JSON.stringify({
                        name: 'userjoinleave',
                        data: {
                            user: `${username} has joined`
                        },
                        time: new Date()
                    }));
                    user = username;



                });

                //USER LEAVES
                socket.on('disconnect', () => {
                    this.rooms[room][username] = { state: 0 };
                    if (user) {
                        socket.broadcast.emit('events', JSON.stringify({
                            name: 'userjoinleave',
                            data: {
                                user: `${user} has left`
                            },
                            time: new Date()
                        }));
                    }
                });

                //USER TYPING
                socket.on('typing', txt => {
                    const txtObj = JSON.parse(txt);

                    socket.broadcast.emit('events', JSON.stringify({
                        name: 'typing',
                        data: {
                            user: txtObj.user,
                            body: txtObj.body,
                        }
                    }));
                });
                /* socket.on('test', data => console.log(data)); */
            });
            /* this.rooms.push(room); */
            return `${room}`;
        } return `${room} is joined`;
    }
}

