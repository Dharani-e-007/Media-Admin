import  BodyParser from "body-parser"
import  multer from "multer"
import Express from "express"
import "./mongoconnection.js"
import Router from "./routes.js"
import path  from 'path';


const  Port = process.env.PORT || 5000
let  app = Express()
let upload = multer()
app.set("view engine","ejs")
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(Express.static('public'))

app.use(Router)

// const __dirname = dirname(fileURLToPath(import.meta.url))
const __dirname = path.resolve();

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
})
app.get("/admin/newsForm", (req, res) => {
 res.sendFile(__dirname + "/newsForm.html");
})
app.listen(Port,function(){
    console.log("Server is listenig on" , Port)
})

export const deleteNews = () =>{
	  console.log("deleteNews Button Working!");
}





 // <% for(var i=0; i < news.length; i++) { %> <tr> <td><%= news[i].title %></td> <td><%= news[i].description %></td> </tr> <% } %>