const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(
    express.urlencoded({
        extended:  true,
    })
)

app.use(express.json())

app.get('/users', (req, res) => {

    res.json({message:'Oi Express!'})
})

mongoose.connect('mongodb+srv://AugustoPBaldino:Pacoca0108@usercluster.l5jbaog.mongodb.net/bancodeusuarios?retryWrites=true&w=majority&appName=UserCluster')
.then(() => {
    console.log('conectando ao MongoDB')
    app.listen(3000)
})
.catch((err)=> console.log(err))