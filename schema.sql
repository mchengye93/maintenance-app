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
  room_id INT NOT NULL,
  category INT NOT NULL,
  subcategory INT NOT NULL,
  date TIMESTAMP NOT NULL,
  photourl text,
  description TEXT,
  cost INT ,
  dateFixed TIMESTAMP
);
/*
Category: Plumbing, Electrical, Fixture, Furniture, Decoration
*/

/*COPY categories FROM '/Users/marbocheng/Desktop/maintenance-app/categories.csv' DELIMITER ',' CSV HEADER;*/
CREATE TABLE categories (
    id serial PRIMARY KEY,
    category varchar(30) NOT NULL
);


CREATE TABLE contacts (
    id serial PRIMARY KEY,
    category_id INT NOT NULL,
    name varchar(30) NOT NULL,
    phone varchar(30) NOT NULL,
    email varchar(30) NOT NULL
);
/*
Subcategory: 
    Electrical: Telephone, Airconditioner, Bathroom lights, Disco lights, TV, TV remote control,
                Room light, Internet
    Plumbing: Sink, Toilet ,Shower, Jacuzzi, Hot Water
    Fixture: Floor tile, Entrance door, Bathroom door, Garage parking door 
    Decoration: Ceramics, Ceiling, Walls, Paintings 
    Furniture: Sofa, Bed
*/

CREATE TABLE subcategories (
    id serial PRIMARY KEY,
    category_id INT NOT NULL,
    subcategory varchar(30) NOT NULL
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
      psql -u postgres < server/schema.sql
 *  to create the database and the tables.*/
