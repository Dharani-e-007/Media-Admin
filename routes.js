
import Express from "express"
import UserRoutes from "./user/index.js"
const Router = Express.Router()

Router.use("/admin", UserRoutes)




export default Router