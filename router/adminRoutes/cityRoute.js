const {Router}=require('express');
const router=Router();
const {validateToken}=require('../../authenticate');
const uploadImage=require('../../controller/adminController/functions').upload;




const adminCity=require('../../controller/adminController/cityController');

router.get('',validateToken, adminCity.loadCityPage);

router.get('/view_all',validateToken, adminCity.viewAllCity);

router.post('/addNew',validateToken,uploadImage.single('imageToUpload'), adminCity.addNewCity);

router.post('/delete',validateToken, adminCity.deleteCity);

router.post('/edit',validateToken, adminCity.editCity);

router.post('/update',validateToken, uploadImage.single('imageToUpload') ,adminCity.updateCity);

router.post('/status',validateToken, adminCity.changeCityStatus);



module.exports=router;