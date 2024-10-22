const express = require('express');
const app = express();
const cors = require("cors");
const router = require('./routes/router')

app.use(cors());
app.use(express.json());
app.use('/', router)

// Ocupamos el puerto 3001
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001");
});
