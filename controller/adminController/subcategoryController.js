// const {createTokens,validateToken}=require('../../authenticate');
const conn=require('../../config/dbconfig').connection;
const { v4: uuidv4 } = require('uuid');



exports.loadSubCategoryPage=(req,res)=>{
    if(req.isAuthenticated){
        menuOpt={menu:'product',subMenu:"sub_category"};
        res.render('sub_category',{menuOpt});
    }else{
        res.redirect('/admin/login');
    }

};     


exports.viewAllSubCategory= (req,res)=>{
    if(req.isAuthenticated){
        conn.query('SELECT subcategory.*,category.category as categoryName FROM subcategory INNER JOIN category ON subcategory.categoryId=category.id', (err,results)=>{
            if(!err){res.json({data:results})};
            if(err){res.json({data:'failed'})};
        });
    }else{
        res.json({data:"unauthorized user"});
    }

};      


exports.addNewSubCategory=(req,res)=>{
    if(req.isAuthenticated){
        const categoryValue=req.body.categoryValue;
        const subcategoryValue=req.body.subcategoryValue;
        const uid=uuidv4();

        conn.query('INSERT INTO subcategory SET subcategory=?,categoryId=?,uid=?', [subcategoryValue,categoryValue,uid],(err,rows)=>{

            if(err){res.json({data:"failed"})};
            if(rows){res.json({data:"success"})};

        }); 
    }else{
        res.json({data:"unauthorized user"});
    };

};      

exports.deleteSubCategory= (req,res)=>{
    if(req.isAuthenticated){
        const uid=req.body.uid;
        conn.query('DELETE FROM subcategory WHERE uid=?',[uid], (err,results)=>{
            if(!err){res.json({data:"success"})}
            if(err){res.json({data:"failed"})};
        }); 
    }else{
        res.json({data:"unauthorized user"});
    };
};      


exports.editSubCategory= (req,res)=>{
    if(req.isAuthenticated){
        const btn_id=req.body.editBtnId;
        conn.query('SELECT * FROM subcategory WHERE uid=?',[btn_id], (err,results)=>{
            if(!err){res.json({data:results})};
            if(err){res.json({data:"failed"})};
        });
    }else{
        res.json({data:"unauthorized user"});
    };
};


exports.updateSubCategory= (req,res)=>{
    if(req.isAuthenticated){
        const id=req.body.id;
        const subCategorytextValue=req.body.subCategorytextValue;
        const categoryValue=req.body.categoryValue;
        conn.query('UPDATE subcategory SET categoryId=?, subcategory=? WHERE id=?',[categoryValue,subCategorytextValue,id], (err,results)=>{
            if(!err){res.json({data:"success"})};
            if(err){res.json({data:"failed"})};
        });
    }else{
        res.json({data:"unauthorized user"});
    };
};


exports.changeSubCategoryStatus= (req,res)=>{
    if(req.isAuthenticated){
        const uid=req.body.uid;
        const status=req.body.status==0?1:0;
        conn.query('UPDATE subcategory SET status=? WHERE uid=?',[status,uid], (err,results)=>{
            if(!err){res.json({data:"success"})};
            if(err){res.json({data:"failed"})}
        });
    }else{
        res.json({data:"unauthorized user"});
    }
};      