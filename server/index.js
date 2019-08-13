const express = require('express');
const bodyParser = require('body-parser');

// const cors = require('cors');
const issues = require('../database-postgres/controller.js');

const port = 3000;
const app = express();

// app.use(express.static(`${__dirname}/../react-client/dist`));

app.use(bodyParser.urlencoded({ extended: true })); // parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('Welcome to Maintenance App!'));
/* Issues API */
app.get('/api/issues', (req, res) => {
  issues.getAllIssues((err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

app.get('/api/issue', (req, res) => {
  issues.getIssue(req.body.issueId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});
/* Categories API */
app.get('/api/categories', (req, res) => {
  issues.getAllCategories((err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

app.post('/api/categories', (req, res) => {
  issues.createCategory(req.body.category, (err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    }
    res.status(200);
    res.send(data);
  });
});

app.put('/api/categories', (req, res) => {
  issues.updateCategory(req.body.categoryId, req.body.category, (err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    }
    res.status(200);
    res.send(data);
  });
});

app.delete('/api/categories', (req, res) => {
  issues.deleteCategory(req.body.categoryId, (err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    }
    res.status(200);
    res.send(data);
  });
});
app.post('/api/subcategories', (req, res) => {
  issues.createSubcategories(req.body.categoryId, req.body.subcategory, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

app.get('/api/subcategories', (req, res) => {
  issues.getAllSubcategories(req.body.categoryId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

app.get('/api/categoriessubcategories', (req, res) => {
  issues.getAllCategoriesSubcategories((err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
