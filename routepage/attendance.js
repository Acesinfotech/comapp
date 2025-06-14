

// routes/attendance.js
const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

router.get('/studentmonthlyattendance', async (req, res) => {
  try {
    const pool = await poolPromise;

    const { studentId, month, year  } = req.query;

    if (!studentId || !month || !year) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

    const result = await pool.request()
        .input('StudentID', sql.VarChar(20), studentId)
        .input('Month', sql.Int, parseInt(month))
        .input('Year', sql.Int, parseInt(year))
      
        .execute('SP_GET_STUDENT_ATTENDANCE'); // Make sure the name matches your stored procedure
    
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: `${err}` });
  }
});

module.exports = router;