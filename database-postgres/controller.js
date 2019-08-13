const connection = require('./connection.js');
/* Issues CRUD */
const getAllIssues = (callback) => {
  connection.query(
    'SELECT issues.room_id, issues.category_id, categories.category, issues.subcategory_id, subcategories.subcategory ,issues.date FROM issues '
    + 'INNER JOIN categories ON issues.category_id= categories.id '
    + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
    + 'ORDER BY date ASC', (err, results) => {
      if (err) {
        callback(err, null);
      }

      callback(null, results.rows);
    },
  );
};

const getIssue = (issueId, callback) => {
  connection.query(
    `${'SELECT issues.id, issues.room_id, issues.category_id, categories.category, issues.subcategory_id, subcategories.subcategory ,issues.date FROM issues '
    + 'INNER JOIN categories ON issues.category_id= categories.id '
    + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
    + 'WHERE issues.id ='}${issueId}`,
    (err, results) => {
      if (err) {
        console.log(err);
        callback(err, null);
      }
      callback(null, results.rows);
    },
  );
};

/* CRUD categories */
const getAllCategories = (callback) => {
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results.rows);
  });
};

const createCategory = (category, callback) => {
  connection.query(`INSERT INTO categories (category) VALUES (${category})`, (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results);
  });
};

const updateCategory = (categoryId, category, callback) => {
  connection.query(`UPDATE categories SET category = ${category} WHERE id = ${categoryId}`, (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results);
  });
};

const deleteCategory = (categoryId, callback) => {
  connection.query(`DELETE FROM categories WHERE id = ${categoryId}`, (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results);
  });
};

/* CRUD subcategories */
const createSubcategory = (categoryId, subcategory, callback) => {
  connection.query(`INSERT INTO subcategories (category_id, subcategory) VALUES (${categoryId}, '${subcategory}')`, (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results);
  });
};
const getAllSubcategories = (categoryId, callback) => {
  connection.query(`SELECT * FROM subcategories WHERE category_id = ${categoryId}`, (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results.rows);
  });
};

const deleteSubcategory = (subcategoryId, callback) => {
  connection.query(`DELETE FROM subcategories WHERE id = ${subcategoryId}`, (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results.rows);
  });
};

const getAllCategoriesSubcategories = (callback) => {
  connection.query(
    'SELECT * FROM subcategories '
        + 'INNER JOIN categories '
        + 'ON categories.id = subcategories.category_id', (err, results) => {
      if (err) {
        callback(err, null);
      }
      callback(null, results.rows);
    },
  );
};
/* CRUD contacts */
const getAllContact = (callback) => {
  connection.query('SELECT  contacts.id, contacts.category_id, categories.category, contacts.name, '
+ 'contacts.phone, contacts.email FROM contacts '
+ 'INNER JOIN categories ON contacts.category_id = categories.id '
+ 'ORDER BY categories.category,contacts.name ASC', (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results.rows);
  });
};

module.exports = {
  getAllIssues,
  getIssue,
  getAllCategories,
  createSubcategory,
  getAllSubcategories,
  deleteSubcategory,
  getAllCategoriesSubcategories,
  getAllContact,
  createCategory,
  updateCategory,
  deleteCategory,

};
