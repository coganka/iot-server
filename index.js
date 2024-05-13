const express = require('express');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cors());

const server = app.listen(PORT, () => console.log(`server listening on ${PORT}`));
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket', 'polling']
    },
    allowEIO3: true
});


const tempData = {
    temperature: "No Data",
    humidity: "No Data",
    lights: "No Data"
};

global.io = io;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('connected', tempData);

    socket.on('pi-connected', () => {
        io.emit("update-device-info");
    });

    socket.on('button-clicked', () => {
        io.emit('get-temp');
        console.log("Emitted 'get-temp' event to Raspberry Pi");
    });

    socket.on('start-fan', (data) => {
        console.log(`emitting fan started event with ${data} degrees`);
        io.emit('fan-started', data);
    });

    socket.on('fan-started-on-pi', () => {
        io.emit('change-fan-info');
    });

    socket.on('temperature-response', (data) => {
        console.log(data);
        io.emit("temp-res", data);
    });

    socket.on('are-you-alive', (data) => {
        io.emit('check-health', data);
    });

    socket.on('live-status', (data) => {
        io.emit('update-device-info');
        io.emit("temp-res", data);
    });

    socket.on('lights-set', (data) => {
        io.emit("rgb-color", data);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
        io.emit('pi-disconnect');
    });
});

const mainRoute = require('./routes/mainRoute');
//const lightsRouter = require('./routes/lightsRouter');
//const windowsRouter = require('./routes/windowsRouter');
//const temperatureRouter = require('./routes/temperatureRouter');
//const cameraRouter = require('./routes/cameraRouter');


app.use('/', mainRoute);
//app.use('/lights', lightsRouter);
//app.use('/windows', windowsRouter);
//app.use('/heat', temperatureRouter);
//app.use('/camera', cameraRouter);
