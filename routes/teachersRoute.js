const express = require("express");
const upload = require("../MiddleWares/multerConfig");
const teacherController = require("../controllers/teacherController");
const {
  teacherArray,
} = require("../MiddleWares/validations/teacherValidation");
const validator = require("../MiddleWares/validations/validator");

const router = express.Router();

const isAuth = require("./../MiddleWares/authrMW");
const { isTeacher } = require("./../MiddleWares/authrMW");
router
  .route("/teachers")
  /**
   * @swagger
   * /teachers:
   *   get:
   *     description: Returns all teachers
   *     responses:
   *       200:
   *         description: A list of teachers
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '../models/teacherSchema.json'
   */
  .get(teacherController.getAllTeachers)
  /**
   * @swagger
   * /teachers:
   *   post:
   *     description: add new teacher
   *     responses:
   *       200:
   *         description: add a new teacher
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '../models/teacherSchema.json'
   */
  .post(
    teacherArray,
    validator,
    upload.single("image"),
    teacherController.addTeacher
  )
  /**
   * @swagger
   * /teachers:
   *   put:
   *     description: update teacher
   *     parameters:
   *       - in: path
   *         name: id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Teacher'
   *     responses:
   *       200:
   *         description: update teacher
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '../models/teacherSchema.json'
   */
  .put(isAuth, isTeacher, teacherController.updateTeacher)
  /**
   * @swagger
   * /teachers:
   *   delete:
   *     parameters:
   *       - in: path
   *         name: id
   *     description: delete teacher
   *     responses:
   *       200:
   *         description: delete  teacher
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '../models/teacherSchema.json'
   */
  .delete(isAuth, teacherController.deleteTeacher);

// Change password route
/**
 * @swagger
 * /api/teachers/password:
 *   put:
 *     description: change password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/teacherSchema.json'
 *       404:
 *         description: Teacher not found
 */

/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher to get
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '../models/teacherSchema.json'
 *       404:
 *         description: Teacher not found
 */
router.get("/teachers/:id", teacherController.findTeacherById);

module.exports = router;
