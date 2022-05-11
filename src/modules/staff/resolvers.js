import model from "./model.js"
import { STAFF_CONFIG } from "#config/index"

export default {
    Query: {
        staffs: async(_, { pagination, search }) => {
            console.log(STAFF_CONFIG)
            return await model.getStaffs({
                page: pagination?.page || STAFF_CONFIG.PAGINATION.PAGE,
                limit: pagination?.limit || STAFF_CONFIG.PAGINATION.LIMIT,
                search,
            })
        },
        staff: async(_, args) => {
            return await model.getStaff(args)
        }
    },

    Staff: {
        staffId: global => global.staff_id,
        staffname: global => global.staff_name,
        staffBirthDate: global => global.staff_birth_date,
        staffWorkPlace: global => global.branche_name,
        fullAdress: global => global.full_adress,
        staffCreatedAt: global => global.staff_created_at
    }
}