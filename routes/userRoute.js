import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { updateUserController } from '../controllers/userController.js'

const router = express.Router()


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user operations
 */

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

//routes
//Get USERS || GET
/**
 * @swagger
 * /api/users/update-user:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User information updated successfully
 *       '401':
 *         description: Unauthorized (missing or invalid token)
 *       '500':
 *         description: Internal server error
 */
router.put('/update-user',userAuth,updateUserController)


export default router;