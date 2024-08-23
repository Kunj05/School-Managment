const pool = require('../config/db');

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    
    const R = 6371; 
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c; // Distance in kilometers
};
  
exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ 
            error: 'All fields are required' 
        });
    }

    try {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        await pool.query(query, [name, address, parseFloat(latitude), parseFloat(longitude)]);
        res.status(201).json({
            message: 'School added successfully',
        });
    } 
    catch (err) {
        console.error('Error while adding school:', err);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
};

exports.listSchools = async (req, res) => {
    const { lat, lng } = req.query;
  
    if (!lat || !lng) {
        return res.status(400).json({
            error: 'Latitude and longitude are required'
        });
    }
  
    if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
        return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }
  
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
  
    try {
        const [schools] = await pool.query('SELECT * FROM schools');
    
        const sortedSchools = schools.map(school => {
            const distance = calculateDistance(userLat, userLng, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);
        
        res.status(200).json({
            success: true,
            sortedSchools: sortedSchools,
        });
    } 
    catch (err) {
        console.error('Error while listing schools:', err);
        res.status(500).json({
            error: 'Internal server error', 
            });
    }
};
