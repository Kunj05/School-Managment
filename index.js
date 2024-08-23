const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const schoolRoutes = require('./routes/schoolRoutes');
console.log('Database connection pool created with the following configuration:');
console.log(`Host: ${process.env.MYSQLHOST}`);
console.log(`User: ${process.env.MYSQLUSER}`);
console.log(`Database: ${process.env.MYSQL_DATABASE}`);
console.log(`Port: ${process.env.MYSQLPORT}`);

app.use(express.json());
app.use('/api/v1', schoolRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
