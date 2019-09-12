// File Upload
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage });

// Server
const express = require('express');
const bodyParser = require('body-parser');

// const cors = require('cors');
const issues = require('../db-postgres/controller.js');

const port = 3001;
const app = express();

// // Example simple middleware logging function
// const logRoute = function (req, res, next) {
//   console.log('Request received');
//   next();
// };

app.use(express.static(`${__dirname}/../client/dist`));

// allow upload file access
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: true })); // parse application/json
app.use(bodyParser.json());


// Custom middleware example
// app.use(logRoute);


app.get('/', (req, res) => res.send('Welcome to Maintenance App!'));
/* CRUD API for Issues */

// CREATE an issue
app.post('/api/issue', async (req, res) => {
  // const { file } = req;

  const issue = req.body;
  try {
    const rows = await issues.createIssue(issue);
    res.status(201).send(rows);
  } catch (e) {
    res.status(404).send(e);
  }
});

// GET all issues
app.get('/api/issues', async (req, res) => {
  try {
    const allIssues = await issues.getAllIssues();
    res.status(200).send(allIssues);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET all pending issues
app.get('/api/issues/pending', async (req, res) => {
  try {
    const pendingIssues = await issues.getAllPendingIssues();
    res.status(200).send(pendingIssues);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET all pending issues for VIP rooms
app.get('/api/issues/vip/pending', async (req, res) => {
  try {
    const vipPendingIssues = await issues.getAllPendingVipIssues();
    res.status(200).send(vipPendingIssues);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET all pending issues by category
app.get('/api/issues/pending/category', async (req, res) => {
  const { categoryId } = req.query;
  try {
    const pendingIssues = await issues.getAllPendingIssuesByCategoryId(categoryId);

    res.status(200).send(pendingIssues.rows);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

// GET all received issues by category
app.get('/api/issues/received/category', async (req, res) => {
  const { categoryId } = req.query;
  try {
    const receviedIssues = await issues.getAllReceivedIssuesByCategory(categoryId);
    res.status(200).send(receviedIssues);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});


// GET all resolved issues by category
app.get('/api/issues/resolved/category', async (req, res) => {
  const { categoryId } = req.query;
  try {
    const resolvedIssues = await issues.getAllResolvedIssuesByCategory(categoryId);
    res.status(200).send(resolvedIssues);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET all resolved issues
app.get('/api/issues/resolved', async (req, res) => {
  try {
    const resolvedIssues = await issues.getAllResolvedIssues();
    res.status(200).send(resolvedIssues);
  } catch (e) {
    res.status(400).send(e);
  }
});


// GET all pending issues by contact
app.get('/api/issues/contact', async (req, res) => {
  const { contactId } = req.query;
  try {
    const receivedIssuesByContactId = await issues.getAllReceivedIssuesByContact(contactId);
    res.status(200).send(receivedIssuesByContactId);
  } catch (e) {
    res.status(400).send(e);
  }
});


// Return specific issuesId
app.get('/api/issue', async (req, res) => {
  const { issueId } = req.query;
  try {
    const issue = await issues.getIssue(issueId);
    res.status(200).send(issue);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

// UPDATE issue
app.put('/api/issue/', async (req, res) => {
  const issue = req.body;
  try {
    const updateIssue = await issues.updateIssue(issue);
    res.status(200).send(updateIssue);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update issue received
app.put('/api/issue/received', async (req, res) => {
  const issue = req.body;
  try {
    const issueUpdate = await issues.updateReceivedIssue(issue);
    res.status(200).send(issueUpdate);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update issue resolved add comments and cost to issue
app.put('/api/issue/resolve', async (req, res) => {
  const issue = req.body;
  console.log(issue);
  try {
    const resolveIssue = await issues.updateResolveIssue(issue);
    res.status(200).send(resolveIssue);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// Delete specific issue
app.delete('/api/issue', async (req, res) => {
  const { issueId } = req.body;

  try {
    const issueDelete = await issues.deleteIssue(issueId);
    res.status(200).send(issueDelete);
  } catch (e) {
    res.status(500).send(e);
  }
});

/* CRUD API for Categories */
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await issues.getAllCategories();
    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post('/api/category', async (req, res) => {
  const { category } = req.body;
  try {
    const createCategory = await issues.createCategory(category);
    res.status(201).send(createCategory);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.put('/api/category', async (req, res) => {
  const { categoryId } = req.body;
  const { category } = req.body;
  try {
    const updateCategory = await issues.updateCategory(categoryId, category);
    res.status(200).send(updateCategory);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/api/category', async (req, res) => {
  const { categoryId } = req.body;
  try {
    const deleteCategory = await issues.deleteCategory(categoryId);
    res.send(200).send(deleteCategory);
  } catch (e) {
    res.status(400).send(e);
  }
});
app.post('/api/subcategory', async (req, res) => {
  const { categoryId } = req.body;
  const { subcategory } = req.body;

  try {
    const createSubcategory = await issues.createSubcategory(categoryId, subcategory);
    res.status(201).send(createSubcategory);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.put('/api/subcategory', async (req, res) => {
  const subcategory = req.body;
  try {
    const updateSubcategory = await issues.updateSubcategory(subcategory);
    res.status(200).send(updateSubcategory);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/api/subcategories', async (req, res) => {
  try {
    const subcategories = await issues.getAllSubcategories();
    res.status(200).send(subcategories.rows);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/api/subcategories/categoryId', async (req, res) => {
  const { categoryId } = req.query;
  try {
    const issuesByCategoryId = await issues.getAllSubcategoriesByCategoryId(categoryId);
    res.status(200).send(issuesByCategoryId);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/api/subcategory', async (req, res) => {
  const { subcategoryId } = req.body;
  try {
    const deleteSubcategory = await issues.deleteSubcategory(subcategoryId);
    res.status(200).send(deleteSubcategory);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/api/categoriessubcategories', async (req, res) => {
  try {
    const categoriesSubcategories = await issues.getAllCategoriesSubcategories();
    res.status(200).send(categoriesSubcategories);
  } catch (e) {
    res.status(400).send(e);
  }
});

/* CRUD API for contacts */
app.post('/api/contact', async (req, res) => {
  const contact = req.body;
  try {
    const createContact = await issues.createContact(contact);
    res.status(201).send(createContact);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await issues.getAllContact();
    res.status(200).send(contacts);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/api/contacts/categoryId', async (req, res) => {
  const { categoryId } = req.query;
  try {
    const rows = await issues.getAllContactByCategoryId(categoryId);
    res.status(200).send(rows);
  } catch (e) {
    res.status(400).send(e);
  }
});
app.put('/api/contact', async (req, res) => {
  const contact = req.body;
  try {
    const updateIssue = await issues.updateContact(contact);
    res.status(200).send(updateIssue);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/api/contact', async (req, res) => {
  const { contactId } = req.body;
  try {
    const deleteContact = await issues.deleteContact(contactId);
    res.status(200).send(deleteContact);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/api/cost/category', async (req, res) => {
  try {
    const costByCategory = await issues.getCostByMonthCategory();
    res.status(200).send(costByCategory);
  } catch (e) {
    res.status(400).send(e);
  }
});


module.exports = app;
