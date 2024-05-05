-- 1. most expensive item in each category
-- NO INPUT NEEDED
select title, category, price
from item
where price in (select max(price) from item group by category)

-- 2. shell can be changed to any user
-- **INPUT NEEDED**
SELECT i.itemID, i.title, i.descr
FROM item i
JOIN reviews r ON i.itemID = r.itemID
WHERE i.username = "shell"
GROUP BY i.itemID, i.title, i.descr
HAVING COUNT(*) = SUM(r.rating IN ('Excellent', 'Good'))




-- 3. we will have to go through the results to check
--    for what has the highest freq or display all with 
--    highest freq if there are duplicates
--    postDate can be changed to any date
-- CHOOSE WHETHER TO HARD CODE OR NOT
select username, count(username) as "Number of Items"
from item as i
where postDate = "2024-04-15"
group by username
having count(username) = (
	select count(username) 
    from item 
    where postDate = "2024-04-15"
    group by username 
    order by count(username) desc
    limit 1
    )

-- 4. Get shared favorite user of two users
-- INPUT NEEDED
SELECT f1.favorite_username
FROM favorites f1
JOIN favorites f2 ON f1.favorite_username = f2.favorite_username
WHERE f1.user_username = ? AND f2.user_username = ?
AND f1.user_username != f2.user_username;

-- 5. Display all users that dont have 3 or more excellent reviews for a any item
-- NO INPUT NEEDED
select username 
from user
where username not in (
	select distinct username
	from item as i
	where 3 <= (
		select count(r.itemID)
		from reviews as r
		where i.itemID = r.itemID and r.rating = "excellent"
	)
)

-- *** NOTE: this is a less efficient query
-- select username
-- from user
-- where username not in (
-- 	select i.username
-- 	from reviews as r, item as i
-- 	where i.itemID = r.itemID and r.rating = "excellent"
-- 	group by i.username
-- 	having count(i.username) >= 3 
-- )

-- 6. all users that have given only reviews with a poor rating
-- NO INPUT NEEDED
select username
from reviews as r
group by username
having count(username) = (
	select count(username)
    from reviews
    where r.username = username and rating = "poor"
)
