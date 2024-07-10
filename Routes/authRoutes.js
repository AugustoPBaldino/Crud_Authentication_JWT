const express = require('express');
const { body } = require('express-validator');
const { createObjectCsvWriter } = require('csv-writer');
const router = express.Router();
const { createObjectCsvWriter } = require('csv-writer');
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
