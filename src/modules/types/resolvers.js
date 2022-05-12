export default {

    GlobalType: {
        __resolveType: object => {
            if (object.staff_name) return 'Staff'
            return null
        }
    }
}