const router = require('express').Router()

const User = require('../Models/User')
router.post('/', async (req,res)=>{
    const{id,name,email,password,level} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório!'})
    }
    const user = {
        id,
        name,
        email,
        password,
        level,
    }

    try{

        await User.create(user)
        res.status(201).json({message: 'usuario cadastrado com sucesso!'})
    } catch(error){
        res.status(500).json({error: error})
    }

})

router.get('/users', (req, res) => {

    res.json({message:'Oi Express!'})
})

module.exports = router