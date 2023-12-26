import express from 'express'
import { loginController, registerController } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs:15*60*1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})



const router = express.Router();


//routes

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           minLength: 6
 *           description: The password of the user.
 *         location:
 *           type: string
 *           default: India
 *           description: The location of the user (default is India).
 *       required:
 *         - name
 *         - email
 *         - password
 *       example:
 *         name: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         password: password123
 *         location: United States
 */



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints for user authentication
 */



//REGISTER || POST
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Invalid request payload
 *       '429':
 *         description: Too Many Requests (Rate Limit Exceeded)
 *       '500':
 *         description: Internal server error
 */
router.post('/register',limiter,registerController);

//LOGIN || POST
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Authentication failed (invalid credentials)
 *       '429':
 *         description: Too Many Requests (Rate Limit Exceeded)
 *       '500':
 *         description: Internal server error
 */
router.post('/login',limiter,loginController);

export default router;