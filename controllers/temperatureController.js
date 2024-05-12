// Function to render EJS file for browser clients
const getTemperature = (req, res) => {
    // Render the EJS template
    res.render("temperature");
};

// Function to handle temperature data from Raspberry Pi
const handleTemperatureEvent = (data) => {
    console.log('Received temperature data from Raspberry Pi:', data);
    // Optionally, you can emit this data to connected clients
    if (global.io) {
        global.io.emit('temperatureData', data);
    }
};
/*
// Listen for WebSocket connections
if (global.io) {
    global.io.on('connection', (socket) => {
        console.log('A client connected');

        
    });
    //global.io.emit("get-temp");

    // Listen for 'temperature' event from Raspberry Pi
    global.io.on('temperature-response', (data) => {
        // Call the function to handle temperature event
        handleTemperatureEvent(data);
    });
} else {
    console.error('Socket.IO is not available');
}
*/
module.exports = { getTemperature };
