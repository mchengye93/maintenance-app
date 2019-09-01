const connection = require('./connection.js');

/* Issues CRUD */
const createIssue = (issue) => {
  const query = `INSERT INTO issues (room_id,category_id,subcategory_id,date_issued) VALUES  
  (${issue.roomId},${issue.categoryId}, ${issue.subcategoryId}, CURRENT_TIMESTAMP)`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};
const getAllIssues = () => {
  const query = 'SELECT issues.id,issues.room_id, issues.category_id, issues.category_id, issues.subcategory_id, subcategories.subcategory ,issues.date_issued FROM issues '
  + 'INNER JOIN categories ON issues.category_id= categories.id '
  + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
  + 'ORDER BY date_issued, room_id ASC';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getAllPendingIssues = () => {
  let query = '';

  for (let i = 1; i <= 5; i += 1) {
    query += '(SELECT issues.id,issues.room_id, issues.category_id, categories.category,'
     + 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued,'
      + 'issues.date_received FROM issues '
      + 'INNER JOIN categories ON issues.category_id= categories.id '
      + 'INNER JOIN subcategories ON  issues.subcategory_id = subcategories.id '
      + `WHERE categories.id = ${i} AND date_resolved IS NULL AND date_received IS NULL `
      + 'ORDER BY date_issued, categories.category, room_id ASC LIMIT 3)';
    if (i !== 5) {
      query += ' UNION ALL';
    }
  }


  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results.rows);
    });
  });
};

const getAllPendingVipIssues = () => {
  const query = 'SELECT issues.id,rooms.id, rooms.vip, issues.category_id, categories.category, '
  + 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued, issues.date_received '
  + 'FROM issues '
  + 'INNER JOIN rooms ON rooms.id = issues.room_id AND rooms.vip = true '
  + 'INNER JOIN categories ON issues.category_id= categories.id '
  + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
  + 'WHERE issues.date_resolved IS NULL AND issues.date_received IS NULL '
  + 'ORDER BY date_issued, rooms.id ASC';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results.rows);
    });
  });
};

const getAllPendingIssuesByCategoryId = (categoryId) => {
  const query = 'SELECT issues.id,issues.room_id, issues.category_id, categories.category,'
  + 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued '
  + 'FROM issues '
  + 'INNER JOIN categories ON issues.category_id= categories.id '
  + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
  + `WHERE categories.id = '${categoryId}' AND issues.date_resolved IS NULL AND issues.date_received IS NULL `
  + 'ORDER BY issues.date_issued, issues.room_id  ASC';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getAllReceivedIssuesByCategory = (categoryId) => {
  const query = 'SELECT issues.id, issues.room_id, issues.category_id, categories.category, '
  + 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued, contacts.name, issues.contact_id, issues.date_received '
  + 'FROM issues '
  + 'INNER JOIN categories ON issues.category_id= categories.id '
  + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
  + 'INNER JOIN contacts ON issues.contact_id = contacts.id '
  + `WHERE date_received IS NOT NULL AND date_resolved IS NULL AND categories.id=${categoryId} `
  + 'ORDER BY date_issued, date_received, room_id ASC';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results.rows);
    });
  });
};

const getAllResolvedIssuesByCategory = (categoryId) => {
  const query = 'SELECT issues.id,issues.room_id, issues.category_id, categories.category, '
  + 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued, contacts.name, issues.contact_id, '
  + 'issues.date_received, issues.cost, issues.date_resolved '
  + 'FROM issues '
  + 'INNER JOIN categories ON issues.category_id= categories.id '
  + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
  + 'INNER JOIN contacts ON issues.contact_id = contacts.id '
  + `WHERE date_resolved IS NOT NULL AND categories.id=${categoryId} `
  + 'ORDER BY date_resolved DESC, room_id ASC';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results.rows);
    });
  });
};


const getAllReceivedIssuesByContact = (contactId) => {
  const query = 'SELECT issues.room_id, issues.category_id, categories.category, '
  + 'issues.subcategory_id, subcategories.subcategory ,issues.date_issued, contacts.name, issues.contact_id, issues.date_received '
  + 'FROM issues '
  + 'INNER JOIN categories ON issues.category_id= categories.id '
  + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
  + 'INNER JOIN contacts ON issues.contact_id = contacts.id '
  + 'WHERE date_received IS NOT NULL AND date_resolved IS NULL '
  + `AND contact_id = ${contactId} `
  + 'ORDER BY date_issued ASC';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.rows);
    });
  });
};
const getIssue = (issueId) => {
  const query = `${'SELECT issues.id, issues.room_id, issues.category_id, categories.category, '
  + 'issues.subcategory_id, subcategories.subcategory ,issues.description, issues.cost, '
  + 'issues.date_issued FROM issues '
  + 'INNER JOIN categories ON issues.category_id= categories.id '
  + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id '
  + 'WHERE issues.id ='}${issueId}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results.rows);
    });
  });
};
const updateIssue = (issue) => {
  const query = `UPDATE issues SET category_id=${issue.categoryId}, room_id = ${issue.roomId} `
  + ` description = ${issue.description}, date_issued = CURRENT_TIMESTAMP WHERE id = ${issue.issueId}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const updateReceivedIssue = (issue) => {
  const query = `UPDATE issues SET contact_id=${issue.contactId}, date_received=CURRENT_TIMESTAMP `
  + `WHERE id = ${issue.issueId}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deleteIssue = (issueId) => {
  const query = `DELETE FROM issues WHERE id = ${issueId}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

/* Categories  CRUD */
const getAllCategories = () => {
  const query = 'SELECT * FROM categories ORDER by category ASC';
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results.rows);
    });
  });
};

const createCategory = (category) => {
  const query = `INSERT INTO categories (category) VALUES ('${category}')`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const updateCategory = (categoryId, category) => {
  const query = `UPDATE categories SET category = '${category}' WHERE id = ${categoryId}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const deleteCategory = (categoryId) => {
  const query = `DELETE FROM categories WHERE id = ${categoryId}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/* CRUD subcategories */
const createSubcategory = (categoryId, subcategory) => {
  const query = `INSERT INTO subcategories (category_id, subcategory) VALUES (${categoryId}, '${subcategory}')`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const getAllSubcategories = () => {
  const query = 'SELECT * FROM subcategories';
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};
const getAllSubcategoriesByCategoryId = (categoryId) => {
  const query = `SELECT * FROM subcategories WHERE category_id = ${categoryId} ORDER BY subcategory ASC`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results.rows);
    });
  });
};

const updateSubcategory = (subcategory) => {
  const query = `UPDATE subcategories SET category_id= ${subcategory.categoryId}, subcategory= '${subcategory.subcategory}' WHERE id=${subcategory.subcategoryId}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const deleteSubcategory = (subcategoryId) => {
  const query = `DELETE FROM subcategories WHERE id = ${subcategoryId}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getAllCategoriesSubcategories = () => {
  const query = 'SELECT * FROM subcategories '
  + 'INNER JOIN categories '
  + 'ON categories.id = subcategories.category_id '
  + 'ORDER BY categories.category, subcategories.subcategory ASC';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results.rows);
    });
  });
};
/* CRUD contacts */
const createContact = (contact) => {
  const query = `INSERT INTO contacts (category_id, name, phone, email) VALUES (${contact.categoryId}, '${contact.name}', '${contact.phone}', '${contact.email}')`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
const getAllContact = () => {
  const query = 'SELECT  contacts.id, contacts.category_id, categories.category, contacts.name, '
  + 'contacts.phone, contacts.email FROM contacts '
  + 'INNER JOIN categories ON contacts.category_id = categories.id '
  + 'ORDER BY categories.category,contacts.name ASC';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results.rows);
    });
  });
};

const getAllContactByCategoryId = (categoryId) => {
  const query = `SELECT * FROM contacts WHERE category_id = ${categoryId}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const updateContact = (contact) => {
  const query = `UPDATE contacts SET category_id = ${contact.categoryId}, name ='${contact.name}', `
  + ` phone='${contact.phone}', email = '${contact.email}' WHERE id = ${contact.contactId}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const deleteContact = (contactId) => {
  const query = `DELETE FROM contacts WHERE id = ${contactId}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  createIssue,
  getAllIssues,
  getAllPendingIssues,
  getAllPendingVipIssues,
  getAllPendingIssuesByCategoryId,
  getAllReceivedIssuesByCategory,
  getAllResolvedIssuesByCategory,
  getAllReceivedIssuesByContact,
  getIssue,
  updateIssue,
  updateReceivedIssue,
  deleteIssue,
  createSubcategory,
  updateSubcategory,
  getAllSubcategories,
  getAllSubcategoriesByCategoryId,
  deleteSubcategory,
  getAllCategoriesSubcategories,
  createContact,
  getAllContact,
  getAllContactByCategoryId,
  updateContact,
  deleteContact,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,

};
