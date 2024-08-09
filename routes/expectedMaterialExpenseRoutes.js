const express = require('express');
const ExpectedMaterialExpenseController = require('../controllers/material/ExpectedMaterialExpenseController');

const router = express.Router();

router.post('/', authMiddleware,ExpectedMaterialExpenseController.createExpectedMaterialExpense);
router.get('/', authMiddleware,ExpectedMaterialExpenseController.getAllExpectedMaterialExpenses);
router.get('/expenses/:id',authMiddleware, ExpectedMaterialExpenseController.getExpectedMaterialExpense);
router.put('/expenses/:id', authMiddleware,ExpectedMaterialExpenseController.updateExpectedMaterialExpense);
router.delete('/expenses/:id', authMiddleware,ExpectedMaterialExpenseController.deleteExpectedMaterialExpense);

module.exports = router;
