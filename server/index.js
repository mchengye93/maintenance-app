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

// Return all unsolved issues
app.get('/api/issues/pending', (req, res) => {
  issues.getAllPendingIssues((err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

// Return all unsolved issues for VIP rooms
app.get('/api/issues/vip/pending', (req, res) => {
  issues.getAllPendingVipIssues((err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});
// Return all pending issues by category
app.get('/api/issues/contact', (req, res) => {
  issues.getAllPendingIssuesByCategory(req.body.category, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

// Return all pending issues by contact
app.get('/api/issues/contact', (req, res) => {
  issues.getAllReceivedIssuesByContact(req.body.contactId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

// Return specific issues
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
  issues.createSubcategory(req.body.categoryId, req.body.subcategory, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

app.put('/api/subcategories', (req, res) => {
  issues.updateSubcategory(req.body, (err, data) => {
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

app.delete('/api/subcategories', (req, res) => {
  issues.deleteSubcategory(req.body.subcategoryId, (err, data) => {
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

/* CRUD API for contacts */

app.post('/api/contacts', (req, res) => {
  issues.createContact(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

app.get('/api/contacts', (req, res) => {
  issues.getAllContact((err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

app.put('/api/contacts', (req, res) => {
  issues.updateContact(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

app.delete('/api/contacts', (req, res) => {
  issues.deleteContact(req.body.contactId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
