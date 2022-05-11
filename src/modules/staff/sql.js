const GET_STAFF = `
select
    s.staff_id,
    s.staff_name,
    s.staff_birth_date,
    b.branche_name
from staffs as s
inner join branches as b on s.branche_id = b.branche_id
;
`

export default {
    GET_STAFF
}