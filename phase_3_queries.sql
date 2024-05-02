-- 1. most expensive item in each category
-- NO INPUT NEEDED
select title, category, price
from item
where price in (select max(price) from item group by category)

-- 2. shell can be changed to any user
-- **INPUT NEEDED**
select i.title, i.descr, i.category, i.username as Poster, i.category, r.username as Reviewer, r.text,r.rating
from item as i, reviews as r
where i.username = "shell" and i.itemID = r.itemID and (r.rating = "excellent" or r.rating = "good")

-- 3. we will have to go through the results to check
--    for what has the highest freq or display all with 
--    highest freq if there are duplicates
--    postDate can be changed to any date
-- CHOOSE WHETHER TO HARD CODE OR NOT
select username, count(username) as freq
from item 
where postDate = "2024-04-29"
group by username
order by freq desc

-- 4. WTF is favorited mean???

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
