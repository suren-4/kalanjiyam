const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const auth = require('../middleware/auth');

// NOTE: These routes demonstrate the equivalent SQL queries that Supabase performs

// Get all artifacts with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const offset = page * limit;
    
    // This is the equivalent SQL query that Supabase performs
    const query = `
      SELECT id, title, image_url, description
      FROM artifacts
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    
    // In the actual implementation, this is handled by Supabase:
    // supabase
    //   .from('artifacts')
    //   .select('id, title, image_url, description')
    //   .range(page * limit, (page + 1) * limit - 1)
    //   .order('created_at', { ascending: false });
    
    const { rows } = await db.query(query, [limit, offset]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single artifact by ID
router.get('/:id', async (req, res) => {
  try {
    // This is the equivalent SQL query that Supabase performs
    const query = `
      SELECT *
      FROM artifacts
      WHERE id = $1
    `;
    
    // In the actual implementation, this is handled by Supabase:
    // supabase
    //   .from('artifacts')
    //   .select('*')
    //   .eq('id', req.params.id)
    //   .single();
    
    const { rows } = await db.query(query, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Artifact not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new artifact (requires authentication)
router.post('/', auth.requireAuth, async (req, res) => {
  try {
    const { 
      title, description, image_url, period_era, location, 
      material, culture, reference_doc 
    } = req.body;
    
    // This is the equivalent SQL query that Supabase performs
    const query = `
      INSERT INTO artifacts (
        title, description, image_url, period_era, location, 
        material, culture, reference_doc, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING *
    `;
    
    // In the actual implementation, this is handled by Supabase:
    // supabase
    //   .from('artifacts')
    //   .insert([{ 
    //     title, description, image_url, period_era, location, 
    //     material, culture, reference_doc 
    //   }])
    //   .select();
    
    const values = [
      title, description, image_url, period_era, location, 
      material, culture, reference_doc
    ];
    
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an artifact (requires authentication)
router.put('/:id', auth.requireAuth, async (req, res) => {
  try {
    const { 
      title, description, image_url, period_era, location, 
      material, culture, reference_doc 
    } = req.body;
    
    // This is the equivalent SQL query that Supabase performs
    const query = `
      UPDATE artifacts
      SET 
        title = $1,
        description = $2,
        image_url = $3,
        period_era = $4,
        location = $5,
        material = $6,
        culture = $7,
        reference_doc = $8,
        updated_at = NOW()
      WHERE id = $9
      RETURNING *
    `;
    
    // In the actual implementation, this is handled by Supabase:
    // supabase
    //   .from('artifacts')
    //   .update({ 
    //     title, description, image_url, period_era, location, 
    //     material, culture, reference_doc 
    //   })
    //   .eq('id', req.params.id)
    //   .select();
    
    const values = [
      title, description, image_url, period_era, location, 
      material, culture, reference_doc, req.params.id
    ];
    
    const { rows } = await db.query(query, values);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Artifact not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an artifact (requires authentication)
router.delete('/:id', auth.requireAuth, async (req, res) => {
  try {
    // This is the equivalent SQL query that Supabase performs
    const query = `
      DELETE FROM artifacts
      WHERE id = $1
      RETURNING id
    `;
    
    // In the actual implementation, this is handled by Supabase:
    // supabase
    //   .from('artifacts')
    //   .delete()
    //   .eq('id', req.params.id);
    
    const { rows } = await db.query(query, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Artifact not found' });
    }
    
    res.json({ message: 'Artifact deleted successfully', id: rows[0].id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 