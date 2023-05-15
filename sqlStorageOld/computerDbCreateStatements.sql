drop database if exists computerdb;
create database computerdb;

use computerdb;

create table computer(
    id integer not null primary key,
    name varchar(30) not null,
    type varchar(20) not null,
    processor varchar(15) not null,
    amount integer not null,
    imagename varchar(256)
);

insert into computer values(1,
'BigFlop Mark II','server','MinPower',30,'computer1.png');

insert into computer values(2,
'Xunil 4.7','server','piTron 3',20,'computer2.png');

insert into computer values(3,
'MaxEffect 2000','tabletop','MotorOlè',30,null);  
    
drop user if exists 'oliver'@'localhost';
create user 'oliver'@'localhost' identified by '12345';

grant all privileges on computerdb.* to 'oliver'@'localhost';