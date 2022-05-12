import host from "./helpers/getHost.js"
import queryParser from "./helpers/queryParser.js"
import JWT from "./helpers/jwt.js"
export default ({ req, res }) => {

    try {
        const { operation, fieldName, variables } = queryParser(req.body)

        const reqAgent = req.headers['user-agent']
        const TOKEN = req.headers.token

        if (fieldName == "__schema") return

        if (["login", "register"].includes(fieldName)) {
            return {
                agent: reqAgent
            }
        }

        const { staffId, agent } = JWT.verify(TOKEN)

        if (agent !== reqAgent) {
            throw new Error("Invalid Token")
        }

        return {
            host: `http://${host({ internal: false })}:${process.env.PORT}/`,
            token: req.headers.token,
            staffId
        }
    } catch (error) {
        throw error
    }
}