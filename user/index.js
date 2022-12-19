import Express from "express"
import { login, register, deleteAccount, isAuthenticated , allUsers , addNews, newsList 
		, deleteNews , editNewsPage , signOut , updateNews} from "./user.controller.js"

const Router = Express.Router()


Router.post("/register", register)
Router.post("/login", login )
Router.get("/signOut" , isAuthenticated  , signOut )
Router.delete("/deleteaccount",isAuthenticated,  deleteAccount)
Router.get("/all", isAuthenticated ,  allUsers)

Router.post("/addNews" , isAuthenticated , addNews )
Router.get("/newsList" , isAuthenticated , newsList )
Router.get("/deleteNews/:id" , isAuthenticated , deleteNews )
Router.get("/editNewsPage/:id" , isAuthenticated  , editNewsPage )
Router.post("/updateNews" , isAuthenticated , updateNews )

export default Router

