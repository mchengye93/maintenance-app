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
