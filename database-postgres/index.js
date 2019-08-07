const { Pool } = require('pg');

const postgresDb = new Pool({
  user: 'marbocheng',
  host: 'localhost',
  database: 'maintenance',
  password: 'mapo',
  port: 5432,
});
