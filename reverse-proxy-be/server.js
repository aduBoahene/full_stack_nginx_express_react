const express = require('express');
const { sequelize, Student } = require('./models');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/api', (req, res) => {
  res.send('This is a reverse proxy example. Nginx forwarding requests to an express application');
});

app.post("/api/student", async (req, res) => {
  try {
    const { firstname, lastname, email, studentId} = req.body;
    const newStudent = await Student.create({ firstname, lastname, email, studentId});
    res.json({ msg: "Student saved", data: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the student' });
  }
});

app.get("/api/student", async (req, res) => {
  try {
    const students = await Student.findAll({});
    res.json({ data: students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching students' });
  }
});

// PUT endpoint to update a student by ID
app.put('/api/student/:id', async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, studentId} = req.body; // Assuming these are the fields you want to update

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log("Student to edit", student)

    student.firstname = firstname !== undefined ? firstname : student.firstname;
    student.lastname = lastname !== undefined ? lastname : student.lastname;
    student.email = email !== undefined ? email : student.email;
    student.studentId = studentId !== undefined ? studentId : student.studentId;
    console.log("after edit", student)

    await student.save();

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the student' });
  }
});



// Delete endpoint to Delete a student by ID
app.delete('/api/student/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.destroy();

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the student' });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started successfully on port ${port}`);
  });
});