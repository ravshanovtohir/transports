import { makeExecutableSchema } from '@graphql-tools/schema'

import UserModule from './user/index.js'
import StaffModule from './staff/index.js'

export default makeExecutableSchema({
    typeDefs: [
        UserModule.typeDefs,
        StaffModule.typeDefs,
    ],
    resolvers: [
        UserModule.resolvers,
        StaffModule.resolvers,
    ],
})