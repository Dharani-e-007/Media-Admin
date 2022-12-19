import { createToken, verifyToken } from "../auth.js";
import { createUser, findUser, removeUser , listAll , createNews , listAllNews , removeNews , newsUpdate} from "./user.service.js";
import Express from "express"
import path  from 'path';
let  app = Express()
const __dirname = path.resolve()
let token = ''
let  allNewsList = {}
let currentUser = {}
let selectedNews = {}

export const register = (req,res)=>{  // register 
   createUser(req.body).then((result)=>{
        res.status(200).send({
            message:"User Registered successfully- Please go back and Login"
        })
   }).catch(()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
   })
}

export let isAuthenticated =  (req, res, next)=> { // isAuthenticated check 
	req.headers.authorization = token;
     token = req.get("Authorization")
    if (token) {
        let result = verifyToken(token)
        if (result) {
            next() // moving request to next function
        }
        else {
            res.status(401).send({error:"Unauthorized"})
        }
    }
    else {
        res.status(401).send({error:"Unauthorized"})
    }

}
    
export const login = (req,res)=>{   // login
	
    findUser(req.body).then((result)=>{
         token = createToken({email:req.body.email})
	    currentUser = result
        res.set("Auhtorization", token)
		res.redirect("/admin/newsForm")
    }).catch((err)=>{
        res.status(500).send({error:"INVALID LOGIN"})
    })
}

export const deleteAccount  = (req,res) =>{  // Delete admin account
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


export const allUsers  = (req,res) =>{   // get all admins list
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

export const addNews = (req,res)=>{  // add new news
   createNews(req.body).then((result)=>{
        res.redirect("/admin/newsList")
   }).catch(()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
   })
}
export const newsList  = (req,res) =>{  // get all news
    listAllNews(req.body).then((result)=>{
		allNewsList = result;
		res.render("allnews",{
		news:result ,
		user: currentUser
    })
    },()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
    })  
}

export const deleteNews  = (req,res) =>{ // delete a news

    removeNews(req.params).then(()=>{
        res.redirect("/admin/newsList")
    },()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
    })  
}

export const editNewsPage  = (req,res) =>{   // redirect to news edit page and prefill the editable news
	 selectedNews = allNewsList.find(news => news._id == req.params.id);
	res.render("editnews" , {
		selectedNews:selectedNews ,
		user: currentUser })
}

export const updateNews  = (req,res) =>{ // update news

    newsUpdate(req.body , selectedNews._id).then(()=>{
        res.redirect("/admin/newsList")
    },()=>{
        res.status(500).send({
            error:"Internal Server Error"
        })
    })  
}

export const signOut  = (req,res) =>{  // sign out
	  token = ''
     currentUser = {}
	res.redirect("/")
}