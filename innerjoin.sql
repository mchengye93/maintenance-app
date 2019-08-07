
/* Return issues table with category and subcategory */
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id AND issues.room_id = 10 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id;

/*Return all contact with specific category*/
SELECT  contacts.category_id, categories.category, contacts.name, contacts.phone, contacts.email FROM contacts
INNER JOIN categories ON contacts.category_id = categories.id 
ORDER BY categories.category,contacts.name ASC;

/* Return all issues by specific category order by date and then room*/
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id
WHERE categories.category = 'Plumbing'
ORDER BY issues.date, issues.room_id  ASC;

/* Return all categories
*/
SELECT * FROM categories;

/* Return all subcategories*/
SELECT * FROM subcategories;

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

/*
Return issues by date
*/
SELECT * FROM issues ORDER BY date ASC;

/*
Return all unsolved issues
*/
SELECT * FROM issues WHERE dateFixed IS NULL;

/*
Return all unsolved issues that have more than a week without being solved
*/
SELECT * FROM issues WHERE CURRENT_DATE > (date + interval '7' day) ;

/*
Return all issues that have been for more than two weeks
*/
SELECT * FROM issues WHERE CURRENT_DATE > (date + interval '14' day) ;

/*
Return all issues by date from earliest
*/