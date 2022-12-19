import Mongoose from "mongoose"

let UserSchema = new Mongoose.Schema({
	name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isVerified:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false},
    date:{type:Date,default : new Date()}
})

let Usermodel = Mongoose.model("dharani-media-admin",UserSchema)

export default Usermodel