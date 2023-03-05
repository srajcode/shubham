// const {createTokens,validateToken}=require('../../authenticate');
const conn=require('../../config/dbconfig').connection;
const { v4: uuidv4 } = require('uuid');
// const uploadImage=require('../adminController/functions').upload;


exports.loadItemsPage=(req,res)=>{
    if(req.isAuthenticated){
        menuOpt={menu:'product',subMenu:"items"};
        res.render('items',{menuOpt});
    }else{
        res.redirect('/admin/login');
    }

};


exports.viewAllItems= (req,res)=>{
    if(req.isAuthenticated){
        conn.query('SELECT * FROM category', (err,results)=>{
            if(!err){res.json({data:results})};
            if(err){res.json({data:'failed'})};
        });
    }else{
        res.json({data:"unauthorized user"});
    }

};




exports.addNewItems=(req,res)=>{
    if(req.isAuthenticated){
        // console.log(req.file.path);
        // return;
        const categoryValue=req.body.categoryValue;
        const imgPath=req.file.path;
        const uid=uuidv4();
        conn.query('INSERT INTO category SET category=?,uid=?,img=?', [categoryValue,uid,imgPath],(err,rows)=>{
            if(err){res.json({data:"failed"})};
            if(rows){res.json({data:"success"})};
        }); 
    }else{
        res.json({data:"unauthorized user"});
    };

};


exports.updateItems= (req,res)=>{
    if(req.isAuthenticated){
        const id=req.body.id;
        const textValue=req.body.textValue;
        const imgPath=req.file.path;

        conn.query('UPDATE category SET category=?,img=? WHERE id=?',[textValue,imgPath,id], (err,results)=>{
            
            if(!err){res.json({data:"success"})};
            if(err){res.json({data:"failed"})};
        });
    }else{
        res.json({data:"unauthorized user"});
    };
};




exports.deleteItems= (req,res)=>{
    if(req.isAuthenticated){
        const uid=req.body.uid;
        conn.query('DELETE FROM category WHERE uid=?',[uid], (err,results)=>{
            if(!err){res.json({data:"success"})}
            if(err){res.json({data:"failed"})};
        }); 
    }else{
        res.json({data:"unauthorized user"});
    };
};




exports.editItems= (req,res)=>{
    if(req.isAuthenticated){
        const btn_id=req.body.editBtnId;
        conn.query('SELECT * FROM category WHERE uid=?',[btn_id], (err,results)=>{
            if(!err){res.json({data:results})};
            if(err){res.json({data:"failed"})};
        });
    }else{
        res.json({data:"unauthorized user"});
    };
};



exports.changeItemsStatus= (req,res)=>{
    if(req.isAuthenticated){
        const uid=req.body.uid;
        const status=req.body.status==0?1:0;
        conn.query('UPDATE category SET status=? WHERE uid=?',[status,uid], (err,results)=>{
            if(!err){res.json({data:"success"})};
            if(err){res.json({data:"failed"})}
        });
    }else{
        res.json({data:"unauthorized user"});
    }
};