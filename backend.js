const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv/config');

app.use(bodyParser.json());

//IMPORT routes
const companyRoutes = require('./routes/companyRoutes');
app.use('/company', companyRoutes);

app.get('/', (req, res) => {
    res.send('INVALID');
});

//MULTER IMAGE UPLOAD
// var storage = multer.diskStorage({
//     destination(req, file, callback) {
//         callback(null, 'images/');
//     },
//     filename(req, file, callback) {
//         callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
//     },
// });

// var upload = multer({
//     limits: { fieldSize: 25 * 1024 * 1024 },
//     storage: storage,
// });

// app.post('/uploadImage', upload.single('photo'), (req, res) => {
//     //console.log('Calling post to uploadImage');
//     try {
//         res.status(200).json({
//             message: 'success!',
//         });
//     } catch (error) {
//         console.log('error');
//         res.json(error);
//     }
// });

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to database!!');
    }
);

mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err.message}`);
    throw err;
});

app.listen(3000, () => {
    console.log('Listen to port 3000...');
});
