const {Router}=require('express');
const router=Router();
const {validateToken}=require('../../authenticate');
const uploadImage=require('../../controller/adminController/functions').upload;




const adminItems=require('../../controller/adminController/itemsController');

router.get('',validateToken, adminItems.loadItemsPage);

router.get('/view_all',validateToken, adminItems.viewAllItems);

router.post('/addNew',validateToken,uploadImage.single('imageToUpload'), adminItems.addNewItems);

router.post('/delete',validateToken, adminItems.deleteItems);

router.post('/edit',validateToken, adminItems.editItems);

router.post('/update',validateToken, uploadImage.single('imageToUpload') ,adminItems.updateItems);

router.post('/status',validateToken, adminItems.changeItemsStatus);



module.exports=router;