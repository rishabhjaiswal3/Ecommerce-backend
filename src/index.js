const express = require('express')
const cors = require('cors');
const userRouters = require('./routes/user.route');
const authRouters = require('./routes/auth.route');


const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
    return res.status(200).send({message: "Welcome to Ecommerce api - Node",status:true})
} )

app.use("/auth",authRouters);
app.use('/users',userRouters);

module.exports = app;
