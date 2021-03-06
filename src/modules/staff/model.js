import db from "#pg"
import query from "./sql.js"

async function getStaffs({ page, limit, search }) {
    return await db(
        query.GET_STAFFS,
        (page - 1) * limit,
        limit,
        search
    )
}

async function getStaff({ staffId }) {
    const [staff] = await db(query.GET_STAFF, staffId)
    return staff
}

async function loginStaff({ staffname, staffPassword }) {
    const [staff] = await db(query.LOGIN_STAFF, staffname, staffPassword)
    return staff
}

async function registerStaff(staffname, staffPassword, staffBirthDate, brancheId) {
    const [staff] = await db(query.REGISTER_STAFF, staffname, staffPassword, staffBirthDate, brancheId)
    return staff
}

async function staffPer({ staffId, branchId }) {
    const staff = await db(query.STAFF_PER, staffId, branchId)
    return staff
}

async function resStaffPer({ page, limit, search, branchId }) {
    const staff = await db(query.RES_STAFF_PER, page, limit, search, branchId)
    return staff
}


export default {
    getStaffs,
    getStaff,
    loginStaff,
    registerStaff,
    staffPer,
    registerStaff,
    resStaffPer
}