const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const routerHandler = require('./router/routerHandler')(http);
const bodyParser = require('body-parser');

const oki = {
    init: () => {
        const PORT = process.env.PORT || 8000;
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use('/', routerHandler);

        //serve static
        app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname+'/../oki-client/build/index.html'));
        });

        app.use(express.static(path.resolve(__dirname +'/../oki-client/build')));

        http.listen(PORT, () => console.log('oki'));
    }
}
module.exports = oki;