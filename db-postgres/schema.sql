DROP DATABASE IF EXISTS maintenance;

CREATE DATABASE maintenance;

USE maintenance;

/*SELECT setval('payments_id_seq', 21, true);*/
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
  photourl text,
  description TEXT,
  comment TEXT,
  cost INT ,
  date_issued TIMESTAMP NOT NULL,
  contact_id INT,
  date_received TIMESTAMP,
  date_resolved TIMESTAMP
);
/*
Category: Plumbing, Electrical, Fixture, Furniture, Decoration
*/

/*
Status 
*/
CREATE TABLE status (
  id serial PRIMARY KEY,
  issue_id INT NOT NULL,
  date_received TIMESTAMP ,
  date_resolved TIMESTAMP
);

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

/* COPY subcategories FROM '/Users/marbocheng/Desktop/maintenance-app/seeders/subcategories.csv' DELIMITER ',' CSV HEADER; */
CREATE TABLE subcategories (
    id serial PRIMARY KEY,
    category_id INT NOT NULL,
    subcategory varchar(30) NOT NULL,
);




