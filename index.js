const axios = require('axios');
const express = require('express');
const envs = require('./env');
const config = require('./config.json');
const fs = require('fs/promises');

const toPing = config.ping;
const pingedRoutes = config['get-pinged'];

const app = express();

pingedRoutes.map(route => {
  console.log(`Registering route ${route}`);
  app.get(route, (req, res) => {
    console.log(`Received request in ${route}`);
    res.sendStatus(200);
  });
});

setInterval(() => {
  config.ping.forEach(pingee => {
    console.log(`Pinging ${pingee}`);
    fs.appendFile('logs.txt', `Pinging ${pingee}`);
    axios
      .get(pingee)
      .then(res => {
        fs.appendFile('logs.txt', res.data);
        console.log(`Success`);
      })
      .catch(err => {
        fs.appendFile('logs.txt', `Error__${err}`);
        console.log(`Error__${err}`);
      });
  });
}, envs.INTERVAL);

app.listen(envs.PORT, () =>
  console.log(`Ultimocker-5000 initiating in port: ${envs.PORT}. Prepare...`)
);
