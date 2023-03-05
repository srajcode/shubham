// const {createTokens,validateToken}=require('../../authenticate');
const conn=require('../../config/dbconfig').connection;
const { v4: uuidv4 } = require('uuid');
// const uploadImage=require('../adminController/functions').upload;


exports.loadStatePage=(req,res)=>{
    if(req.isAuthenticated){
        menuOpt={menu:'location',subMenu:"loc_state"};
        res.render('loc_state.ejs',{menuOpt});
    }else{
        res.redirect('/admin/login');
    }

};


exports.viewAllState= (req,res)=>{
    if(req.isAuthenticated){
        conn.query('SELECT loc_state.*,loc_country.country as countryName FROM loc_state INNER JOIN loc_country ON loc_state.countryid=loc_country.id', (err,results)=>{
            if(!err){res.json({data:results})};
            if(err){res.json({data:'failed'})};
        });
    }else{
        res.json({data:"unauthorized user"});
    }

};  



exports.addNewState=(req,res)=>{
    if(req.isAuthenticated){
        // console.log(req.file.path);
        // return;
        const stateValue=req.body.stateValue;
        const countryValue=req.body.countryValue;
        const uid=uuidv4();

        conn.query('INSERT INTO loc_state SET state=?,countryid=?,uid=?', [stateValue,countryValue,uid],(err,rows)=>{
            if(err){res.json({data:"failed"})};
            if(rows){res.json({data:"success"})};
        }); 
    }else{
        res.json({data:"unauthorized user"});
    };

};


exports.updateState= (req,res)=>{
    if(req.isAuthenticated){
        const id=req.body.id;
        const countryValue=req.body.countryValue;
        const statetextValue=req.body.statetextValue;

        conn.query('UPDATE loc_state SET countryid=?, state=? WHERE id=?',[countryValue,statetextValue,id], (err,results)=>{    
            if(!err){res.json({data:"success"})};
            if(err){res.json({data:"failed"})};
        });
    }else{
        res.json({data:"unauthorized user"});
    };
};



exports.deleteState= (req,res)=>{
    if(req.isAuthenticated){
        const uid=req.body.uid;
        conn.query('DELETE FROM loc_state WHERE uid=?',[uid], (err,results)=>{
            if(!err){res.json({data:"success"})}
            if(err){res.json({data:"failed"})};
        }); 
    }else{
        res.json({data:"unauthorized user"});
    };
};



exports.editState= (req,res)=>{
    if(req.isAuthenticated){
        const btn_id=req.body.editBtnId;
        conn.query('SELECT * FROM loc_state WHERE uid=?',[btn_id], (err,results)=>{
            if(!err){res.json({data:results})};
            if(err){res.json({data:"failed"})};
        });
    }else{
        res.json({data:"unauthorized user"});
    };
};



exports.changeStateStatus= (req,res)=>{
    if(req.isAuthenticated){
        const uid=req.body.uid;
        const status=req.body.status==0?1:0;
        conn.query('UPDATE loc_state SET status=? WHERE uid=?',[status,uid], (err,results)=>{
            if(!err){res.json({data:"success"})};
            if(err){res.json({data:"failed"})}
        });
    }else{
        res.json({data:"unauthorized user"});
    }
};