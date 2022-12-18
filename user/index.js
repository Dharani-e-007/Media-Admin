import Express from "express"
import { login, register, deleteAccount, isAuthenticated , allUsers , addNews, newsList 
		, deleteNews , editNews , signOut} from "./user.controller.js"

const Router = Express.Router()


Router.post("/register", register)
Router.post("/login", login )
Router.get("/signOut" , isAuthenticated  , signOut )
Router.delete("/deleteaccount",isAuthenticated,  deleteAccount)
Router.get("/all", isAuthenticated ,  allUsers)

Router.post("/addNews" , isAuthenticated , addNews )
Router.get("/newsList" , isAuthenticated , newsList )
Router.get("/deleteNews/:id" , isAuthenticated , deleteNews )
Router.get("/editNews/:id" , isAuthenticated  , editNews )


export default Router


// middleware vs endpoint function

// midlleware has req,res,next where as end point has req,res only
