const express = require('express');
const ExpectedMaterialExpenseController = require('../controllers/ExpectedMaterialExpenseController');

const router = express.Router();

router.post('/', ExpectedMaterialExpenseController.createExpectedMaterialExpense);
router.get('/', ExpectedMaterialExpenseController.getAllExpectedMaterialExpenses);
router.get('/expenses/:id', ExpectedMaterialExpenseController.getExpectedMaterialExpense);
router.put('/expenses/:id', ExpectedMaterialExpenseController.updateExpectedMaterialExpense);
router.delete('/expenses/:id', ExpectedMaterialExpenseController.deleteExpectedMaterialExpense);

module.exports = router;
