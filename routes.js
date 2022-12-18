
import Express from "express"
import UserRoutes from "./admin/user/index.js"
const Router = Express.Router()

Router.use("/admin", UserRoutes)




export default Router