const pool = require('../config/db');

// Submit inquiry
exports.submitInquiry = async (req, res) => {
  const { name, phone, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO inquiries (name, phone, message) VALUES ($1, $2, $3) RETURNING *',
      [name, phone, message]
    );
    res.status(201).json({ message: 'Inquiry submitted successfully', data: result.rows[0] });
  } catch (err) {
    console.error('Error submitting inquiry:', err);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
};

// Get all inquiries (admin)
exports.getInquiries = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
};
