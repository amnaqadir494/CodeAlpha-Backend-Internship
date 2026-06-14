const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());
app.use(express.static(__dirname)); 


let expenses = [
    { id: "1", name: "Internet Bill", amount: 2500, category: "Bills", date: "2026-06-12" }
];


app.get('/api/expenses', (req, res) => {
    res.json(expenses);
});


app.post('/api/expenses', (req, res) => {
    const { name, amount, category, date } = req.body;
    
    if (!name || !amount || !category || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newExpense = {
        id: Date.now().toString(),
        name,
        amount: parseFloat(amount), 
        category,
        date
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
});


app.delete('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    expenses = expenses.filter(exp => exp.id !== id);
    res.json({ message: 'Expense deleted successfully' });
});


const PORT = 8000; 
app.listen(PORT, () => {
    console.log(`Expense Tracker Server running on port ${PORT}`);
    
    
    exec(`start http://localhost:${PORT}/index.html`);
});