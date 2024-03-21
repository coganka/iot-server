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
const io = socketIO(server);

const tempData = {
    temperature: "24 Degrees",
    lights: "medium",
    windows: "closed"
};

global.io = io;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('connected', tempData);
});

const mainRoute = require('./routes/mainRoute');
const lightsRouter = require('./routes/lightsRouter');
const windowsRouter = require('./routes/windowsRouter');
const temperatureRouter = require('./routes/temperatureRouter');
const cameraRouter = require('./routes/cameraRouter');


app.use('/', mainRoute);
app.use('/lights', lightsRouter);
app.use('/windows', windowsRouter);
app.use('/heat', temperatureRouter);
app.use('/camera', cameraRouter);
