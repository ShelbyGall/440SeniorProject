create table user(
	username 	varchar(255) not null,
	password 	varchar(255) not null,
	firstName 	varchar(255),
	lastName 	varchar(255),
	email 		varchar(255) unique not null,
	primary key(username)
	);

create table item (
	itemID		int auto_increment not null,	
	title		varchar(255) not null,
	descr		varchar(255) not null,
	category	varchar(255) not null,
	postDate	date not null,
    username 	varchar(255) not null,
	price		Decimal(19,4) not null,
	foreign key(username) references user(username),
	primary key(itemID)
);

create table reviews (
	rating		varchar(255) not null,
	text		varchar(255) not null,
	username	varchar(255) not null,
    foreign key(username) references user(username),
    revDate		date not null,
    itemID 		int not null,
    foreign key(itemID) references item(itemID)
);

