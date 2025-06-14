
// // message.js
// const express = require('express');
// const router = express.Router();
// const { sql, poolPromise } = require('../db');

// // GET Notice Messages by student ID
// router.get('/notice', async (req, res) => {
//   try {
//     const pool = await poolPromise;
//     //const { receiver_id } = req.query;
//     const { receiver_id, date } = req.query;  // ✅ Add date support

//     if (!receiver_id) {
//       return res.status(400).json({ message: 'Missing receiver_id in query parameters' });
//     }

//     const request = pool.request();
//     request.input('STUDENT_ID', sql.VarChar(20), receiver_id);
//     request.input('MESSAGE_TYPE', sql.VarChar(20), 'NOTICE');
//     request.input('SENT_DATE', sql.Date, date || null);  // ✅ Optional date param

//     const result = await request.execute('SP_GET_MESSAGES_BY_TYPE');
//     res.status(200).json(result.recordset);
//   } catch (err) {
//     console.error('Notice Fetch Error:', err);
//     res.status(500).json({ message: `Error retrieving Notice messages: ${err.message}` });
//   }
// });


// module.exports = router;


const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// GET Notice Messages by student ID
router.get('/notice', async (req, res) => {
  try {
    const pool = await poolPromise;
    const { month, year } = req.query;

    // if (!receiver_id) {
    //   return res.status(400).json({ message: 'Missing receiver_id in query parameters' });
    // }

    const request = pool.request();
    request.input('Month',  sql.Int, parseInt(month));
    request.input('Year', sql.Int, parseInt(year));

    const result = await request.execute('SP_GET_NOTICE_HOLIDAYS');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Notice Fetch Error:', err);
    res.status(500).json({ message: `Error retrieving Notice messages: ${err.message}` });
  }
});


module.exports = router;