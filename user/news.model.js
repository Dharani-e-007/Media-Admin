import Mongoose from "mongoose"

let NewsSchema = new Mongoose.Schema({
	title:{type:String,required:true},
    description:{type:String,required:true},
    url:{type:String,required:true}, 
	urlToImage:{type:String,required:true},
    publishedAt:{type:String,required:true}
})

let Newsmodel = Mongoose.model("news",NewsSchema)

export default Newsmodel