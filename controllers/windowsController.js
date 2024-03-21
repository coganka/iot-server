const getWindows = (req, res) => {
    if (global.io) {
        global.io.on('windowStatus', (data) => {
            console.log('window status: ', data.windows);
            res.json({ windows: data.windows});
            // render
        });
    } else {
        res.status(500).json({ error: 'Socket.IO is not available' });
    }
};


module.exports = { getWindows };