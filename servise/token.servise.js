import jwt from 'jsonwebtoken'

const generateJWTtoken = userId=>{
    const accestoken= jwt.sign({userId},process.env.PRIVATE_JWT,{expiresIn:'30d'})
    return accestoken;
}

export default generateJWTtoken