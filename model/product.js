import {Schema , model} from 'mongoose'


const productschema= new Schema({
    titlel:{type:String, required:true},
    malumotlar_add:{type:String , required:true},
    imag:{type:String , required:true},
    natija:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})


const product = model('product', productschema)
export default product;
