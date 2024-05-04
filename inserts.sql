insert into user
	values("shell", "123", "Shelby",null,"contactMe-shelby-@gmail.com");

insert into user 
	values("dBoy", "123",null,null,"contactMe-daniel-@gmail.com");
    
insert into user 
	values("RishRash", "123","Rishabh","Chadha","contactMe-Rishabh-@gmail.com");
    
insert into item (title,descr,category,postDate,username,price)
	values("phone", "this is a black phone", "electronics", "2024-04-07", "shell", 1200);
    
insert into item (title,descr,category,postDate,username,price)
	values("phone", "this is a white phone", "electronics", "2024-02-03", "dBoy", 1100);
    
insert into item (title,descr,category,postDate,username,price)
	values("hat", "timberland", "clothing", "2024-04-10", "shell", 20);

insert into reviews (rating, text, username, revDate, itemID)
	values("poor", "item sucks", "RishRash", "2024-04-14", 1);

insert into favorites (user_username, favorite_username) 
	values('RishRash', 'shell');

insert into favorites (user_username, favorite_username) 
	values('dBoy', 'shell');

insert into favorites (user_username, favorite_username) 
	values('shell', 'RishRash');

insert into favorites (user_username, favorite_username) 
	values('dBoy', 'RishRash');

insert into favorites (user_username, favorite_username) 
	values('shell', 'dBoy');