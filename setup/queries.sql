
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

select
    *
from staffs as s
where s.staff_name = 'Burkhon' and s.staff_password = 'burkhon1'
;

select
    s.staff_id,
    s.staff_name,
    s.staff_birth_date,
    b.branche_name,
    s.staff_created_at,
    CONCAT(b.branche_name, ' ', b.branche_address) as full_adress
from staffs as s
inner join branches as b on s.branche_id = b.branche_id
where s.staff_name = 'Burkhon' and s.staff_password = 'burkhon1'
;

const LOGIN_STAFF = `
    select
        s.staff_id,
        s.staff_name,
        s.staff_birth_date,
        s.staff_created_at
    from staffs as s
    where s.staff_name = $1 and s.staff_password = $2
;

`

select
    s.staff_id,
    s.staff_name,
    s.staff_birth_date,
    b.branche_name,
    s.staff_created_at,
    CONCAT(b.branche_name, ' ', b.branche_address) as full_adress
from staffs as s
inner join branches as b on s.branche_id = b.branche_id
where staff_id = $1
where


delete from staffs where staff_id > 3;



drop table if exists staffs;
create table staffs (
    staff_id serial not null primary key,
    staff_name varchar(64) not null unique,
    staff_password varchar(255) not null,
    staff_birth_date varchar(10) not null,
    staff_is_root boolean default false,
    staff_created_at timestamptz default current_timestamp,
    branche_id int not null references branches(branch_id)
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



select
    branche_id,
    branche_name,
    branche_address,
    branche_created_at
from branches
offset 1 limit 2
;