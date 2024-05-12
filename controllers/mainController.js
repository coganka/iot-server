const getMain = (req, res) => {
    res.render('main')
    /*
    if (global.io) {
        global.io.emit('connection', () => {
            console.log("connected")
        });
    } else {
        res.status(500).json({ error: 'Socket.IO is not available' });
    }*/
}

module.exports = {
    getMain
}