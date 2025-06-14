// message.js
const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// GET Homework Messages by student ID
router.get('/homework', async (req, res) => {
  try {
    const pool = await poolPromise;
    //const { receiver_id } = req.query;
    const { receiver_id, date } = req.query; // ✅ Make sure "date" is included here

    if (!receiver_id) {
      return res.status(400).json({ message: 'Missing receiver_id in query parameters' });
    }

    const request = pool.request();
    request.input('STUDENT_ID', sql.VarChar(20), receiver_id);
    request.input('MESSAGE_TYPE', sql.VarChar(20), 'HOMEWORK');
    request.input('SENT_DATE', sql.Date, date || null);

    const result = await request.execute('SP_GET_MESSAGES_BY_TYPE');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Homework Fetch Error:', err);
    res.status(500).json({ message: `Error retrieving homework messages: ${err.message}` });
  }
});


module.exports = router;