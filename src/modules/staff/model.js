import db from "#pg"
import query from "./sql.js"

async function getStaffs({ page, limit, search }) {
    console.log(search)
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

async function registerStaff({ staffname, staffpassword, staffBirthDate, brancheId }) {
    const [staff] = await db(query.LOGIN_STAFF, staffname, staffPassword, staffBirthDate, brancheId)
    return staff
}

// async function getFood({ foodId }) {
//     const [food] = await db(query.GET_FOOD, foodId)
//     return food
// }

export default {
    getStaffs,
    getStaff,
    loginStaff
}