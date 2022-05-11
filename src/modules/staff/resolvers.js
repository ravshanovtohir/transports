import model from "./model.js"

export default {
    Query: {
        staffs: async() => {
            return await model.getStaffs()
        },
        // staff: async(_, args) => {
        //     return await model.getFood(args)
        // }
    },

    Staff: {
        staffId: global => global.staff_id,
        staffname: global => global.staff_name,
        staffBirthDate: global => global.staff_birth_date,
        staffWorkPlace: global => global.branche_name,

    }
}