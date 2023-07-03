import express from 'express';
import { updateUserController } from '../controllers/userController.js';
import userAuth from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Update:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - location
 *      properties:
 *        name:
 *          type: string
 *          description: User name
 *        email:
 *          type: string
 *          description: user email address
 *        location:
 *          type: string
 *          description: user location city or country
 *      example:
 *        name: John
 *        email: johndoes@gmail.com
 *        location: mumbai
 */ 

/**
 * @swagger
 * tags:
 *   name: Update User
 *   description: update apis
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/user/update-user:
 *    put:
 *      summary: update user
 *      tags: [Update User]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Update'
 *      responses:
 *        200:
 *          description: user updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal serevr error
 */

router.put('/update-user',userAuth,updateUserController)

export default router