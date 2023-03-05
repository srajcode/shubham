const {Router}=require('express');
const router=Router();
const {validateToken}=require('../../authenticate');
const uploadImage=require('../../controller/adminController/functions').upload;




const adminState=require('../../controller/adminController/stateController');

router.get('',validateToken, adminState.loadStatePage);

router.get('/view_all',validateToken, adminState.viewAllState);

router.post('/addNew',validateToken,uploadImage.single('imageToUpload'), adminState.addNewState);

router.post('/delete',validateToken, adminState.deleteState);

router.post('/edit',validateToken, adminState.editState);

router.post('/update',validateToken, uploadImage.single('imageToUpload') ,adminState.updateState);

router.post('/status',validateToken, adminState.changeStateStatus);



module.exports=router;