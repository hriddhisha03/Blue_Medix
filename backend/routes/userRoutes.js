const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');


const router = express.Router();

// Create a new user
router.post('/register', async (req, res) => {
  try {
    const { name, gender, age, email, password, role } = req.body;

    // Check if user already exists
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      gender,
      age,
      email,
      password: hashedPassword, // Store hashed password
      role
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/update-user/:id', async (req, res) => {
  try {
    const user =
      await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) { return res.status(404).json({ message: 'User not found' }); }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
);
router.delete('/delete-user/:id', async (req, res) => {
  try {
    const user =
      await User.findByIdAndDelete(req.params.id);
    if (!user) { return res.status(404).json({ message: 'User not found' }); }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
);
module.exports = router;
