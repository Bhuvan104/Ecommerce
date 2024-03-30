const express=require('express')
const multer = require('multer');
const app=express()
const cors = require('cors');
app.use(cors());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Keep the original filename
    }
  });
  
const upload = multer({ storage: storage });


require('dotenv').config();
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRouter');
const postRoute=require('./routes/post')
const bodyParser=require('body-parser')
const addressRouter = require('./routes/addressRouter');
const orderRouter = require('./routes/orderRouter');
const imagesRouter = require('./routes/imagesRouter');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())
app.use(upload.any());
app.use('/post',postRoute)
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/addresses', addressRouter);
app.use('/order', orderRouter);
app.use('/categories', categoryRouter);
app.use('/usersRegister', userRouter);
app.use('/images', imagesRouter);
module.exports =app