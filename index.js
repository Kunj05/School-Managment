const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const schoolRoutes = require('./routes/schoolRoutes');

app.use(express.json());
app.use('/', schoolRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
