const {Router}=require('express');
const router=Router();
const {validateToken}=require('../../authenticate');
const uploadImage=require('../../controller/adminController/functions').upload;




const adminCategory=require('../../controller/adminController/categoryController');

router.get('',validateToken, adminCategory.loadCategoryPage);

router.get('/view_all',validateToken, adminCategory.viewAllCategory);
// router.get('/view_all', adminCategory.viewAllCategory);

router.post('/addNew',validateToken,uploadImage.single('imageToUpload'), adminCategory.addNewCategory);
// router.post('/addNew',validateToken,uploadImage.single('imageToUpload'), adminCategory.addNewCategory);

router.post('/delete',validateToken, adminCategory.deleteCategory);

router.post('/edit',validateToken, adminCategory.editCategory);

router.post('/update',validateToken, uploadImage.single('imageToUpload') ,adminCategory.updateCategory);

router.post('/status',validateToken, adminCategory.changeCategoryStatus);



module.exports=router;