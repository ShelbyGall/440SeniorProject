drop table user;

create table user(
	username 	varchar(255) not null,
	password 	varchar(255) not null,
	firstName 	varchar(255),
	lastName 	varchar(255),
	email 		varchar(255) unique not null,
	primary key(username)
	);
    
insert into user
	values("shell", "123", "Shelby",null,"contactMe-shelby-@gmail.com");

insert into user 
	values("dBoy", "123",null,null,"contactMe-daniel-@gmail.com");
    
insert into user 
	values("RishRash", "123","Rishabh","Chadha","contactMe-Rishabh-@gmail.com");
    
    