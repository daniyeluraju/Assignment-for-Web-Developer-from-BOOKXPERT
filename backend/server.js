const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Multer Storage for Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Create uploads directory if not exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Routes

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@gmail.com' && password === '1234') {
        res.json({ success: true, token: 'mock-jwt-token', message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Get All Employees
app.get('/employees', (req, res) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add Employee
app.post('/employees', upload.single('image'), (req, res) => {
    const { full_name, gender, dob, state } = req.body;
    const profile_image = req.file ? req.file.filename : null;

    const sql = "INSERT INTO employees (`full_name`, `gender`, `dob`, `state`, `profile_image`) VALUES (?)";
    const values = [full_name, gender, dob, state, profile_image];

    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json({ success: true, message: "Employee added successfully" });
    });
});

// Update Employee
app.put('/employees/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const { full_name, gender, dob, state } = req.body;
    let sql;
    let values;

    if (req.file) {
        sql = "UPDATE employees SET `full_name` = ?, `gender` = ?, `dob` = ?, `state` = ?, `profile_image` = ? WHERE id = ?";
        values = [full_name, gender, dob, state, req.file.filename, id];
    } else {
        sql = "UPDATE employees SET `full_name` = ?, `gender` = ?, `dob` = ?, `state` = ? WHERE id = ?";
        values = [full_name, gender, dob, state, id];
    }

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ success: true, message: "Employee updated successfully" });
    });
});

// Delete Employee
app.delete('/employees/:id', (req, res) => {
    const sql = "DELETE FROM employees WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json({ success: true, message: "Employee deleted successfully" });
    });
});

// Toggle Status
app.put('/employees/status/:id', (req, res) => {
    const id = req.params.id;
    // First get current status
    const getSql = "SELECT status FROM employees WHERE id = ?";
    db.query(getSql, [id], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: "Employee not found" });

        const newStatus = !data[0].status;
        const updateSql = "UPDATE employees SET status = ? WHERE id = ?";
        db.query(updateSql, [newStatus, id], (err, result) => {
            if (err) return res.json(err);
            return res.json({ success: true, message: "Status updated" });
        });
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
