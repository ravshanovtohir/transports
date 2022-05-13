import model from "./model.js"
import modelUser from "../staff/model.js"
import { UserInputError } from 'apollo-server-express'
import { BRANCH_CONFIG } from '#config/index'
import JWT from "../../helpers/jwt.js"
import sha256 from "sha256"

export default {
    Query: {
        branches: async(_, args, {token}) => {
            
            const { ip, agent, staffId, branchId, branchName, isRoot } = JWT.verify(token)

            let res = await model.branchPer({
                staffId,
                branchName
            })


            let checkk = await modelUser.getStaff({ staffId })
            console.log("che", checkk)
            if (checkk.staff_is_root) {
            console.log("res", checkk)
                let branch = await model.getBranches({
                    page: args.page ? args.page : BRANCH_CONFIG.PAGINATION.PAGE,
                    limit: args.limit ? args.limit : BRANCH_CONFIG.PAGINATION.LIMIT,
                    search: args.search
                })
                console.log("br", branch)

                return branch
            }

            if (res[0]?.branche_read) {
                let branch = await model.getBranches({
                    page: args.page ? args.page : BRANCH_CONFIG.PAGINATION.PAGE,
                    limit: args.limit ? args.limit : BRANCH_CONFIG.PAGINATION.LIMIT,
                    search: args.search
                })
                console.log("br", branch)

                return branch
            } else {
                return await model.getBranch({branchId})
            }
        },
        branch: async(_, args) => {
            return await model.getBranch(args)
        }
    },

    Mutation: {
        addBranch: async(_, args, {token}) => {

            const { ip, agent, staffId, branchName, branchId, isRoot } = JWT.verify(token)

            let { branchname, branchAdress } = args
            const branches = await model.getBranches({
                page: args.page ? args.page : BRANCH_CONFIG.PAGINATION.PAGE,
                limit: args.limit ? args.limit : BRANCH_CONFIG.PAGINATION.LIMIT,
                search: args.search
            })


            branchname = branchname.trim()
            branchAdress = branchAdress.trim()
            let checkk = await modelUser.getStaff({ staffId })

            if (checkk.staff_is_root) {


                if (!branchname ||
                    branchname.length > 50
                ) {
                    throw new Error("The branch name cannot be empty!")
                }

                if (!branchAdress ||
                    branchAdress.length > 50
                ) {
                    throw new Error("The branch address cannot be empty!")
                }

                if (branches.find(branch => branch.branche_name == branchname)) {
                    throw new Error("The branch name Already exists!")
                }


                let insert = await model.addBranch({
                    branchname,
                    branchAdress
                })

                return {
                    status: 200,
                    message: 'The Branch successfully added!',
                    token: null,
                    data: insert
                }
            }
            let res = await model.branchPer({
                staffId,
                branchName
            })

            if (res[0]?.branche_create) {
                if (!branchname ||
                    branchname.length > 50
                ) {
                    throw new Error("The branch name cannot be empty!")
                }

                if (!branchAdress ||
                    branchAdress.length > 50
                ) {
                    throw new Error("The branch address cannot be empty!")
                }

                if (branches.find(branch => branch.branche_name == branchname)) {
                    throw new Error("The branch name Already exists!")
                }


                let insert = await model.addBranch({
                    branchname,
                    branchAdress
                })

                return {
                    status: 200,
                    message: 'The Branch successfully added!',
                    token: null,
                    data: insert
                }

            } else {
                return {
                    status: 400,
                    message: 'You don\'t have permission!',
                    token: null,
                    data: null
                }
            }



        },

        changeBranch: async(_, args, {token}) => {
            
            const { ip, agent, staffId, branchName, isRoot } = JWT.verify(token)

            let { branchId, branchname, branchAdress } = args
            const branches = await model.getBranches({
                page: args.page ? args.page : BRANCH_CONFIG.PAGINATION.PAGE,
                limit: args.limit ? args.limit : BRANCH_CONFIG.PAGINATION.LIMIT,
                search: args.search
            })


            branchname = branchname.trim()
            branchAdress = branchAdress?.trim()
            let checkk = await modelUser.getStaff({ staffId })

            if (checkk.staff_is_root) {
                if (
                    branchname?.length > 50
                ) {
                    throw new Error("Invalid branch name!")
                }

                if (
                    branchAdress?.length > 50
                ) {
                    throw new Error("Invalid branch address!")
                }

                if (branches.find(branch => branch.branche_name == branchname)) {
                    throw new Error("The branch name Already exists!")
                }


                let insert = await model.changeBranch({
                    branchId,
                    branchname,
                    branchAdress
                })

                return {
                    status: 200,
                    message: 'The Branch successfully changed!',
                    token: null,
                    data: insert
                }
            }
            let res = await model.branchPer({
                staffId,
                branchName
            })
            if (res[0]?.branche_update && res[0]?.branche_id == branchId) {
                if (
                    branchname?.length > 50
                ) {
                    throw new Error("The branch name cannot be empty!")
                }

                if (
                    branchAdress?.length > 50
                ) {
                    throw new Error("The branch address cannot be empty!")
                }

                if (branches.find(branch => branch?.branche_name == branchname)) {
                    throw new Error("The branch name Already exists!")
                }


                let insert = await model.changeBranch({
                    branchId,
                    branchname,
                    branchAdress
                })

                return {
                    status: 200,
                    message: 'The Branch successfully changed!',
                    token: null,
                    data: insert
                }

            } else {
                return {
                    status: 400,
                    message: 'You don\'t have permission!',
                    token: null,
                    data: null
                }
            }
        },

        deleteBranch: async(_, args, {token}) => {
            
            const { ip, agent, staffId, branchName, isRoot } = JWT.verify(token)

            let { branchId } = args
            const branches = await model.getBranches({
                page: args.page ? args.page : BRANCH_CONFIG.PAGINATION.PAGE,
                limit: args.limit ? args.limit : BRANCH_CONFIG.PAGINATION.LIMIT,
                search: args.search
            })


            let checkk = await modelUser.getStaff({ staffId })

            if (checkk.staff_is_root) {
                let del = await model.deleteBranch({
                    branchId
                })

                return {
                    status: 200,
                    message: 'The Branch successfully deleted!',
                    token: null,
                    data: del
                }
            }
            let res = await model.branchPer({
                staffId,
                branchName
            })
            console.log(res);
            if (res[0]?.branche_delete && res[0]?.branche_id == branchId) {
                let del = await model.deleteBranch({
                    branchId
                })

                return {
                    status: 200,
                    message: 'The Branch successfully deleted!',
                    token: null,
                    data: del
                }

            } else {
                return {
                    status: 400,
                    message: 'You don\'t have permission!',
                    token: null,
                    data: null
                }
            }
        }
    },

    Branch: {
        branchId: global => global.branche_id,
        branchname: global => global.branche_name,
        branchAdress: global => global.branche_address,
        branchCreatedAt: global => global.branche_created_at
    }
}