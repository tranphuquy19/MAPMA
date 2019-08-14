var deviceInfoController = require('../controllers/deviceController');

module.exports = (io) => {
    var express = require('express');
    var router = express.Router();
    // io.on('connection', (socket) => {
    //     socket.on('clickEvent', (data) => {
    //         console.log(socket.id + ' send:' + data);
    //         setInterval((data)=>{
    //             io.sockets.emit('server-response', 'xxx')
    //         }, 3000)
    //     })

    //     // socket.on('disconnect', () => {
    //     //     console.log(socket.id + ' disconnected');
    //     // })


    // })
    router.get('/', deviceInfoController.node_homepage)
    return router;
}
