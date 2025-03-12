const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');

// NOTE: These routes demonstrate the equivalent functionality that Supabase Auth provides

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insert user into database
    const query = `
      INSERT INTO users (email, password, name, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, email, name
    `;
    
    // In the actual implementation, this is handled by Supabase Auth:
    // supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: { name }
    //   }
    // });
    
    const { rows } = await db.query(query, [email, hashedPassword, name]);
    
    // Generate JWT token
    const token = jwt.sign(
      { id: rows[0].id, email: rows[0].email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    
    res.status(201).json({
      user: rows[0],
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = rows[0];
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // In the actual implementation, this is handled by Supabase Auth:
    // supabase.auth.signInWithPassword({
    //   email,
    //   password
    // });
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user (requires authentication)
router.get('/me', async (req, res) => {
  try {
    // This would normally use the auth middleware to get the user ID from the token
    // For demonstration purposes, we're assuming the token is in the Authorization header
    
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Get user from database
    const { rows } = await db.query('SELECT id, email, name FROM users WHERE id = $1', [decoded.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // In the actual implementation, this is handled by Supabase Auth:
    // supabase.auth.getUser()
    
    res.json(rows[0]);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  // In a traditional JWT setup, the client would simply discard the token
  // In the actual implementation, this is handled by Supabase Auth:
  // supabase.auth.signOut()
  
  res.json({ message: 'Logged out successfully' });
});

module.exports = router; 