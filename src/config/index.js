import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(process.cwd(), ".env") })

// export const USER_CONFIG = {
//     PAGINATION: {
//         LIMIT: 10,
//         PAGE: 1
//     }
// }
// export const FOOD_CONFIG = {
//     PAGINATION: {
//         LIMIT: 10,
//         PAGE: 1
//     }
// }
// export const ORDER_CONFIG = {
//     PAGINATION: {
//         LIMIT: 10,
//         PAGE: 1
//     }
// }