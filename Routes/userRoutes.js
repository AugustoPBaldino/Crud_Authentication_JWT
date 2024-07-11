const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../Controllers/userController');
const { authenticateToken, authorizeLevel } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - level
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente do usuário
 *         name:
 *           type: string
 *           description: O nome do usuário
 *         email:
 *           type: string
 *           description: O e-mail do usuário
 *         password:
 *           type: string
 *           description: A senha do usuário
 *         level:
 *           type: integer
 *           description: Nível de acesso do usuário
 *       example:
 *         id: 1
 *         name: João Silva
 *         email: joaosilva@example.com
 *         password: senhaSegura
 */

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: API de gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: A lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', userController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: O usuário criado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Algum erro no servidor
 */
router.post('/users', [
    body('name').notEmpty().withMessage('O nome é obrigatório!'),
    body('email').isEmail().withMessage('Por favor, insira um e-mail válido!'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres!'),
    body('level').isInt({ min: 1 }).withMessage('O nível deve ser um número inteiro maior que 0!')
], userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtém o usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do usuário
 *     responses:
 *       200:
 *         description: A descrição do usuário pelo ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/users/:id', userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza o usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: O usuário foi atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Algum erro aconteceu
 */
router.put('/users/:id', [
    body('name').optional().notEmpty().withMessage('O nome não pode estar vazio!'),
    body('email').optional().isEmail().withMessage('Por favor, insira um e-mail válido!'),
    body('password').optional().isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres!'),
    body('level').optional().isInt({ min: 1 }).withMessage('O nível deve ser um número inteiro maior que 0!')
], userController.updateUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove o usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do usuário
 *     responses:
 *       200:
 *         description: O usuário foi deletado
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/users/:id', userController.deleteUserById);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: O e-mail do usuário
 *               password:
 *                 type: string
 *                 description: A senha do usuário
 *     responses:
 *       200:
 *         description: O usuário foi logado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: E-mail ou senha inválidos
 *       422:
 *         description: Erro de validação
 */
router.post('/login', [
    body('email').isEmail().withMessage('Por favor, insira um e-mail válido!'),
    body('password').notEmpty().withMessage('A senha é obrigatória!')
], userController.loginUser);

/**
 * @swagger
 * /users/generate-csv:
 *   get:
 *     summary: Gera um relatório CSV de usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Arquivo CSV gerado
 *       500:
 *         description: Algum erro aconteceu
 */
router.get('/generate-csv', authenticateToken, authorizeLevel(4), userController.generateCsvReport);

module.exports = router;
