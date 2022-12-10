require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const app = express();
const mongoString = process.env.DATABASE_URL;
const port = process.env.PORT || 3001;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());

app.use('/api/v1/user', userRoute)

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})