const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const issues = require('../database-postgres');

const app = express();
