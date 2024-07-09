const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./Routes/userRoutes')

const User = require('./Models/User')
app.use(
    express.urlencoded({
        extended:  true,
    })
)

app.use(express.json())
app.use('/users',userRoutes)

mongoose.connect('mongodb+srv://AugustoPBaldino:Pacoca0108@usercluster.l5jbaog.mongodb.net/bancodeusuarios?retryWrites=true&w=majority&appName=UserCluster')
.then(() => {
    console.log('conectando ao MongoDB')
    app.listen(3000)
})
.catch((err)=> console.log(err))