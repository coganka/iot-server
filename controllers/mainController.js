const getMain = (req, res) => {
    if (global.io) {
        global.io.emit('connection', () => {
            res.render('main')
        });
    } else {
        res.status(500).json({ error: 'Socket.IO is not available' });
    }
}

module.exports = {
    getMain
}