const {Pool} = require('pg');

const postgresDb = new Pool({
  user: 'marbocheng',
  host: 'localhost',
  database: 'foodie',
  password: 'mapo',
  port: 5432,
});
