require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const package = require('./package.json')
const router = require('./routes')
const cors = require('./utils/cors')
const { User } = require('./data')
const fs = require('fs')
const http = require('http')
const https = require('https')
const sio = require('socket.io')
const compression = require('compression')

const { env: { PORT, HTTPS_PORT, MONGO_URL } } = process

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log(`db server running at ${MONGO_URL}`)

        const { argv: [, , port = PORT || 8080, httpsPort = HTTPS_PORT] } = process

        const app = express()

        // const options = { 
        //     key: fs.readFileSync('./rtc-video-room-key.pem'),
        //     cert: fs.readFileSync('./rtc-video-room-cert.pem')
        // }

        // http.createServer(app).listen(port);
        // https.createServer(options, app).listen(httpsPort);

        const server = require('http').Server(app)

        app.use(cors)
        app.use('/api', router)

        const io = sio(server)

        // app.disable('x-powered-by');

        io.sockets.on('connection', socket => {
            let room = '';

            const create = err => {
                if (err) {
                return console.log(err);
                }
                socket.join(room);
                socket.emit('create');
            };

            // sending to all clients in the room (channel) except sender
            socket.on('message', message => socket.broadcast.to(room).emit('message', message));

            socket.on('find', () => {
                const url = socket.request.headers.referer.split('/');
                room = url[url.length - 1];
                const sr = io.sockets.adapter.rooms[room];
                if (sr === undefined) {
                // no room with such name is found so create it
                socket.join(room);
                socket.emit('create');
                } else if (sr.length === 1) {
                socket.emit('join');
                } else { // max two clients
                socket.emit('full', room);
                }
            });

            socket.on('auth', data => {
                data.sid = socket.id;
                // sending to all clients in the room (channel) except sender
                socket.broadcast.to(room).emit('approve', data);
            });

            socket.on('accept', id => {
                io.sockets.connected[id].join(room);
                // sending to all clients in 'game' room(channel), include sender
                io.in(room).emit('bridge');
            });

            socket.on('reject', () => socket.emit('full'));
            // socket.on('leave', () => {
            //     // sending to all clients in the room (channel) except sender
            //     socket.broadcast.to(room).emit('hangup');
            //     socket.leave(room);
            // });
            // socket.on('chat', function(data){
            //     // console.log(data);
            //     io.sockets.emit('chat', data);
            // });

                // Handle typing event
            // socket.on('typing', function(data){
            //   socket.broadcast.emit('typing', data);
            // });
        })

        server.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))
    })
    .catch(console.error)