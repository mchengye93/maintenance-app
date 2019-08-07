const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const issues = require('../database-postgres');

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));

app.use(bodyParser.urlencoded({ extended: true })); // parse application/json
app.use(bodyParser.json());
