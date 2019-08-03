DROP DATABASE IF EXISTS maintenance;

CREATE DATABASE maintenance;

USE maintenance;

CREATE TABLE rooms (
  id serial PRIMARY KEY,
  vip boolean NOT NULL,
  parking boolean NOT NULL
);

CREATE TABLE issues (
  id serial PRIMARY KEY,
  roomId INT NOT NULL,
  category INT NOT NULL,
  subcategory INT NOT NULL,
  date TIMESTAMP NOT NULL
  
);






/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
      psql -u postgres < server/schema.sql
 *  to create the database and the tables.*/
