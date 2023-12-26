import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobsController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         company:
 *           type: string
 *           description: The name of the company offering the job.
 *         position:
 *           type: string
 *           description: The position or title of the job.
 *         status:
 *           type: string
 *           enum: [pending, reject, interview]
 *           default: pending
 *           description: The status of the job application.
 *         workType:
 *           type: string
 *           enum: [full-time, part-time, internship, contract]
 *           default: full-time
 *           description: The type of work for the job.
 *         workLocation:
 *           type: string
 *           default: Hyderabad
 *           description: The location where the job is based.
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the job.
 *       required:
 *         - company
 *         - position
 *         - workLocation
 *       example:
 *         company: Example Company
 *         position: Software Engineer
 *         status: pending
 *         workType: full-time
 *         workLocation: Hyderabad
 *         createdBy: user_id
 */



/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API endpoints for managing job applications
 */


//router
//CREATE JOB || POST
/**
 * @swagger
 * /api/jobs/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       '201':
 *         description: Job created successfully
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized (missing or invalid token)
 *       '500':
 *         description: Internal server error
 */
router.post('/create-job',userAuth,createJobController)

//GET JOBS || POST
/**
 * @swagger
 * /api/jobs/get-jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       '401':
 *         description: Unauthorized (missing or invalid token)
 *       '500':
 *         description: Internal server error
 */
router.get('/get-jobs',userAuth,getAllJobsController)

//UPDATE JOBS || PUT || PATCH
/**
 * @swagger
 * /api/jobs/update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the job to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       '200':
 *         description: Job updated successfully
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized (missing or invalid token)
 *       '404':
 *         description: Job not found
 *       '500':
 *         description: Internal server error
 */
router.patch('/update-job/:id',userAuth,updateJobController)

//DELETE JOBS || DELETE
/**
 * @swagger
 * /api/jobs/delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the job to delete
 *     responses:
 *       '200':
 *         description: Job deleted successfully
 *       '401':
 *         description: Unauthorized (missing or invalid token)
 *       '404':
 *         description: Job not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/delete-job/:id',userAuth,deleteJobController)

//JOBS STATS FILTER || GET
/**
 * @swagger
 * /api/jobs/job-stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJobs:
 *                   type: integer
 *                 pendingJobs:
 *                   type: integer
 *                 interviewJobs:
 *                   type: integer
 *                 rejectedJobs:
 *                   type: integer
 *       '401':
 *         description: Unauthorized (missing or invalid token)
 *       '500':
 *         description: Internal server error
 */

router.get('/job-stats',userAuth,jobStatsController)

export default router