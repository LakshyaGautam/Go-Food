const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

global.foodData = [];
global.foodCategory = [];

require('./db')(function call(err, data, CatData) {
    if (err) {
        console.log(err);
        return;
    }
    global.foodData = data;
    global.foodCategory = CatData;
    console.log('Data loaded successfully'); // Add a log to confirm data load
});

const allowedOrigins = ['http://localhost:3000', 'https://go-food-ebon.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://go-food-ebon.vercel.app");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
