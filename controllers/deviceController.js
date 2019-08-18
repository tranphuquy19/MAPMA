const os = require('os');
const packageInfo = require('../package.json');

exports.node_homepage = (req, res, next) => {
    res.render('index', { title: 'MAPMA - Make Android phone more Awesome!' });
};
exports.node_info = {
    arch: os.arch(),
    freemem: os.freemem(),
    totalmem: os.totalmem(),
    homedir: os.homedir(),
    hostname: os.hostname(),
    platform: os.platform(),
    ostype: os.type(),
    nodeversion: process.version,
    expressVer: packageInfo.dependencies['express'],
    ejsVer: packageInfo.dependencies['ejs'],
    socketioVer: packageInfo.dependencies['socket.io']
}