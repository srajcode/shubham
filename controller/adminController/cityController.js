// const {createTokens,validateToken}=require('../../authenticate');
const conn=require('../../config/dbconfig').connection;
const { v4: uuidv4 } = require('uuid');
// const uploadImage=require('../adminController/functions').upload;


exports.loadCityPage=(req,res)=>{
    if(req.isAuthenticated){
        menuOpt={menu:'location',subMenu:"loc_city"};
        res.render('loc_city.ejs',{menuOpt});
    }else{
        res.redirect('/admin/login');
    }

};


exports.viewAllCity= (req,res)=>{
    if(req.isAuthenticated){
        conn.query('SELECT loc_city.*, loc_country.country as countryName, loc_state.state as stateName FROM loc_city INNER JOIN loc_country ON loc_country.id = loc_city.countryid INNER JOIN loc_state ON loc_state.id = loc_city.stateid;', (err,results)=>{
            if(!err){res.json({data:results})};
            if(err){res.json({data:'failed'})};
        });
    }else{
        res.json({data:"unauthorized user"});
    }

};  



exports.addNewCity=(req,res)=>{
    if(req.isAuthenticated){
        const countryValue=req.body.countryValue;
        const stateValue=req.body.stateValue;
        const cityTextValue=req.body.cityTextValue;
        const pincodeValue=req.body.pincodeValue;
        const uid=uuidv4();

        // console.log(req.body);
        conn.query('INSERT INTO loc_city SET countryid=?,stateid=?,city=?,pincode=?,uid=?', [countryValue,stateValue,cityTextValue,pincodeValue,uid],(err,rows)=>{
            console.log(err);
            if(err){res.json({data:"failed"})};
            if(rows){res.json({data:"success"})};
        }); 
    }else{
        res.json({data:"unauthorized user"});
    };

};


exports.editCity= (req,res)=>{
    if(req.isAuthenticated){
        const btn_id=req.body.editBtnId;
        console.log(req.body);
        conn.query('SELECT * FROM loc_city WHERE uid=?',[btn_id], (err,results)=>{
            if(!err){res.json({data:results})};
            if(err){res.json({data:"failed"})};
        });
    }else{
        res.json({data:"unauthorized user"});
    };
};


exports.updateCity= (req,res)=>{
    if(req.isAuthenticated){
        const id=req.body.id;
        const countryValue=req.body.countryValue;
        const stateValue=req.body.stateValue;
        const citytextValue=req.body.citytextValue;
        const pincodetextValue=req.body.pincodetextValue;
        conn.query('UPDATE loc_city SET countryid=?, stateid=?,city=?,pincode=? WHERE id=?',[countryValue,stateValue,citytextValue,pincodetextValue,id], (err,results)=>{    
            if(!err){res.json({data:"success"})};
            if(err){res.json({data:"failed"})};
        });
    }else{
        res.json({data:"unauthorized user"});
    };
};


exports.deleteCity= (req,res)=>{
    if(req.isAuthenticated){
        const uid=req.body.uid;
        conn.query('DELETE FROM loc_city WHERE uid=?',[uid], (err,results)=>{
            if(!err){res.json({data:"success"})}
            if(err){res.json({data:"failed"})};
        }); 
    }else{
        res.json({data:"unauthorized user"});
    };
};







exports.changeCityStatus= (req,res)=>{
    if(req.isAuthenticated){
        const uid=req.body.uid;
        const status=req.body.status==0?1:0;
        conn.query('UPDATE loc_city SET status=? WHERE uid=?',[status,uid], (err,results)=>{
            if(!err){res.json({data:"success"})};
            if(err){res.json({data:"failed"})}
        });
    }else{
        res.json({data:"unauthorized user"});
    }
};