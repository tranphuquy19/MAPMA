var deviceInfoController = require('../controllers/deviceController');

function isTerminalAgent(req) {
    return req.headers['user-agent'].toLowerCase().indexOf('curl') > -1 || req.headers['user-agent'].toLocaleLowerCase().indexOf('wget') > -1;
}

const messages = [];
const messageWithId = {};

function encodeStr(str) {
    return str.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
module.exports = (io) => {
    var express = require('express');
    var router = express.Router();
    io.on('connection', (socket) => {
        socket.on('BN9ziWLi4nIzkuRK', (data) => {
            io.sockets.emit('mess', { id: socket.id.slice(0, 5), mess: data });
            messages.push(data);
            messageWithId[socket.id] = data;
        })

        socket.on('disconnect', () => {
            // io.sockets.emit('mess', { id: socket.id.slice(0, 5), mess: 'is disconnected!' });
        })


    })
    router.get('/', (req, res, next) => {
        if (isTerminalAgent(req)) {
            res.send(messages.join('\n===================================================================\n') + '\n');
        } else {
            res.render('index', { title: 'MAPMA - Make Android phone more Awesome!' });
        }
    })
    router.get('/old_messages', (req, res, next) => {
        res.send(messages.map(mess => `<code><pre>${encodeStr(mess)}</pre></code>`).join('<hr>'));
    })
    router.get('/raw', (req, res, next) => {
        res.send(messages.join('\n===================================================================\n') + '\n');
    })
    router.get('/docs', (req, res, next) => {
        res.send('Coming soon!');
    })
    router.post('/', (req, res, next) => {
        console.log(req.body);
        let b = new Buffer.from(`${Object.keys(req.body)[0]}==`.replaceAll(' ', '+'), 'base64')
        let content = b.toString();
        io.sockets.emit('mess', { id: 'curl', mess: content })
        res.send(content);
    })
    router.get('/:index', (req, res, next) => {
        const _index = +req.params['index']
        const _mess = messages[messages.length - _index];
        let withColor = true;

        if (req.query['color']) {
            withColor = (req.query['color'].toLowerCase() === 'true');
        }

        if (!_mess) {
            res.send('echo Null')
        } else {
            if (isTerminalAgent(req)) {
                let content = '';
                const header = `======Message ${_index} of ${messages.length}======`;
                if (withColor) {
                    content = `printf "\\033[0;33m${header}\\033[0m\n\\033[0;36m${_mess}\\033[0m\n\\033[0;33m${"=".repeat(header.length)}\\033[0m\n"
${_mess}
`;
                } else {
                    content = `printf "${header}\n${_mess}\n\"
${_mess}
`;
                }
                res.send(content);
            } else {
                res.send(_mess + '\n');
            }
        }
    })
    return router;
}
