const express=require('express')
const multer = require('multer');
const app=express()
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
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
const materialProcessRoutes = require('./routes/materialProcessRoutes'); 
const materialProcessDetailsRoutes = require('./routes/materialProcessDetailsRoutes');
const inventoryDetailsRoutes = require('./routes/inventoryDetailsRoutes');
const purchaseDetailsRoutes = require('./routes/purchaseDetailsRoutes');
const materialFilingRoutes = require('./routes/materialFilingRoutes');
const materialDispatchRoutes = require('./routes/materialDispatchRoutes');
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())
app.use(upload.any());

app.use('/usersRegister', userRouter);
app.use('/user', userRouter)
app.use('/clients',authMiddleware, clientRoutes);
app.use('/clientaddress',authMiddleware, clientAddressRoutes);
app.use('/materialinward',authMiddleware, materialInwardRoutes);
app.use('/expected-material-expenses',authMiddleware, expectedMaterialExpenseRoutes);
app.use('/material-units',authMiddleware, materialUnitRoutes);
app.use('/material-routes',authMiddleware, materialRoutes);
app.use('/material-process',authMiddleware, materialProcessRoutes);
app.use('/material-processdetails',authMiddleware, materialProcessDetailsRoutes);
app.use('/inventory-details',authMiddleware, inventoryDetailsRoutes);
app.use('/purchase-details',authMiddleware, purchaseDetailsRoutes);
app.use('/material-filings',authMiddleware, materialFilingRoutes);
app.use('/material-dispatches',authMiddleware,materialDispatchRoutes);
module.exports =app