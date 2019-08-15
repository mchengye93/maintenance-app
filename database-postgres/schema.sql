DROP DATABASE IF EXISTS maintenance;

CREATE DATABASE maintenance;

USE maintenance;

/*
COPY rooms FROM '/Users/marbocheng/Desktop/maintenance-app/rooms.csv' DELIMITER ',' CSV HEADER;
*/
CREATE TABLE rooms (
  id serial PRIMARY KEY,
  vip boolean NOT NULL,
  parking boolean NOT NULL
);

/*COPY issues FROM '/Users/marbocheng/Desktop/maintenance-app/seeders/issues.csv' DELIMITER ',' CSV HEADER;*/
CREATE TABLE issues (
  id serial PRIMARY KEY,
  room_id INT NOT NULL,
  category_id INT NOT NULL,
  subcategory_id INT NOT NULL,
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

/*COPY contacts FROM '/Users/marbocheng/Desktop/maintenance-app/contacts.csv' DELIMITER ',' CSV HEADER; */
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

/* COPY subcategories FROM '/Users/marbocheng/Desktop/maintenance-app/subcategories.csv' DELIMITER ',' CSV HEADER; */
CREATE TABLE subcategories (
    id serial PRIMARY KEY,
    category_id INT NOT NULL,
    subcategory varchar(30) NOT NULL,
);




