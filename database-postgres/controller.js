const connection = require('./connection.js');
/* Issues CRUD */
const getAllIssues = (callback) => {
  connection.query(
    'SELECT issues.room_id, issues.category_id, categories.category_id, issues.subcategory_id, subcategories.subcategory ,issues.date FROM issues '
    + 'INNER JOIN categories ON issues.category_id= categories.id '
    + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
    + 'ORDER BY date_issued ASC', (err, results) => {
      if (err) {
        callback(err, null);
      }

      callback(null, results.rows);
    },
  );
};

const getIssue = (issueId, callback) => {
  connection.query(
    `${'SELECT issues.id, issues.room_id, issues.category_id, categories.category, issues.subcategory_id, subcategories.subcategory ,issues.date_issued FROM issues '
    + 'INNER JOIN categories ON issues.category_id= categories.id '
    + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
    + 'WHERE issues.id ='}${issueId}`,
    (err, results) => {
      if (err) {
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

const updateSubcategory = (subcategory, callback) => {
  console.log('inside updatesubcategory', subcategory);
  console.log(subcategory.subcategoryId);
  console.log(subcategory.categoryId);
  console.log(subcategory.subcategory);
  connection.query(`UPDATE subcategories SET category_id= ${subcategory.categoryId}, subcategory= '${subcategory.subcategory}' WHERE id=${subcategory.subcategoryId}`, (err, results) => {
    if (err) {
      console.log(err);
      callback(err, null);
    }
    callback(null, results);
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
const createContact = (contact, callback) => {
  connection.query(`INSERT INTO contacts (category_id, name, phone, email) VALUES (${contact.categoryId}, '${contact.name}', '${contact.phone}', '${contact.email}')`, (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results);
  });
};
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

const updateContact = (contact, callback) => {
  connection.query(`UPDATE contacts SET category_id = ${contact.categoryId}, name ='${contact.name}', phone='${contact.phone}', email = '${contact.email}' WHERE id = ${contact.id}`, (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results);
  });
};

const deleteContact = (contactId, callback) => {
  connection.query(`DELETE FROM contacts WHERE id = ${contactId}`, (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  getAllIssues,
  getIssue,
  getAllCategories,
  createSubcategory,
  updateSubcategory,
  getAllSubcategories,
  deleteSubcategory,
  getAllCategoriesSubcategories,
  createContact,
  getAllContact,
  updateContact,
  deleteContact,
  createCategory,
  updateCategory,
  deleteCategory,

};
