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
        login: async(_, args, {agent, ip}) => {
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
                token: JWT.sign({ staffId: staff.staff_id, agent, ip, staffname: staff.staff_name }),
                data: staff
            }
        },

        register: async(_, args, {agent, ip}) => {
            let { staffname, staffPassword, confirmPassword, staffBirthDate, brancheId } = args
            const staff = await model.registerStaff(staffname, staffPassword, staffBirthDate, brancheId)
            
             const staffs = await model.getStaffs({
                page: args.page ? args.page : STAFF_CONFIG.PAGINATION.PAGE,
                limit: args.limit ? args.limit : STAFF_CONFIG.PAGINATION.LIMIT,
                search: args.search
            })

            console.log(staffs)

            const user = staffs.find(el=> el.staff_name == staff.staff_name)

            if(user){
                throw new Error("This staff name already exists")
            }

            staffname = staffname.trim()
            staffPassword = staffPassword.trim()
            confirmPassword = confirmPassword.trim()

            if(
                !staffname ||
                staffname.length > 50
            ) {
                throw new Error("The username cannot be empty!")
            }

            if((
                !staffPassword || staffPassword.length < 6 ||
                staffPassword.length > 50) || 
                (
                    !confirmPassword || confirmPassword.length < 6 ||
                    confirmPassword.length > 50
                ) || staffPassword !== confirmPassword
            ) {
                throw new Error("Invalid password!")
            }

            return{
                status: 201,
                message: "The staff succesfully logged in",
                token: JWT.sign({ staffId: staff.staff_id, agent, ip,  staffname: staff.staff_name }),
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