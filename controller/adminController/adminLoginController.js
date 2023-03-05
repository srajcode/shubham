const bcrypt = require('bcryptjs');
const conn=require('../../config/dbconfig').connection;
const {createTokens}=require('../../authenticate');
// const {createTokens}=require('../../authenticate');


//admin login
exports.adminLogin=(req,res)=>{
    if (req.isAuthenticated){
        res.redirect('dashboard');
    }else{
        res.render('login');
    }
};


exports.adminLogout= (req,res)=>{
    res.clearCookie('access-token');
    res.redirect('login')
};


exports.adminDashboard=(req,res)=>{
    if(req.isAuthenticated){        
        menuOpt={menu:'dashboard',subMenu:"overall"};
        res.render('dashboard',{menuOpt});
    }else{
        res.redirect('login');
    }
};


exports.adminLoginVerify=(req,res)=>{
    var username=req.body.username;var password=req.body.password;

    conn.query('SELECT * FROM users WHERE username=?',[username], (err,results)=>{
        // console.log(results);
        if(results.length==0){res.json({data:"userNotFound"});return}
        
        if(results.length>0){
            var isAuth=false;
            const dbPassword=results[0].hashpassword
            bcrypt.compare(password,dbPassword).then((match)=>{
                if(!match){
                    res.json({data:"password_fail"})
                }else{

                    const accessToken=createTokens(results);
                    res.cookie("access-token",accessToken,{
                        maxAge:60*60*24*30*1000,
                        httpOnly:true
                    })
                    res.json({data:"success"})
                };
            })

        }
    }); 

}