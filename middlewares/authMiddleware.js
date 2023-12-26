import JWT from 'jsonwebtoken';

// Web page contains two sections, header, body
// jwt is available in the header section
// we have to get jwt from the header section

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     AuthError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message indicating authentication failure.
 *       example:
 *         message: Authentication failed
 */

/**
 * @swagger
 * security:
 *   - BearerAuth: []
 * 
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The unique identifier of the authenticated user.
 *       example:
 *         userId: abc123
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /api/auth:
 *   security: []
 *   post:
 *     summary: Authenticate user and get a JWT token
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
 *         description: JWT token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '401':
 *         description: Authentication failed (invalid credentials)
 *       '500':
 *         description: Internal server error
 */

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        next('Auth Failed');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        next('Auth Failed');
    }
};

export default userAuth;
