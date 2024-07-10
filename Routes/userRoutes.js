const router = require('express').Router()
const { body, validationResult } = require('express-validator');
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createObjectCsvWriter } = require('csv-writer');
const { authenticateToken, authorizeLevel } = require('../middlewares/authMiddleware');
const SECRET = 'your_secret_key';
router.post('/users',
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
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password,salt)

            const user = new User({ name, email, password: passwordHash, level });
            await user.save();
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

        

        
    }
);

router.get('/users', async (req, res) => {

    try{
        const users = await User.find()

        res.status(200).json(users)
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.get('/users/:id', async(req, res)=> {
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
    '/users/:id',
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

router.delete('/users/:id', async (req, res) => {
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

router.post('/login',
    [
        body('email').isEmail().withMessage('Por favor, insira um e-mail válido!'),
        body('password').notEmpty().withMessage('A senha é obrigatória!')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'usuario não encontrado!' });
            }

            // Para simplificação, estamos apenas comparando as senhas em texto puro.
            // Em uma aplicação real, a senha deve ser criptografada e comparada usando bcrypt ou outra biblioteca.
            if (user.password !== password) {
                return res.status(401).json({ message: 'E-mail ou senha inválidos!' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.get('/generate-csv', authenticateToken, authorizeLevel(4), async (req, res) => {
    try {
        const users = await User.find().lean();

        const csvWriter = createObjectCsvWriter({
            path: 'user_report.csv',
            header: [
                { id: 'id', title: 'ID' },
                { id: 'name', title: 'Name' },
                { id: 'email', title: 'Email' },
                { id: 'level', title: 'Level' }
            ]
        });

        await csvWriter.writeRecords(users);

        res.download('user_report.csv', 'user_report.csv', (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router