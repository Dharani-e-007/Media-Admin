import Express from "express"
import { login, register, deleteAccount, isAuthenticated , allUsers , addNews, newsList , deleteNews , editNews} from "./user.controller.js"

const Router = Express.Router()


Router.post("/register", register)
Router.post("/login", login )
Router.delete("/deleteaccount",isAuthenticated,  deleteAccount)
Router.get("/all", allUsers)

Router.post("/addNews" , isAuthenticated , addNews )
Router.get("/newsList"  , newsList )
Router.get("/deleteNews/:id"  , deleteNews )
Router.get("/editNews/:id"  , editNews )

export default Router


// middleware vs endpoint function

// midlleware has req,res,next where as end point has req,res only
