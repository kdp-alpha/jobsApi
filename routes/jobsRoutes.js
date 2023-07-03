import express from "express";
import userAuth from '../middleware/authMiddleware.js';
import  {createJobController, deleteJobs, getAllJobsController, jobsStatsController, updateJobsController} from "../controllers/jobsController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Jobs:
 *      type: object
 *      required:
 *        - company
 *        - position
 *      properties:
 *        company:
 *          type: string
 *          description: Company Name 
 *        position:
 *          type: string
 *          description: Job Position
 *        status:
 *          type: string
 *          description: Status of Job Application ['pending','reject','interview']
 *        workType:
 *          type: string
 *          description: Worktype ['full-time','part-time','internship','contract-based']
 *        workLocation:
 *          type: string
 *          description: Location
 *      example:
 *        company: Pepcoding Education Pvt Ltd
 *        position: Product Engineer Intern
 *        status: interview
 *        workType: full-time
 *        workLocation: Noida
 */ 

/**
 * @swagger
 * tags:
 *   name: Jobs 
 *   description: jobs apis
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
 * /api/v1/job/create-jobs:
 *    post:
 *      summary: create new job
 *      tags: [Jobs]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobs'
 *      responses:
 *        200:
 *          description: jobs created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Jobs'
 *        500:
 *          description: internal serevr error
 */

router.post('/create-jobs',userAuth,createJobController);


/**
 * @swagger
 * /api/v1/job/get-jobs:
 *    get:
 *      summary: get all job
 *      tags: [Jobs]
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        200:
 *          description: jobs created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Jobs'
 *        500:
 *          description: internal serevr error
 */

router.get('/get-jobs',userAuth,getAllJobsController);

/**
 * @swagger
 * /api/v1/job/update-jobs/{id}:
 *    patch:
 *      summary: Update jobs based on id
 *      tags: [Jobs]
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            pattern: "^[0-9a-fA-F]{24}$"
 *          description: ID of the job
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobs'
 *      responses:
 *        200:
 *          description: jobs updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Jobs'
 *        500:
 *          description: internal serevr error
 */

//Update Jobs
router.patch("/update-jobs/:id",userAuth,updateJobsController);

/**
 * @swagger
 * /api/v1/job/delete-jobs/{id}:
 *    delete:
 *      summary: Delete jobs based on id
 *      tags: [Jobs]
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            pattern: "^[0-9a-fA-F]{24}$"
 *          description: ID of the job
 *      responses:
 *        200:
 *          description: jobs deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Jobs'
 *        500:
 *          description: internal serevr error
 */

//DELETE JOBS
router.delete("/delete-jobs/:id",userAuth,deleteJobs)



/**
 * @swagger
 * /api/v1/job/job-stats:
 *    get:
 *      summary: get jobs statistics
 *      tags: [Jobs]
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: createdBy
 *          schema:
 *            type: string
 *          description: User ID for filtering job statistics
 *        - in: query
 *          name: status
 *          schema:
 *            type: string
 *          description: Status for filtering job statistics
 *      responses:
 *        200:
 *          description: jobs statistics
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Jobs'
 *        500:
 *          description: internal serevr error
 */

//Jobs Stats Filter
router.get("/job-stats",userAuth,jobsStatsController)

export default router