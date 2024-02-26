const express = require("express");
const classController = require("./../controllers/classController");
const { classArray } = require("../MiddleWares/validations/classValidations");
const validator = require("../MiddleWares/validations/validator");
const router = express.Router();

router
  .route("/class")
  /**
   * @swagger
   * /class:
   *   get:
   *     description: Returns all classes
   *     responses:
   *       200:
   *         description: A list of classes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '../models/ClassSchema.json'
   */
  .get(classController.getAllClasses)
  /**
   * @swagger
   * /class:
   *   post:
   *     description: insert class
   *     responses:
   *       200:
   *         description: insert class
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '../models/ClassSchema.json'
   */
  .post(classArray, validator, classController.insertClass)
  /**
   * @swagger
   * /class:
   *   put:
   *     description: Update a class
   *     responses:
   *       200:
   *         description: Updated class
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  .put(classController.updateClass)
  /**
   * @swagger
   * /class:
   *   delete:
   *     description: delete class
   *     responses:
   *       200:
   *         description: delete class
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  .delete(classController.deleteClass);

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     description: Get a class by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to get
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/ClassSchema.json'
 *       404:
 *         description: Class not found
 */
router.get("/class/:id", classController.getClassById);
/**
 * @swagger
 * /class/{id}:
 *   delete:
 *     description: Delete a class by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to delete
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Class deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Class not found
 */
router.delete("/class/:id", classController.deleteClassById);
/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     description: Get child information for a class
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to get child information for
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../models/ChildSchema.json'
 *       404:
 *         description: Class not found or no children associated
 */
router.get("/class/child/:id", classController.getClassChildInfo);
/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     description: Get teacher information for a class
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to get teacher information for
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../models/TeacherSchema.json'
 *       404:
 *         description: Class not found or no teacher associated
 */
router.get("/class/teacher/:id", classController.getClassTeacherInfo);
module.exports = router;
