// const { path } = require('express/lib/application');
const multer = require('multer');
const path=require('path');




const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        // cb(null,'views/admin/img')
        cb(null,'public/images/icons/category')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"--"+ path.extname(file.originalname))
    }
});

const upload= multer({
    storage:storage,
    limits:{fileSize:'1000000'},
    fileFilter:(req,file,cb)=>{
                const fileTypes=/jpeg|jpg|png|gif6/
                const mimeType= fileTypes.test(file.mimetype);
                const extname=fileTypes.test(path.extname(file.originalname))

                if(mimeType && extname){
                    return cb(null,true)
                }
                cb('Kindly select image file type')
    }
});

module.exports={upload};