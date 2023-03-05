const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
// const bodyparser=require('body-parser')
const cookieParser=require('cookie-parser')
dotenv.config() //since .env is in root folder
PORT=process.env.PORT
const app=express();

// const {createTokens,validateToken}=require('./authenticate');
// const conn=require('./config/dbconfig').connection
// const bcrypt = require('bcryptjs');


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieParser()); 


app.use('/plugins',express.static(path.join(__dirname,'views','admin','plugins')))
app.use('/dist',express.static(path.join(__dirname,'views','admin','dist')))

app.use('/publicAssets', express.static(path.join(__dirname, 'public','assets')));
app.use('/publicCSS', express.static(path.join(__dirname, 'public','assets','css')));
app.use('/publicJS', express.static(path.join(__dirname, 'public','assets','js')));
app.use('/publicPlugin', express.static(path.join(__dirname, 'public','assets','plugins')));
app.use('/publicImages', express.static(path.join(__dirname, 'public','assets','images')));
app.use('/adminJS', express.static(path.join(__dirname, 'views','admin','customJS')));
app.use('/adminCSS', express.static(path.join(__dirname, 'views','admin','customCSS')));
app.use('/adminImg', express.static(path.join(__dirname)));
app.set('view engine', 'ejs');
app.set('views',  [path.join(__dirname, 'views'),
                   path.join(__dirname, 'views/Admin')]);



//router
const adminRoutes=require('./router/adminRoutes/adminLoginRoute');      //admin login & logout routes
app.use('/admin',adminRoutes);
const adminCategoryRoutes=require('./router/adminRoutes/categoryRoute');     // admin category page routes
app.use('/admin/category',adminCategoryRoutes);
const adminSubCategoryRoutes=require('./router/adminRoutes/subcategoryRoute');  // admin sub-category page routes
app.use('/admin/sub_category',adminSubCategoryRoutes);
const adminItems=require('./router/adminRoutes/itemsRoute');  // admin product items page routes
app.use('/admin/items',adminItems);

const adminCountry=require('./router/adminRoutes/countryRoute');  // admin states page routes
app.use('/admin/loc_country',adminCountry);
const adminStates=require('./router/adminRoutes/stateRoute');  // admin states page routes
app.use('/admin/loc_state',adminStates);
const adminCity=require('./router/adminRoutes/cityRoute');  // admin cities page routes
app.use('/admin/loc_city',adminCity);


app.get("/",(req,res)=>{
    res.render('public/index');
});

app.get("/cart",(req,res)=>{
    res.render('public/cart');
});
app.get("/test1",(req,res)=>{
    res.render('public/wishlist');
});
app.get("/test2",(req,res)=>{
    res.render('public/my-account');
});
app.get("/test3",(req,res)=>{
    res.render('public/checkout');
});
app.get("/productdetails",(req,res)=>{
    res.render('public/productDetails');
});
app.get("/category",(req,res)=>{
    res.render('public/newcategory');
});
app.get("*",(req,res)=>{
    // res.send('Invalid URL', 404);
    res.render('public/404');
});

app.listen(PORT,()=>console.log(`server is running on http://localhost:${PORT}`))

