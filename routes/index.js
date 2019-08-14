var deviceInfo = require('../controllers/deviceController');

module.exports = (io) => {
    var express = require('express');
    var router = express.Router();
    io.on('connection', (socket) => {
        console.log(socket.id);
        socket.on('disconnect', () => {
            console.log(socket.id + " disconnected");
        })
    })
    router.get('/', deviceInfo.node_info)
    return router;
}
