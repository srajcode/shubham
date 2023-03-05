const {sign,verify}= require('jsonwebtoken');
const cookieParser=require('cookie-parser')
const bcrypt=require('bcryptjs');
const { append } = require('express/lib/response');
secretKey=process.env.SECRETKEY;




const createTokens=(user)=>{
    const accessToken=sign(
        {username:user.username,id:user.id},
        secretKey
    );
    return accessToken;
};



const validateToken=(req,res,next)=>{
   // const accessToken = req.headers?.cookie;
    const accessToken=req.cookies["access-token"];
    
    if(!accessToken){
    //    res.render('login');
       req.isAuthenticated=false;
       return next();
    //    return // return res.status(400).json({error:"user not authenticated"});
    }

    try{
        const validToken=verify(accessToken,secretKey);
        if (validToken){
            req.isAuthenticated=true;
            return next();
        }
    }catch(err){
        return res.status(400).json({error:err});
    }

};




const securePassword= async(password)=>{
    const hashPassword=await bcrypt.hash(password,10);
    console.log(hashPassword)
    return(hashPassword);
}

const verifyPassword= async (password,dbPassword)=>{
    var match=false;
     sr=await bcrypt.compare(password,dbPassword).then((match)=>{
        console.log("match " + match);
        match=true;
        return match;
    });
    return sr;

}







module.exports={createTokens,validateToken,securePassword,verifyPassword};