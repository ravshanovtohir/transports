const GET_TRANSPORTS = `
select
    t.transport_id,
    t.transport_name,
    t.transport_model,
    t.transport_color,
    t.transport_img,
    t.transport_created_at,
    t.branche_id,
    b.branche_name,
    t.staff_id
from transports as t
join branches as b on b.branche_id = t.branche_id
where transport_name ilike concat('%', $3::varchar, '%')
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

const GET_TRANSPORT = `
select
    transport_id,
    transport_name,
    transport_model,
    transport_color,
    transport_img,
    transport_created_at,
    branche_id,
    staff_id
from transports
where transport_id = $1
;
`

const ADD_TRANSPORT = `
    insert into transports (
        transport_name, 
        transport_model, 
        transport_color, 
        transport_img, 
        branche_id, 
        staff_id
    ) values (
        $1::varchar,
        $2::varchar,
        $3::varchar,
        $4::varchar,
        $5,
        $6
    ) returning *
`

const CHANGE_TRANSPORT = `
update transports t set
    transport_name = (
        case
            when length($2) > 0 then $2
            else t.transport_name
        end
    ),
    transport_model = (
        case
            when length($3) > 0 then $3
            else t.transport_model
        end
    ),
    transport_color = (
        case
            when length($4) > 0 then $4
            else t.transport_color
        end
    )
where transport_id = $1
returning *
`

const DELETE_TRANSPORT = `
delete from transports
where transport_id = $1
returning *
`


const TRANSPORT_PER = `
    select
        pt.transport_read,
        --pt.transport_id,
        pt.transport_create,
        pt.transport_delete,
        pt.transport_update,
        b.branche_name,
        pt.staff_id
    from permissions_transports pt
    inner join branches b on pt.branche_id = b.branche_id
    where pt.staff_id = $1 and pt.branche_id = $2;
`

const RES_TRANSPORT_PER = `
select 
    s.staff_id,
    s.staff_name,
    s.staff_birth_date,
    b.branch_name,
    s.staff_created_at,
    CONCAT(b.branch_name, ' ', b.branch_address) as full_adress
from staffs as s
inner join branches as b on s.branch_id = b.branch_id
where b.branch_name = $4 and s.staff_name ilike concat('%', $3::varchar, '%')
offset $1 limit $2
`

export default {
    GET_TRANSPORTS,
    GET_TRANSPORT,
    ADD_TRANSPORT,
    TRANSPORT_PER,
    RES_TRANSPORT_PER,
    CHANGE_TRANSPORT,
    DELETE_TRANSPORT
}