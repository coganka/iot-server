const getTemperature = (req, res) => {
    if (global.io) {
        global.io.emit('temperature', (data) => {
            console.log('temperature: ', data.temperature);
            //res.render("temperature");
        });
    } else {
        res.status(500).json({ error: 'Socket.IO is not available' });
    }
};

module.exports = { getTemperature };