const {Router}=require('express');
const router=Router();
const {validateToken}=require('../../authenticate');



const adminSubCategory=require('../../controller/adminController/subcategoryController');

router.get('',validateToken, adminSubCategory.loadSubCategoryPage);

router.get('/view_all',validateToken, adminSubCategory.viewAllSubCategory);

router.post('/addNew',validateToken, adminSubCategory.addNewSubCategory);

router.post('/delete',validateToken, adminSubCategory.deleteSubCategory);

router.post('/update',validateToken, adminSubCategory.updateSubCategory);

router.post('/edit',validateToken, adminSubCategory.editSubCategory);

router.post('/status',validateToken, adminSubCategory.changeSubCategoryStatus);


module.exports=router;