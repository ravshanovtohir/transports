import db from "#pg"
import query from "./sql.js"

async function branchPer({ staffId, branchName }) {
    console.log(staffId, branchName);
    const branch = await db(query.BRANCH_PER, staffId, branchName)
    console.log(branch);
    return branch
}