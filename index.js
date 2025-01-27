const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const initializeDatabase = require('./src/config/databaseInit');
const http  = require("http");
const userRoutes =require ('./src/routes/userRoute')
const productRoutes =require ('./src/routes/productRoute')


dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

initializeDatabase();
 const server = http.createServer(app)

server.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`);   
});

app.use(userRoutes);
app.use(productRoutes);
