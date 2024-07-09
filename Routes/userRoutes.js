const router = require('express').Router()
const { body, validationResult } = require('express-validator');
const User = require('../Models/User')

router.post('/',
[
        body('name').notEmpty().withMessage('O nome é obrigatório!'),
        body('email').isEmail().withMessage('Por favor, insira um e-mail válido!'),
        body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres!'),
        body('level').isInt({ min: 1 }).withMessage('O nível deve ser um número inteiro maior que 0!')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { name, email, password, level } = req.body;

        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(409).json({ error: 'E-mail já cadastrado!' });
            }

            const user = new User({ name, email, password, level });
            await user.save();
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.get('/', async (req, res) => {

    try{
        const users = await User.find()

        res.status(200).json(users)
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async(req, res)=> {
    const id = req.params.id

    try{
        const user = await User.findOne({id: id})

        if(!user){
            return res.status(422).json({message: 'O usuario não foi encontrado!'})
        }

        res.status(200).json(user)
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.put(
    '/:id',
    [
        body('name').optional().notEmpty().withMessage('O nome não pode estar vazio!'),
        body('email').optional().isEmail().withMessage('Por favor, insira um e-mail válido!'),
        body('password').optional().isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres!'),
        body('level').optional().isInt({ min: 1 }).withMessage('O nível deve ser um número inteiro maior que 0!')
    ], async (req,res) =>{
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
            return res.status(422).json({ message: 'Usuário não encontrado!' })
          }
    }catch(error){
        res.status(500).json({error:error})
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const user = await User.findOne({ id: id })
  
    if (!user) {
      return res.status(422).json({ message: 'Usuário não encontrado!' })
    }
  
    try {
      await User.deleteOne({ id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
}})

  module.exports = router