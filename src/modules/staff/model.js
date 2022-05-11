import db from "#pg"
import query from "./sql.js"

async function getStaffs() {
    return await db(
        query.GET_STAFF,
    )
}

// async function getFood({ foodId }) {
//     const [food] = await db(query.GET_FOOD, foodId)
//     return food
// }

export default {
    getStaffs
}