const express = require('express');
const app = express();
const cors = require('cors');

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/images', express.static('public/images'));

const router = require('./routes');
app.use(router);

 
app.use((req, res, next) => {
    return res.status(404).json({
        message: "404 Not Found!"
    });
});


app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    });
});

app.listen(8000, () => console.log('running on port', 8000));