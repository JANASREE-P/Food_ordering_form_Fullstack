const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://janasree050_db_user:Sree2006@cluster0.s0tz0ns.mongodb.net/contact_management?appName=Cluster0")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));

const Employee = mongoose.model("Employee", {
    employeeId: String,
    name: String,
    department: String,
    designation: String,
    salary: Number,
    email: String
});

// Search employee
app.get("/employee/:id", async (req, res) => {

    const emp = await Employee.findOne({
        employeeId: req.params.id
    });

    if (!emp)
        return res.send("Employee not found");

    res.json(emp);
});

// Update salary
app.put("/employee/:id", async (req, res) => {

    const emp = await Employee.findOneAndUpdate(
        { employeeId: req.params.id },
        { salary: req.body.salary },
        { new: true }
    );

    if (!emp)
        return res.send("Employee not found");

    res.json(emp);
});
app.post("/employee", async (req, res) => {
    const emp = new Employee(req.body);
    await emp.save();
    res.json(emp);
});
app.listen(3001, () => {
    console.log("Server running on port 3001");
});