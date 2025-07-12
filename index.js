    import express from 'express'
    import {create} from 'express-handlebars'
    import mongoose from 'mongoose'
    import * as dotenv from 'dotenv'
    dotenv.config()
     
    import cookieParser from 'cookie-parser'
    import flash from 'connect-flash'
    import session from 'express-session'
    import hbshelpers from './unitils/helpers.js'

    import varrr from './midleware/loguat.js'
    import adduserind from './midleware/adduserind.js'

// Router
    import authrouts from './routes/auth.js'
    import kurslarrouts from './routes/kurslar.js'

        const app=express()
        
        const hbs=create({
            defaultLayout:'main',
            extname:'hbs',
            helpers:hbshelpers

        })

        app.engine('hbs', hbs.engine);
        app.set('view engine', 'hbs');
        app.set('views', './views');

// middleware
        app.use(express.static('public'))
        app.use(express.urlencoded({extended:true}))
        app.use(express.json())

        app.use(cookieParser())

        app.use(varrr)
        app.use(adduserind)

         
               
        app.use(session({secret:'bobur',resave:false , saveUninitialized:false}))
        app.use(flash())
        
// router 
        app.use(authrouts)
        app.use(kurslarrouts)

       
// mongo db va localhost
    const startted=()=>{
        try {
    const PORT=process.env.PORT || 4100;

    mongoose.connect(process.env.MONGO_URL)

    .then(()=>console.log("connect mongo db sucsecfuly"))

     app.listen(PORT,()=>{
     console.log(`sussecFulyy get port:${PORT}`)
    })
            }
         catch (error) 
        {

         console.log(error)   
        }
    } 
    startted()