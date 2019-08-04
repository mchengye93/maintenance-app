
/* Return issues table with category and subcategory */
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id AND issues.room_id = 10 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id;

/*Return all contact with specific category*/
SELECT  contacts.category_id, categories.category, contacts.name, FROM contacts
INNER JOIN categories ON contacts.category_id = categories.id ORDER BY categories ASC;