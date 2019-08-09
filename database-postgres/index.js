const { Pool } = require('pg');

const postgresDb = new Pool({
  user: 'marbocheng',
  host: 'localhost',
  database: 'maintenance',
  password: 'mapo',
  port: 5432,
});
/* Issues CRUD */
const getAllIssues = (callback) => {
  console.log('Inside getAllIssues!');
  postgresDb.query(
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

/* CRUD categories */
const getAllCategories = (callback) => {
  postgresDb.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results.rows);
  });
};

/* CRUD subcategories */
const getAllSubcategories = (callback) => {
  postgresDb.query('SELECT * FROM subcategories', (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results.rows);
  });
};

const getAllCategoriesSubcategories = (callback) => {
  postgresDb.query(
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

};

module.exports = {
  getAllIssues,
  getAllCategories,
  getAllSubcategories,
  getAllCategoriesSubcategories,
  getAllContact,

};
