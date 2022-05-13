import { makeExecutableSchema } from '@graphql-tools/schema'

import UserModule from './user/index.js'
import StaffModule from './staff/index.js'
import TypesModule from './types/index.js'
import BrancheModule from './branch/index.js'

export default makeExecutableSchema({
    typeDefs: [
        UserModule.typeDefs,
        StaffModule.typeDefs,
        TypesModule.typeDefs,
        BrancheModule.typeDefs,
    ],
    resolvers: [
        UserModule.resolvers,
        StaffModule.resolvers,
        TypesModule.resolvers,
        BrancheModule.resolvers,
    ],
})