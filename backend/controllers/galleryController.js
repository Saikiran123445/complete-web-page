const pool = require('../config/db');

// Get all gallery images
exports.getGallery = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gallery ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching gallery:', err);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
};

// Add gallery image
exports.addImage = async (req, res) => {
  const { title, imageUrl, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO gallery (title, image_url, description) VALUES ($1, $2, $3) RETURNING *',
      [title, imageUrl, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding image:', err);
    res.status(500).json({ error: 'Failed to add image' });
  }
};

// Delete gallery image
exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM gallery WHERE id = $1', [id]);
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
