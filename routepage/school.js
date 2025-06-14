
// routes/currentsession.js
const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

router.get('/allschools', async (req, res) => {
    try {
      const pool = await poolPromise;
  
      const result = await pool
        .request()
        .query("SELECT SCHOOL_ID, SCHOOL_NAME FROM T_SCHOOL_MASTER ORDER BY SCHOOL_NAME");
      
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send({ message: `${err}` });
    }
  });

module.exports = router;