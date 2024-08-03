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
const clientRoutes = require('./routes/clientRoutes');
const clientAddressRoutes = require('./routes/clientAddressRoutes');
const materialInwardRoutes = require('./routes/materialInwardRoutes');
const expectedMaterialExpenseRoutes = require('./routes/expectedMaterialExpenseRoutes');
const materialUnitRoutes = require('./routes/materialUnitRoutes');
const materialRoutes = require('./routes/mMaterialRoutes');
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())
app.use(upload.any());

app.use('/usersRegister', userRouter);
app.use('/clients', clientRoutes);
app.use('/clientaddress', clientAddressRoutes);
app.use('/materialinward', materialInwardRoutes);
app.use('/expected-material-expenses', expectedMaterialExpenseRoutes);
app.use('/material-units', materialUnitRoutes);
app.use('/material-routes', materialRoutes);
module.exports =app