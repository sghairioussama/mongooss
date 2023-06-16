const express = require('express');
const connect = require('./config/connectDB')

const app = express();

app.use(express.json());

require('dotenv').config()

const PORT = process.env.PORT 

app.listen(PORT,(error)=>{
    error?console.log(error): console.log(`server is running on ${PORT}`);
});

connect()

app.use('/api/person', require('./routes/personRoute'))