-- USER INSERTS
insert into user
	values("shell", "123", "Shelby",null,"contactMe-shelby-@gmail.com");

insert into user 
	values("dBoy", "123",null,null,"contactMe-daniel-@gmail.com");
    
insert into user 
	values("RishRash", "123","Rishabh","Chadha","contactMe-Rishabh-@gmail.com");

insert into user
	values("BlackMamba", "GOAT", "Kobe", "Bryant", "blackMamba@yahoo.com");

insert into user
	values("goober", "gobgob", "goo", "ber", "goober@gmail.com");

insert into user
	values("hokage", "sasuke", "Naruto", "Uzumaki", "believeIt@yahoo.com");





-- ITEM INSERTS
insert into item (title,descr,category,postDate,username,price)
	values("phone", "this is a black phone", "electronics", "2024-04-15", "shell", 1200);
    
insert into item (title,descr,category,postDate,username,price)
	values("phone", "this is a white phone", "electronics", "2024-04-15", "shell", 1100);
    
insert into item (title,descr,category,postDate,username,price)
	values("hat", "timberland", "clothing", "2024-04-15", "RishRash", 20);

insert into item (title,descr,category,postDate,username,price)
	values("Backpack", "waterproof climbing backpack meant for adventures", "clothing", "2024-04-15", "dBoy", 45);

insert into item (title,descr,category,postDate,username,price)
	values("G-shock Rolex Watch", "Gold and diamond studded G-shock Rolex collaboration watch", "accessories", "2024-04-15", "dBoy", 2000);

insert into item (title,descr,category,postDate,username,price)
	values("Basketball", "a brown sphere with leather textured grip", "miscellaneous", "2024-04-15", "BlackMamba", 35);

insert into item (title,descr,category,postDate,username,price)
	values("Knife", "A japanese Kunai", "miscellaneous", "2024-04-15", "hokage", 100);

insert into item (title,descr,category,postDate,username,price)
	values("Cybertruck", "Teslas CyberTruck in gray", "miscellaneous", "2024-04-15", "goober", 20050);

insert into item (title,descr,category,postDate,username,price)
	values("Lego Spiderman", "440 piece lego set featuring spiderman", "miscellaneous", "2024-04-16", "goober", 90);





-- REVIEWS INSERTS
insert into reviews (rating, text, username, revDate, itemID)
	values("poor", "item sucks", "RishRash", "2024-04-16", 1);

insert into reviews (rating, text, username, revDate, itemID)
	values("excellent", "best basketball I've ever used!!", "RishRash", "2024-04-16", 6);

insert into reviews (rating, text, username, revDate, itemID)
	values("excellent", "never made more 3 pointers in my life than I did with this ball", "shell", "2024-04-16", 6);

insert into reviews (rating, text, username, revDate, itemID)
	values("excellent", "this ball is the best! believe it!", "hokage", "2024-04-16", 6);

insert into reviews (rating, text, username, revDate, itemID)
	values("good", "its actually better than expected", "goober", "2024-04-16", 6);

insert into reviews (rating, text, username, revDate, itemID)
	values("good", "its very sturdy and has a great 0-60 time", "BlackMamba", "2024-04-17", 8);

insert into reviews (rating, text, username, revDate, itemID)
	values("poor", "came completely cracked", "dBoy", "2024-04-17", 1);

insert into reviews (rating, text, username, revDate, itemID)
	values("poor", "there is no charger!", "dBoy", "2024-04-17", 2);

insert into reviews (rating, text, username, revDate, itemID)
	values("poor", "the hat looks absolutely stupid", "dBoy", "2024-04-17", 3);

insert into reviews (rating, text, username, revDate, itemID)
	values("fair", "for 45$, its not too shabby", "goober", "2024-04-16", 4);

insert into reviews (rating, text, username, revDate, itemID)
	values("fair", "Its a pretty cool watch but fits a little too big", "shell", "2024-04-16", 5);
    
insert into reviews (rating, text, username, revDate, itemID)
	values("good", "I really love spiderman", "shell", "2024-04-16", 9);
    
    





-- FAVORITE INSERTS
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