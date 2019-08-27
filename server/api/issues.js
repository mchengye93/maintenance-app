app.use(bodyParser.urlencoded({ extended: true })); // parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to Maintenance App!'));
/* Issues API */

// Create an issue
app.post('/api/issue', (req, res) => {
  issues.createIssue(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

// Get all issues
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
app.get('/api/issues/category', (req, res) => {
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

// Update issue received
app.put('/api/issue/received', (req, res) => {
  issues.updateReceivedIssue(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

// Delete specific issue
app.delete('/api/issue/', (req, res) => {
  issues.deleteIssue(req.body.issueId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});
