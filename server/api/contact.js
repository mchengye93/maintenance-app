
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

