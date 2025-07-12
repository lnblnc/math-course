import { Router } from "express";
import bcrypt from 'bcrypt'
import User from '../model/user.js'
import generateJWTtoken from "../servise/token.servise.js";
import authmiddleware from "../midleware/authlogin.js";
import authregister from "../midleware/authregister.js";
const router =Router()
router.get("/login",authmiddleware,(req,res)=>{
    res.render('login',{
        title:'Login',
        loginError:req.flash('loginError')
    })
})
router.get("/register",authregister,(req,res)=>{
    res.render('register',{
        title:"Register",
        registerError:req.flash("registerError"),
    })
})

router.get('/chiqish',(req,res)=>{
   res.clearCookie('token')
   res.redirect("/")
})

router.post('/login', async (req,res)=>{

    
    const {email,password} = req.body;

    if(!email || !password){
        req.flash('loginError','maydon bosh qoldi')
        res.redirect("/login")
        return
    }
    const isUser= await User.findOne({email})
    if(!isUser){
        req.flash('loginError',"bunday email bilan ro'yxatdan o'tmagan iltimos ro'yxatdan o'ting")
        res.redirect("/login")
        return
    }

    const ispass= await bcrypt.compare(password , isUser.password)
    if(!ispass){
       req.flash('loginError',"parol xato!")
        res.redirect("/login")
        return
    }

  const tokenacses=generateJWTtoken(isUser._id)
   res.cookie('token',tokenacses,{httpOnly:true,secure:true})
    res.redirect('/')
 })

 router.post('/register',async (req,res)=>{

 const {email,password,Lastname,Firstname}=req.body
    if(!email || !password || !Lastname || !Firstname){
        req.flash('registerError',"bo'sh joylarni to'ldiring")
        res.redirect("/register")
        return
    }
     const  email_1= await User.findOne({email})
    if(email_1){
        req.flash('registerError',"bu email bilan ala qoshon ro'yhatdan o'tgan")
        res.redirect("/register")
        return
    }

    const hashedpassword= await bcrypt.hash(password ,10)

    const userdate={
       lastName: Lastname,
        firstName: Firstname,
        email: email,
        password: hashedpassword
    }
    console.log(userdate)
   const user=await User.create(userdate)
   const tokenacses=generateJWTtoken(user.id)
   res.cookie('token',tokenacses,{httpOnly:true,secure:true})
    res.redirect('/')
 })
export default router