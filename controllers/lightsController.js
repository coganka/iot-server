const getLights = (req, res) => {
    if (global.io) {
        global.io.on('lightStatus', (data) => {
            console.log('Light status: ', data.lights);
            res.json({ lights: data.lights});
            // render
        });
    } else {
        res.status(500).json({ error: 'Socket.IO is not available' });
    }
};


module.exports = { getLights };