const { Pool } = require('pg');

const postgresDb = new Pool({
  user: 'marbocheng',
  host: 'localhost',
  database: 'maintenance',
  password: 'mapo',
  port: 5432,
});

const getAllIssues = (callback) => {
  postgresDb.query(
    'SELECT issues.room_id, issues.category_id, categories.category, issues.subcategory_id, subcategories.subcategory ,issues.date'
        + 'FROM issues'
        + 'INNER JOIN categories ON issues.category_id= categories.id AND issues.room_id = 10'
        + 'INNER JOIN subcategories ON issues.subcategory_id = subcategories.id', (err, results) => {
      if (err) {
        callback(err, null);
      }
      callback(null, results.rows);
    },
  );
};

const getAllCategories = (callback) => {
  postgresDb.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      callback(err, null);
    }
    callback(null, results.rows);
  });
};

module.exports = {
  getAllIssues,
  getAllCategories,


};
