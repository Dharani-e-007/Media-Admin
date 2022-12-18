import { createToken, verifyToken } from "../../auth.js";
import { createUser, findUser, removeUser , listAll , createNews , listAllNews , removeNews} from "./user.service.js";
import Express from "express"
import path  from 'path';
let  app = Express()
const __dirname = path.resolve()
let token = ''
let  allNewsList = {}
export const register = (req,res)=>{
   createUser(req.body).then((result)=>{
        res.status(200).send({
            message:"User Registered"
        })
   }).catch(()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
   })
}

export let isAuthenticated =  (req, res, next)=> {
	req.headers.authorization = token;
     token = req.get("Authorization")
    if (token) {
        let result = verifyToken(token)
        if (result) {
            next() // moving request to next function which is deletAccount
        }
        else {
            res.status(401).send({error:"Unauthorized"})
        }
    }
    else {
        res.status(401).send({error:"Unauthorized"})
    }

}
    
export const login = (req,res)=>{
	
    findUser(req.body).then((result)=>{
         token = createToken({email:req.body.email})
        res.set("Auhtorization", token)
		res.redirect("/admin/newsForm")
		  // res.status(200).send({
		  // message:"Login Success"
		  // })
    }).catch((err)=>{
        res.status(500).send({error:"INVALID LOGIN"})
    })
}

export const deleteAccount  = (req,res) =>{
    removeUser(req.body).then(()=>{
        res.status(200).send({
            message:"Account Deleted"
        })
    },()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
    })  
}


export const allUsers  = (req,res) =>{
    listAll(req.body).then((result)=>{
        res.status(200).send({
           users:result
        })
    },()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
    })  
}

export const addNews = (req,res)=>{
   createNews(req.body).then((result)=>{
        res.status(200).send({
            message:"news added successfully"
        })
   }).catch(()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
   })
}
export const newsList  = (req,res) =>{
    listAllNews(req.body).then((result)=>{
		allNewsList = result;
		res.render("allnews",{
		news:result
    })
        // res.status(200).send({
        //    news:result
        // })
    },()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
    })  
}

export const deleteNews  = (req,res) =>{

    removeNews(req.params).then(()=>{
        res.status(200).send({
            message:"News Deleted"
        })
    },()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
    })  
}

export const editNews  = (req,res) =>{
	let selectedNews = allNewsList.find(news => news._id == req.params.id);
	console.log(selectedNews);
     res.render("editnews" , {selectedNews:selectedNews})
}