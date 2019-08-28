const connection = require('./connection.js');
/* Issues CRUD */
const createIssue = (issue, callback) => {
  connection.query(`INSERT INTO issues (room_id,category_id,subcategory_id,date_issued) VALUES  
  (${issue.roomId},${issue.categoryId}, ${issue.subcategoryId}, ${issue.dateIssued})`, (err, result) => {
    if (err) {
      callback(err, null);
    }
    callback(null, result);
  });
};
const getAllIssues = (callback) => {
  connection.query(
    'SELECT issues.room_id, issues.category_id, issues.category_id, issues.subcategory_id, subcategories.subcategory ,issues.date_issued FROM issues '
    + 'INNER JOIN categories ON issues.category_id= categories.id '
    + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
    + 'ORDER BY date_issued, room_id ASC', (err, results) => {
      if (err) {
        callback(err, null);
      }

      callback(null, results.rows);
    },
  );
};

const getAllPendingIssues = (callback) => {
  connection.query(
    'SELECT issues.room_id, issues.category_id, categories.category,'
    + 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued,'
     + 'issues.date_received FROM issues '
     + 'INNER JOIN categories ON issues.category_id= categories.id '
     + 'INNER JOIN subcategories ON  issues.subcategory_id = subcategories.id '
     + 'WHERE date_resolved IS NULL AND date_received IS NULL '
     + 'ORDER BY date_issued, room_id ASC', (err, results) => {
      if (err) {
        console.log(err);
        callback(err, null);
      }
      callback(null, results.rows);
    },
  );
};

const getAllPendingVipIssues = (callback) => {
  connection.query(
    'SELECT rooms.id, rooms.vip, issues.category_id, categories.category, '
    + 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued, issues.date_received '
    + 'FROM issues '
    + 'INNER JOIN rooms ON rooms.id = issues.room_id AND rooms.vip = true '
    + 'INNER JOIN categories ON issues.category_id= categories.id '
    + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
    + 'WHERE issues.date_resolved IS NULL AND issues.date_received IS NULL '
    + 'ORDER BY date_issued, rooms.id ASC', (err, results) => {
      if (err) {
        console.log(err);
        callback(err, null);
      }
      callback(null, results.rows);
    },
  );
};

const getAllPendingIssuesByCategoryId = (categoryId, callback) => {
  connection.query(
    'SELECT issues.room_id, issues.category_id, categories.category,'
+ 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued '
+ 'FROM issues '
+ 'INNER JOIN categories ON issues.category_id= categories.id '
+ 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
+ `WHERE categories.id = '${categoryId}' AND issues.date_resolved IS NULL AND issues.date_received IS NULL `
+ 'ORDER BY issues.date_issued, issues.room_id  ASC', (err, results) => {
      if (err) {
        callback(err, null);
      }
      callback(null, results.rows);
    },
  );
};

const getAllReceivedIssuesByCategory = (categoryId, callback) => {
  connection.query(
    'SELECT issues.room_id, issues.category_id, categories.category, '
+ 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued, contacts.name, issues.contact_id, issues.date_received '
+ 'FROM issues '
+ 'INNER JOIN categories ON issues.category_id= categories.id '
+ 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
+ 'INNER JOIN contacts ON issues.contact_id = contacts.id '
+ `WHERE date_received IS NOT NULL AND date_resolved IS NULL AND categories.id=${categoryId} `
+ 'ORDER BY date_issued, date_received ASC', (err, results) => {
      if (err) {
        callback(err, null);
      }
      callback(null, results);
    },
  );
};

const getAllReceivedIssuesByContact = (contactId, callback) => {
  connection.query(
    'SELECT issues.room_id, issues.category_id, categories.category, '
+ 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued, contacts.name, issues.contact_id, issues.date_received '
+ 'FROM issues '
+ 'INNER JOIN categories ON issues.category_id= categories.id '
+ 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
+ 'INNER JOIN contacts ON issues.contact_id = contacts.id '
+ 'WHERE date_received IS NOT NULL AND date_resolved IS NULL '
+ `AND contact_id = ${contactId} `
+ 'ORDER BY date_issued ASC', (err, results) => {
      if (err) {
        callback(err, null);
      }
      callback(null, results);
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

const updateReceivedIssue = (issue, callback) => {
  connection.query(
    `UPDATE issues SET contact_id=${issue.contactId}, date_received=CURRENT_TIMESTAMP `
    + `WHERE id = ${issue.issueId}`, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    },
  );
};

const deleteIssue = (issueId, callback) => {
  connection.query(`DELETE FROM issues WHERE id = ${issueId}`, (err, result) => {
    if (err) {
      callback(err, null);
    }
    callback(null, result);
  });
};

/* CRUD categories */
const getAllCategories = (callback) => {
  connection.query('SELECT * FROM categories ORDER by category ASC', (err, results) => {
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
  connection.query(`SELECT * FROM subcategories WHERE category_id = ${categoryId} ORDER BY subcategory ASC`, (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results.rows);
  });
};

const updateSubcategory = (subcategory, callback) => {
  connection.query(`UPDATE subcategories SET category_id= ${subcategory.categoryId}, subcategory= '${subcategory.subcategory}' WHERE id=${subcategory.subcategoryId}`, (err, results) => {
    if (err) {
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
  createIssue,
  getAllIssues,
  getAllPendingIssues,
  getAllPendingVipIssues,
  getAllPendingIssuesByCategoryId,
  getAllReceivedIssuesByCategory,
  getAllReceivedIssuesByContact,
  getIssue,
  getAllCategories,
  updateReceivedIssue,
  deleteIssue,
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
