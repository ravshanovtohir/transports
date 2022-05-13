const GET_BRANCHES = `
select
    branche_id,
    branche_name,
    branche_address,
    branche_created_at
from branches
where branche_name ilike concat('%', $3::varchar, '%')
offset $1 limit $2
;
`

// select 
//     s.staff_id,
//     s.staff_name,
//     s.staff_birth_date,
//     b.branch_name,
//     s.staff_created_at
//     from staffs as s
// inner join branches as b on s.branch_id = b.branch_id
// where s.staff_name = 'Jakhongir';

const GET_BRANCH = `
select
    branche_id,
    branche_name,
    branche_address,
    branche_created_at
from branches
where branche_id = $1
;
`

const ADD_BRANCH = `
    insert into branches (
        branche_name,
        branche_address
    ) values (
        $1::varchar,
        $2::varchar
    ) returning *
`

const CHANGE_BRANCH = `
update branches b set
    branche_name = (
        case
            when length($2) > 0 then $2
            else b.branche_name
        end
    ),
    branche_address = (
        case
            when length($3) > 0 then $3
            else b.branche_address
        end
    )
where branche_id = $1
returning *
`

const DELETE_BRANCH = `
delete from branches
where branche_id = $1
returning *
`


const BRANCH_PER = `
    select
        pb.branche_read,
        pb.branche_id,
        pb.branche_create,
        pb.branche_delete,
        pb.branche_update,
        b.branche_name,
        pb.staff_id
    from permissions_branches pb
    inner join branches b on pb.branche_id = b.branche_id
    where pb.staff_id = $1 and b.branche_name = $2::varchar;
`

const RES_BRANCH_PER = `
select 
    b.branche_id,
    b.branche_name,
    b.branche_address,
    b.branche_created_at,
from branches as b
where b.branche_name = $4 and s.branche_name ilike concat('%', $3::varchar, '%')
offset $1 limit $2
`

export default {
    GET_BRANCHES,
    GET_BRANCH,
    ADD_BRANCH,
    BRANCH_PER,
    RES_BRANCH_PER,
    CHANGE_BRANCH,
    DELETE_BRANCH
}