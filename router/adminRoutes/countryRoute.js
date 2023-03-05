const {Router}=require('express');
const router=Router();
const {validateToken}=require('../../authenticate');
const uploadImage=require('../../controller/adminController/functions').upload;




const adminCountry=require('../../controller/adminController/countryController');

router.get('',validateToken, adminCountry.loadCountryPage);

router.get('/view_all',validateToken, adminCountry.viewAllCountry);

router.post('/addNew',validateToken,uploadImage.single('imageToUpload'), adminCountry.addNewCountry);

router.post('/delete',validateToken, adminCountry.deleteCountry);

router.post('/edit',validateToken, adminCountry.editCountry);

router.post('/update',validateToken, uploadImage.single('imageToUpload') ,adminCountry.updateCountry);

router.post('/status',validateToken, adminCountry.changeCountryStatus);



module.exports=router;