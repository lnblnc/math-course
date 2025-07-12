export default function (req,res,next){
    const asstoken=req.cookies.token ? true : false
    res.locals.token=asstoken
    next()
}