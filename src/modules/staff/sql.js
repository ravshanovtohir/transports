const GET_STAFFS = `
select
    s.staff_id,
    s.staff_name,
    s.staff_birth_date,
    b.branche_name,
    s.staff_created_at,
    CONCAT(b.branche_name, ' ', b.branche_address) as full_adress
from staffs as s
inner join branches as b on s.branche_id = b.branche_id
where 
    staff_name ilike concat('%', $3::varchar, '%')
offset $1 limit $2
;
`

const GET_STAFF = `
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
`

const LOGIN_STAFF = `
select
    s.staff_id,
    s.staff_name,
    s.staff_birth_date,
    b.branche_name,
    s.staff_created_at,
    CONCAT(b.branche_name, ' ', b.branche_address) as full_adress
from staffs as s
inner join branches as b on s.branche_id = b.branche_id
where s.staff_name = $1 and s.staff_password = $2
;
`

const REGISTER_STAFF = `
    insert into staffs (staff_name, staff_password, staff_birth_date, branche_id) values
    ($1, $2, $3, $4)
    returning *
    ;
`


export default {
    GET_STAFFS,
    GET_STAFF,
    LOGIN_STAFF,
    REGISTER_STAFF,
}