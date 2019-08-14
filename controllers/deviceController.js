const os = require('os');

exports.node_homepage = (req, res, next) => {
    res.render('index', { title: 'MAPMA - Make Android phone more Awesome!' });
};
exports.node_info = {
    arch: os.arch(),
    cpus: os.cpus(),
    freemen: os.freemem(),
    totalmem: os.totalmem(),
    homedir: os.homedir(),
    hostname: os.hostname(),
    platform: os.platform(),
    ostype: os.type()
}