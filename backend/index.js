const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

global.foodData = [];
global.foodCategory = [];

require('./db')(function call(err, data, CatData) {
    if (err) {
        console.log(err);
        return;
    }
    global.foodData = data;
    global.foodCategory = CatData;
    console.log('Data loaded successfully'); // Log to confirm data load
});

// Define allowed origins
const allowedOrigins = [
    'http://localhost:3000', // For local development
    'https://go-food-ebon.vercel.app', // Primary URL
    'https://go-food-git-main-lakshya-gautams-projects.vercel.app', // Additional URL
    'https://go-food-ekzdi49k8-lakshya-gautams-projects.vercel.app' // Another additional URL
];

// CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed methods
    optionsSuccessStatus: 204 // For legacy browser support
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Your other routes
app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
