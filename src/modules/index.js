import { makeExecutableSchema } from '@graphql-tools/schema'

import UserModule from './user/index.js'
import StaffModule from './staff/index.js'
import TypesModule from './types/index.js'
// import BrancheModule from 

export default makeExecutableSchema({
    typeDefs: [
        UserModule.typeDefs,
        StaffModule.typeDefs,
        TypesModule.typeDefs,
    ],
    resolvers: [
        UserModule.resolvers,
        StaffModule.resolvers,
        TypesModule.resolvers,
    ],
})