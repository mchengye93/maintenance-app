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
  date TIMESTAMP NOT NULL,
  description TEXT,
  cost INT ,
  dateFixed TIMESTAMP,
  
);
/*
Category: Plumbing, Electrical, Fixture, Furniture, Decoration
*/
CREATE TABLE category (
    id serial PRIMARY KEY,
    name varchar(30) NOT NULL,
)

CREATE TABLE contact (
    id serial PRIMARY KEY,
    categoryId INT NOT NULL,
    name varchar(30) NOT NULL,
    phone varchar(30) NOT NULL,
    email varchar(30) NOT NULL,
)
/*
Subcategory: 
    Plumbing: Sink, Toilet ,Shower, Jacuzzi, Hot Water
    Electrical: Airconditioner, Bathroom lights, Disco lights, TV, TV remote control,
                Room light
    Fixture: Entrance door, Bathroom door, Garage parking door 

*/

CREATE TABLE subcategory (
    id serial PRIMARY KEY,
    categoryId INT NOT NULL,
    name varchar(30) NOT NULL,
)








/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
      psql -u postgres < server/schema.sql
 *  to create the database and the tables.*/
