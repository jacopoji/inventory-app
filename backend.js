const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//IMPORT routes
const companyRoutes = require('./routes/companyRoutes');
app.use('/company', companyRoutes);

app.get('/', (req, res) => {
    res.send('INVALID');
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to database!!');
    }
);

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
    throw err;
});

app.listen(3000, () => {
    console.log('Listen to port 3000...');
});
