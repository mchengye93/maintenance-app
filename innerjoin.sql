
SELECT issues.room_id, issues.category_id, categories.category, 
issues.subcategory_id, subcategories.subcategory ,issues.date 
FROM issues 
INNER JOIN categories ON issues.category_id= categories.id AND issues.room_id = 10 
INNER JOIN subcategories ON issues.subcategory_id = subcategories.id;