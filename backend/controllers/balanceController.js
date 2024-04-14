const Balance = require('../models/balance');

exports.createAnnualBalance = async (req, res) => {
    try {
        const userId = req.params.userId; // Obtén el ID del usuario de la solicitud
        const categories = ['Alquiler', 'Salidas', 'Comida', 'Servicios', 'Tarjeta de crédito', 'Inversiones', 'Ingresos'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const annualBalance = categories.map(category => ({
            user: userId, // Asocia el balance con el ID del usuario
            category,
            expenses: months.map(month => ({ month, amount: 0 }))
        }));

        await Balance.insertMany(annualBalance);

        res.status(201).json({ message: 'Annual balance created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const userId = req.params.userId; // Obtén el ID del usuario de la solicitud
        const { categoryId } = req.params;
        const { category } = req.body;

        let balance = await Balance.findOne({ user: userId, _id: categoryId });

        if (!balance) {
            return res.status(404).json({ error: 'Balance not found' });
        }

        balance.category = category;

        await balance.save();

        res.json(balance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const userId = req.params.userId; // Obtén el ID del usuario de la solicitud
        const { categoryId } = req.params;

        await Balance.deleteOne({ user: userId, _id: categoryId });

        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const userId = req.params.userId; // Obtén el ID del usuario de la solicitud
        const { category } = req.body;

        const newCategory = await Balance.create({ user: userId, category, expenses: [] });

        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserTable = async (req, res) => {
    try {
        const userId = req.params.userId; // Obtén el ID del usuario de la solicitud

        // Encuentra y devuelve la tabla de balance del usuario
        const userBalance = await Balance.find({ user: userId });

        res.json(userBalance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
