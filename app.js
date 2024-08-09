const express=require('express')
const app=express()
const cors = require('cors');
app.use(cors());

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

app.use('/usersRegister', userRouter);
app.use('/user', userRouter)
app.use('/clients', clientRoutes);
app.use('/clientaddress', clientAddressRoutes);
app.use('/materialinward', materialInwardRoutes);
app.use('/expected-material-expenses', expectedMaterialExpenseRoutes);
app.use('/material-units', materialUnitRoutes);
app.use('/material-routes', materialRoutes);
app.use('/material-process', materialProcessRoutes);
app.use('/material-processdetails', materialProcessDetailsRoutes);
app.use('/inventory-details', inventoryDetailsRoutes);
app.use('/purchase-details', purchaseDetailsRoutes);
app.use('/material-filings', materialFilingRoutes);
app.use('/material-dispatches', materialDispatchRoutes);
module.exports =app