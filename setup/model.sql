-- drop database if exists
drop database if exists moce_info;

-- create database look
create database moce_info;

-- connect to database look
\c moce_info;

--extension for password
create extension pgcrypto;


--table branches
drop table if exists branches;
create table branches (
    branche_id serial not null primary key,
    branche_name varchar(64) not null,
    branche_address varchar(64) not null,
    branche_created_at timestamptz default current_timestamp
);

drop table if exists staffs;
create table staffs (
    staff_id serial not null primary key,
    staff_name varchar(64) not null,
    staff_password varchar(32) not null,
    staff_birth_date varchar(10) not null,
    staff_is_root boolean default false,
    staff_created_at timestamptz default current_timestamp,
    branche_id int not null references branches(branche_id)
);


drop table if exists transports;
create table transports (
    transport_id serial not null primary key,
    transport_name varchar(64) not null,
    transport_model varchar(32) not null,
    transport_color varchar(32) not null,
    transport_img text not null,
    transport_created_at timestamptz default current_timestamp,
    branche_id int references branches(branche_id),
    staff_id int not null references staffs(staff_id)
);



drop table if exists permissions_transports;
create table permissions_transports (
    transport_permission_id serial not null primary key,
    transport_create boolean default false,
    transport_read boolean default false,
    transport_delete boolean default false,
    transport_update boolean default false,
    branche_id int not null references branches(branche_id),
    staff_id int not null references staffs(staff_id)
);

drop table if exists permissions_branches;
create table permissions_branches (
    branche_permission_id serial not null primary key,
    branche_create boolean default false,
    branche_read boolean default false,
    branche_delete boolean default false,
    branche_update boolean default false,
    branche_id int not null references branches(branche_id),
    staff_id int references staffs(staff_id)
);



select
    s.staff_id,
    s.staff_name,
    s.staff_birth_date,
    b.branche_name,
    s.staff_created_at,
    CONCAT(b.branche_name, ' ', b.branche_address) as full_adress
from staffs as s
inner join branches as b on s.branche_id = b.branche_id
;

