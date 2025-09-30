const express = require('express');
const app = express();

app.use(express.json());

let students = [];
let nextId = 1;

// POST 
app.post('/students', (req, res) => {
    const student = { id: nextId++, ...req.body };
    students.push(student);
    res.status(201).json(student);
});

// GET 
app.get('/students', (req, res) => {
    res.json(students);
});

// GET 
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
});

// PUT 
app.put('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Student not found' });
    students[index] = { id: parseInt(req.params.id), ...req.body };
    res.json(students[index]);
});

// DELETE 
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Student not found' });
    students.splice(index, 1);
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));