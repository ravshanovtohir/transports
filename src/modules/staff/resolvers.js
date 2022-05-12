import model from "./model.js"
import { STAFF_CONFIG } from "#config/index"
import JWT from '../../helpers/jwt.js'

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

    Mutation:{
        login: async(_, args, {agent}) => {
            const staff = await model.loginStaff(args)
            
            if (!staff) {
                return {
                    status: 400,
                    message: "Wrong staffname or password",
                    data: null
                }
            }


            return{
                status: 201,
                message: "The staff succesfully logged in",
                token: JWT.sign({ staffId: staff.staff_id, agent, staffname: staff.staff_name }),
                data: staff
            }
        },
        
    },

    Staff: {
        staffId: global => global.staff_id,
        staffname: global => global.staff_name,
        staffBirthDate: global => global.staff_birth_date,
        staffWorkPlace: global => global.branche_name,
        fullAdress: global => global.full_adress,
        staffCreatedAt: global => global.staff_created_at.toISOString()
    }
}