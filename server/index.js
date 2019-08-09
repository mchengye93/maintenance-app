const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const issues = require('../database-postgres');

const port = 3000;
const app = express();

// app.use(express.static(`${__dirname}/../react-client/dist`));

app.use(bodyParser.urlencoded({ extended: true })); // parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/issues', (req, res) => {
  issues.getAllIssues((err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
