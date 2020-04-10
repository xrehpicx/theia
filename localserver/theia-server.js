const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const routerHandler = require('./src/router/routerHandler')(http);

const bodyParser = require('body-parser');


const PORT = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
});

app.use('/', routerHandler);
app.use(express.static(path.resolve(__dirname + '/client/build')));



module.exports = (port) => {
    http.listen(port || PORT, () => console.log('theia'));
}