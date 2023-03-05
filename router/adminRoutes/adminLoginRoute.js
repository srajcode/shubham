const {Router}=require('express');
const router=Router();
const {validateToken}=require('../../authenticate');
// const {createTokens,validateToken}=require('../../authenticate');


const adminLoginController=require('../../controller/adminController/adminLoginController');

router.get('/login', validateToken, adminLoginController.adminLogin );

router.get('/logout',adminLoginController.adminLogout);

router.get('/dashboard', validateToken, adminLoginController.adminDashboard);

router.post('/login/verify',adminLoginController.adminLoginVerify)

module.exports=router;