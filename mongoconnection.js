
import Mongoose from "mongoose"

var url  = "mongodb+srv://tcsnovuser:test12345@cluster0.w5ixg.mongodb.net/tcsnov"


Mongoose.connect(url).then(function(){
    console.log("Connected to Mongodb")
},function(error){
    console.log("Error in connecting to database", error)
})