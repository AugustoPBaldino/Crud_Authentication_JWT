const router = require('express').Router()

const User = require('../Models/User')
router.post('/', async (req,res)=>{
    const{id,name,email,password,level} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
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

router.get('/', async (req, res) => {

    try{
        const users = await User.find()

        res.status(200).json(users)
    }catch(error){
        res.status(500).json({error:error})
    }
})

router.get('/:id', async(req, res)=> {
    const id = req.params.id

    try{
        const user = await User.findOne({id: id})

        if(!person){
            res.status(422).json({message: 'O usuario não foi encontrado'})
            return
        }

        res.status(200).json(user)
    }catch(error){
        res.status(500).json({error:error})
    }
}) 
module.exports = router