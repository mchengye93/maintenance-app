

/*CRUD Issues*/

/*Return all issues for vip rooms*/
SELECT rooms.id, rooms.vip, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN rooms ON rooms.id = issues.room_id AND rooms.vip = true
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE issues.dateFixed IS NULL
ORDER BY date, rooms.id ASC;

/* Return issues table with category and subcategory */
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id AND issues.room_id = 10 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
ORDER BY date ASC;


/*
Return all unsolved issues
*/
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE dateFixed IS NULL
ORDER BY date ASC;

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
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE CURRENT_DATE > (date + interval '7' day) AND dateFixed IS NULL 
ORDER BY date, room_id ASC;

/*
Return all issues that have been for more than two weeks
*/
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE CURRENT_DATE > (date + interval '14' day) AND dateFixed IS NULL 
ORDER BY date, room_id ASC;

/*
Return all issues by date from earliest
*/

SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
ORDER BY issues.date, issues.room_id  ASC;


/* Return all issues by specific category order by date and then room*/
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE categories.category = 'Plumbing'
ORDER BY issues.date, issues.room_id  ASC;


/* CRUD Contacts */
/*CREATE contacts*/
INSERT INTO contacts (category_id, name, phone, email) VALUES (1, 'NameTest', '(888) 888-8888', 'Testemail@email.com');

/*READ: Return all contact with specific category*/
SELECT  contacts.id, contacts.category_id, categories.category, contacts.name, contacts.phone, contacts.email FROM contacts
INNER JOIN categories ON contacts.category_id = categories.id 
ORDER BY categories.category,contacts.name ASC;

/*UPDATE: Update specific contact */
UPDATE contacts SET category_id = 3, name = 'UpdateName', phone = '(777) 777-7777', email = 'updateemail@email.com' WHERE id = 11; 

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
/* Return all categories with their subcategories
*/
SELECT * FROM subcategories 
INNER JOIN categories 
ON categories.id = subcategories.category_id;


/*
Return all subcategories of specific category
*/

SELECT * FROM subcategories 
INNER JOIN categories 
ON categories.id = subcategories.category_id
WHERE category = 'Electrical';

