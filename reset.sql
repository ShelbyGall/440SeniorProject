drop table item;
drop table user;
drop table reviews;

insert into user
	values("shell", "123", "Shelby",null,"contactMe-shelby-@gmail.com");

insert into user 
	values("dBoy", "123",null,null,"contactMe-daniel-@gmail.com");
    
insert into user 
	values("RishRash", "123","Rishabh","Chadha","contactMe-Rishabh-@gmail.com");
    
insert into item (title,descr,category,postDate,username)
	values("phone", "this is a black phone", "electronics", "2024-04-07", "shell");
    
insert into item (title,descr,category,postDate,username)
	values("phone", "this is a white phone", "electronics", "2024-02-03", "dBoy");
    
