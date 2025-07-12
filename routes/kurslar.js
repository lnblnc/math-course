import {Router} from 'express'
import usermiddlewar from '../midleware/user.js'
import adduserind from '../midleware/adduserind.js'
import product from '../model/product.js'
const router= Router()

router.get('/',async (req,res)=>{
    const products= await product.find().limit(3).lean()
    
    res.render('about' ,{
        title:"Baxtiyar Jaksilikov",
        products:products,
    })
})

// router.get('/kurslar',(req,res)=>{
//     res.render('kurslar',{
//         title:"BJ | Kurslar",
//         iskurslar:true,
//     })
// })
router.get("/applic",(req,res)=>{
    res.render("applic",{
        iscontact:true,
        title:"BJ | baylaniv"
    })
})

router.get('/add',usermiddlewar, async(req,res)=>{

       const userCourses = await product.find().lean()
        const isAdmin = req.userId.toString() === process.env.ID_ADMIN
    res.render('add', {
        title:"BJ | Natiyjeler",
        isadd:true,
        natiyjelerError:req.flash('natiyjelerError'),
        isAdmin:isAdmin,
        userCourses:userCourses.reverse(),
        userId:req.userId ? req.userId.toString() : null
    })
})

router.get("/products/:id",async(req,res)=>{
    const id = req.params.id
    const producs = await product.findById(id).lean()
    res.render('detiel',{
        products:producs,
    })
})



router.post('/add',adduserind, async(req,res)=>{
   
   const {titlel,malumotlar_add,imag,natija}=req.body
     if(!titlel || !malumotlar_add || !imag || !natija){
        req.flash('natiyjelerError',"bo'sh joylarni to'ldiring")
        res.redirect("/add")
        return
    }

      const userdate={
       titlel:titlel,
       malumotlar_add:malumotlar_add,
       imag:imag,
       natija:natija,
    }
   const Product= await product.create({...userdate ,user:req.userId})
   res.redirect('/')
})
router.post("/delete/:id",async(req,res)=>{
   const id=req.params.id
   await product.findByIdAndDelete(id)
   res.redirect("/")
   
})

export default router;