const router = require('express').Router()

const User = require('../Models/User')

router.post('/', async (req, res) => {
    const { name, email, password, level } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }

    const user = {
        name,
        email,
        password,
        level,
    }

    try {
        await User.create(user)
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
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

        if(!user){
            res.status(422).json({message: 'O usuario não foi encontrado!'})
            return
        }

        res.status(200).json(user)
    }catch(error){
        res.status(500).json({error:error})
    }
})

router.put('/:id', async (req,res) =>{
    const id = req.params.id

    const{name,email,password,level} = req.body

    const user = {
        name,
        email,
        password,
        level,
    }

    try{
        const updatedUser = await User.updateOne({id: id},user)
        if (updatedUser.matchedCount === 0) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
          }
    }catch(error){
        res.status(500).json({error:error})
    }


})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const user = await User.findOne({ id: id })
  
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await User.deleteOne({ id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
module.exports = router