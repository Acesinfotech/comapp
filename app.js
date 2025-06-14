
// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Import routes
const storedProcedureRoute = require('./routepage/login');
const allSchoolsRoute = require('./routepage/school'); // ðŸ‘ˆ new import
const studentHomeWorkRoute = require('./routepage/homework'); // ðŸ‘ˆ new import
const studentAttendanceRoute = require('./routepage/attendance'); // ðŸ‘ˆ new import
const studentMessageRoute = require('./routepage/message'); // ðŸ‘ˆ new import
const studentNoticeRoute = require('./routepage/notice'); // ðŸ‘ˆ new import


// Middleware
app.use(express.json());
app.use(cors());


// Use routes
app.use('/api', storedProcedureRoute);
app.use('/api', allSchoolsRoute); // ðŸ‘ˆ use new route
app.use('/api', studentHomeWorkRoute); // ðŸ‘ˆ use new route
app.use('/api', studentAttendanceRoute); // ðŸ‘ˆ use new route
app.use('/api', studentMessageRoute); // ðŸ‘ˆ use new route
app.use('/api', studentNoticeRoute); // ðŸ‘ˆ use new route






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });