/*SELECT setval('payments_id_seq', 21, true);*/

/*CRUD Issues*/

/*Create issues (room_id,category_id,subcategory_id,date_issued*/
INSERT INTO issues (room_id,category_id,subcategory_id,date_issued) VALUES (1,1,1,CURRENT_TIMESTAMP);

/*Only works for MySQL*/
INSERT INTO issues SET room_id=10, category_id=2, subcategory_id=10, date_issued=CURRENT_TIMESTAMP;


/*Create issues given description*/
INSERT INTO issues (room_id,category_id,subcategory_id,date_issued,description) VALUES (1,1,1,CURRENT_TIMESTAMP,'Need to buy new telephone');


/*Return all issues for vip rooms*/
SELECT rooms.id, rooms.vip, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued, issues.date_received 
FROM issues 
INNER JOIN rooms ON rooms.id = issues.room_id AND rooms.vip = true
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE issues.date_resolved IS NULL
ORDER BY date_issued, rooms.id ASC;

/* Return issues table with category and subcategory */
SELECT issues.id,issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE issues.id = 10;


/*
Return all unsolved issues 
*/
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued, issues.date_received 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE date_resolved IS NULL
ORDER BY date_issued ASC;


/*Return all pending issues that haven't been received */
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued, issues.date_received 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE date_received IS NULL
ORDER BY date_issued ASC;

/* Return all issues that have been received */
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued, issues.date_received 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE date_resolved IS NULL AND date_received IS NOT NULL
ORDER BY date_issued ASC;


/* Return all pending issues received by specific contact_id(eletrician, plumber, maintenance worker)*/
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued, issues.contact_id, issues.date_received
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE date_received IS NOT NULL AND date_resolved IS NULL 
AND contact_id = 1 
ORDER BY date_issued ASC;

/* Return all issues that have been resolved */
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued, issues.contact_id, issues.date_received, issues.date_resolved 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE date_resolved IS NOT NULL
ORDER BY date_issued ASC;


/* Return all details of specific issue
*/
SELECT issues.id, issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date, 
issues.description, issues.cost , issues.photourl 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE issues.id = 10;

/*
Return all unsolved issues that have more than a week without being solved
*/
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE CURRENT_DATE > (date_issued + interval '7' day) AND date_resolved IS NULL 
ORDER BY date_issued, room_id ASC;

/*
Return all issues that have been for more than two weeks
*/
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE CURRENT_DATE > (date_issued + interval '14' day) AND date_resolved IS NULL 
ORDER BY date_issued, room_id ASC;

/*
Return all issues by date from earliest
*/

SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
ORDER BY issues.date_issued, issues.room_id  ASC;


/* Return all pending issues by specific category order by date and then room*/
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date_issued
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE categories.category = 'Electrical' AND issues.date_resolved IS NULL
ORDER BY issues.date_issued, issues.room_id  ASC;


/*UPDATE issue given an id */
UPDATE issues SET date_resolved= CURRENT_TIMESTAMP WHERE id = 203;

/*UPDATE issue given a cost and description */
UPDATE issues SET cost= 99, description='Had to buy new water valve', date_resolved= CURRENT_TIMESTAMP WHERE id = 203;

/*UPDATE issue when someone takes over the issue*/
UPDATE issues SET contact_id=1, date_received=CURRENT_TIMESTAMP WHERE id = 203;

/* CRUD Contacts */
/*CREATE contacts*/
INSERT INTO contacts (category_id, name, phone, email) VALUES (1, 'NameTest', '(888) 888-8888', 'Testemail@email.com');

/*READ: Return all contact with specific category*/
SELECT  contacts.id, contacts.category_id, categories.category, contacts.name, contacts.phone, contacts.email FROM contacts
INNER JOIN categories ON contacts.category_id = categories.id 
ORDER BY categories.category,contacts.name ASC;

/*UPDATE: Update specific contact */
UPDATE contacts SET category_id = 3, name = 'UpdateName', phone = '(777) 777-7777', email = 'updateemail@email.com' WHERE id = 11; 


/*DELETE issue that was created by mistake*/
DELETE FROM issues WHERE id = 204;
/*DELETE contact */
DELETE FROM contacts WHERE id = 11;
/*CRUD Categories*/ 

/*CREATE category*/
INSERT INTO categories (category) VALUES ('New Category');

/* READ: Return all categories */
SELECT * FROM categories;

/* UPDATE: Update specific category*/
UPDATE categories SET category = 'UPDATECategory' WHERE id = 7;

/* DELETE category */
DELETE FROM categories WHERE id = 6;

/*CRUD Subcategories*/
/*Create subcategory given categoryId and subcategory*/
INSERT INTO subcategories (category_id, subcategory) VALUES (1,'test');
/* Return all categories with their subcategories
*/
SELECT * FROM subcategories 
INNER JOIN categories 
ON categories.id = subcategories.category_id;


/*UPDATE subcategory*/
UPDATE subcategories SET category_id = 5, subcategory = 'Subcategory UPDATE' WHERE id = 26;
/*DELETE Specific subcategory*/
DELETE FROM subcategories WHERE id = 100;

/*
Return all subcategories of specific category
*/

SELECT * FROM subcategories 
INNER JOIN categories 
ON categories.id = subcategories.category_id
WHERE category = 'Electrical';


/*CRUD for rooms*/

/*Create a room*/
INSERT INTO rooms(id,vip,parking) VALUES (101,true,true);

/*Return all room infors*/
SELECT * FROM rooms;

/*Read a room info*/
SELECT * FROM rooms WHERE id = 10;