-- drop table reviews;
-- drop table item;
-- drop table user;


-- insert into user
-- 	values("shell", "123", "Shelby",null,"contactMe-shelby-@gmail.com");

-- insert into user 
-- 	values("dBoy", "123",null,null,"contactMe-daniel-@gmail.com");
--     
-- insert into user 
-- 	values("RishRash", "123","Rishabh","Chadha","contactMe-Rishabh-@gmail.com");
--     
insert into item (title,descr,category,postDate,username,price)
	values("phone", "this is a black phone", "electronics", "2024-04-07", "shell", 1200);
    
insert into item (title,descr,category,postDate,username,price)
	values("phone", "this is a white phone", "electronics", "2024-02-03", "dBoy", 1100);
    
insert into item (title,descr,category,postDate,username,price)
	values("hat", "timberland", "clothing", "2024-04-10", "shell", 20);