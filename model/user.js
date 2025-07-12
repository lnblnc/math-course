import {Schema , model} from 'mongoose'

const userschema= new Schema({
    firstName:{type:String , required:true},
    lastName:{type:String , required:true},
    email:{type:String , required:true, enique:true },
    password:{type:String ,required:true }
},{timestamps:true})


const User = model('User', userschema)
export default User;

