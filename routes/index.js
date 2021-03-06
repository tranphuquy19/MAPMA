var deviceInfoController = require('../controllers/deviceController');

module.exports = (io) => {
    var express = require('express');
    var router = express.Router();
    io.on('connection', (socket) => {
        socket.on('BN9ziWLi4nIzkuRK', (data)=>{
            io.sockets.emit('mess', {id: socket.id.slice(0, 5), mess: data});
        })

        socket.on('disconnect', () => {
            io.sockets.emit('mess', {id: socket.id.slice(0, 5), mess: 'is disconnected!'});
        })


    })
    router.get('/', deviceInfoController.node_homepage)
    return router;
}
