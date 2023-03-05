// const {createTokens,validateToken}=require('../../authenticate');
const conn=require('../../config/dbconfig').connection;
const { v4: uuidv4 } = require('uuid');
// const uploadImage=require('../adminController/functions').upload;


exports.loadCountryPage=(req,res)=>{
    if(req.isAuthenticated){
        menuOpt={menu:'location',subMenu:"loc_country"};
        res.render('loc_country.ejs',{menuOpt});
    }else{
        res.redirect('/admin/login');
    }

};


exports.viewAllCountry= (req,res)=>{
    if(req.isAuthenticated){
        conn.query('SELECT * FROM loc_Country', (err,results)=>{
            if(!err){res.json({data:results})};
            if(err){res.json({data:'failed'})};
        });
    }else{
        res.json({data:"unauthorized user"});
    }
};




exports.addNewCountry=(req,res)=>{
    if(req.isAuthenticated){
        const countryValue=req.body.countryValue;
        const uid=uuidv4();
        conn.query('INSERT INTO loc_Country SET country=?,uid=?', [countryValue,uid],(err,rows)=>{
            if(err){res.json({data:"failed"})};
            if(rows){res.json({data:"success"})};
        }); 
    }else{
        res.json({data:"unauthorized user"});
    };

};


exports.updateCountry= (req,res)=>{
    if(req.isAuthenticated){
        const id=req.body.id;
        const textValue=req.body.textValue;
        conn.query('UPDATE loc_country SET country=? WHERE id=?',[textValue,id], (err,results)=>{
            if(!err){res.json({data:"success"})};
            if(err){res.json({data:"failed"})};
        });
    }else{
        res.json({data:"unauthorized user"});
    };
};



exports.editCountry= (req,res)=>{
    if(req.isAuthenticated){
        const btn_id=req.body.editBtnId;
        conn.query('SELECT * FROM loc_country WHERE uid=?',[btn_id], (err,results)=>{
            if(!err){res.json({data:results})};
            if(err){res.json({data:"failed"})};
        });
    }else{
        res.json({data:"unauthorized user"});
    };
};


exports.deleteCountry= (req,res)=>{
    if(req.isAuthenticated){
        const uid=req.body.uid;
        conn.query('DELETE FROM loc_country WHERE uid=?',[uid], (err,results)=>{
            if(!err){res.json({data:"success"})}
            if(err){res.json({data:"failed"})};
        }); 
    }else{
        res.json({data:"unauthorized user"});
    };
};




exports.changeCountryStatus= (req,res)=>{
    if(req.isAuthenticated){
        const uid=req.body.uid;
        const status=req.body.status==0?1:0;
        conn.query('UPDATE loc_country SET status=? WHERE uid=?',[status,uid], (err,results)=>{
            if(!err){res.json({data:"success"})};
            if(err){res.json({data:"failed"})}
        });
    }else{
        res.json({data:"unauthorized user"});
    }
};