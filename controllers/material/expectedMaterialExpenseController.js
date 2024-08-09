const { ExpectedMaterialExpense, MaterialInward, M_Material } = require('../../models');
const Joi = require('joi');

// Define Joi schema for validation
const expectedMaterialExpenseSchema = Joi.object({
  material_inward_id: Joi.number().integer().required(),
  material: Joi.number().integer().required(),
  qty: Joi.number().integer().min(1).required(),
});

class ExpectedMaterialExpenseController {
  // Create a new ExpectedMaterialExpense
  async createExpectedMaterialExpense(req, res) {
    try {
      const { error } = expectedMaterialExpenseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_inward_id, material, qty } = req.body;

      const newExpense = await ExpectedMaterialExpense.create({
        material_inward_id,
        material,
        qty,
      });

      return res.status(201).json(newExpense);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get all ExpectedMaterialExpenses
  async getAllExpectedMaterialExpenses(req, res) {
    try {
      const expenses = await ExpectedMaterialExpense.findAll({
        include: [
          { model: MaterialInward },
          { model: M_Material },
        ],
      });

      return res.json(expenses);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get an ExpectedMaterialExpense by ID
  async getExpectedMaterialExpense(req, res) {
    try {
      const { id } = req.params;
      const expense = await ExpectedMaterialExpense.findByPk(id, {
        include: [
          { model: MaterialInward },
          { model: M_Material },
        ],
      });

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found.' });
      }

      return res.json(expense);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Update an ExpectedMaterialExpense by ID
  async updateExpectedMaterialExpense(req, res) {
    try {
      const { id } = req.params;
      const { error } = expectedMaterialExpenseSchema.validate(req.body, { presence: 'optional' });
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_inward_id, material, qty } = req.body;

      const expense = await ExpectedMaterialExpense.findByPk(id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found.' });
      }

      await expense.update({ material_inward_id, material, qty });

      return res.json(expense);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete an ExpectedMaterialExpense by ID
  async deleteExpectedMaterialExpense(req, res) {
    try {
      const { id } = req.params;
      const expense = await ExpectedMaterialExpense.findByPk(id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found.' });
      }

      await expense.destroy();
      return res.json({ message: 'Expense deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

// Export an instance of the controller class
module.exports = new ExpectedMaterialExpenseController();
