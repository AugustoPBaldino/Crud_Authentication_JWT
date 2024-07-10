const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./Routes/userRoutes')
require('dotenv').config()




app.use(
    express.urlencoded({
        extended:  true,
    })
)


app.use(express.json())
app.use(userRoutes)


mongoose.connect('mongodb+srv://AugustoPBaldino:Senha123@usercluster.l5jbaog.mongodb.net/bancodeusuarios?retryWrites=true&w=majority&appName=UserCluster')
.then(() => {
    console.log('conectando ao MongoDB')
    app.listen(3000)
})
.catch((err)=> console.log(err))