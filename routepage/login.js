
// routes/login.js
const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

router.get('/studentlogin', async (req, res) => {
  try {
    const pool = await poolPromise;

    const { SchoolID, UserName, Pwd  } = req.query;

    const result = await pool.request()
        .input('SCHOOL_ID', sql.Int, SchoolID)
        .input('STUDENT_ID', sql.VarChar(sql.MAX), UserName)
        .input('PWD', sql.VarChar(20), Pwd)
      
        .execute('SP_GET_STUDENT_LOGIN'); // Make sure the name matches your stored procedure
    
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: `${err}` });
  }
});

module.exports = router;