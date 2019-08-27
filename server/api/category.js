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
