const express = require("express");
const {
  childArray,
} = require("../MiddleWares/validations/childernsValidation");
const validator = require("../MiddleWares/validations/validator");

const childernsController = require("../controllers/childernsController");

const router = express.Router();
const isAuth = require("./../MiddleWares/authrMW");
const { isAdmin } = require("./../MiddleWares/authrMW");
// Routes for CRUD operations on children
router
  .route("/childerns")
  .all(isAuth)
  /**
   * @swagger
   * /childerns:
   *   get:
   *     description: Returns all childerns
   *     responses:
   *       200:
   *         description: A list of childerns
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '../models/childSchema.json'
   */
  .get(isAdmin, childernsController.getAllChilderns)
  /**
   * @swagger
   * /childerns:
   *   post:
   *     summary: Add a new child
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *           $ref: '../models/childSchema.json'
   *     responses:
   *       201:
   *         description: Child added successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '../models/childSchema.json'
   */
  .post(isAdmin, childArray, validator, childernsController.addChild)
  /**
   * @swagger
   * /childerns:
   *   put:
   *     summary: Update an existing child
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '../models/childSchema.json'
   *     responses:
   *       200:
   *         description: Child updated successfully
   *         content:
   *           application/json:
   *             schema:
   *                $ref: '../models/childSchema.json'
   */
  .put(isAdmin, childernsController.updateChild)
  /**
   * @swagger
   * /childerns:
   *   delete:
   *     summary: Delete child by id
   *     responses:
   *       204:
   *         description: Children deleted successfully
   */
  .delete(isAdmin, childernsController.deleteChild);

// Route for finding a child by ID
/**
 * @swagger
 * /api/childerns/{id}:
 *   get:
 *     summary: Get a child by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the child to get
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '../models/childSchema.json'
 *       404:
 *         description: Child not found
 */
router.get("/childerns/:id", isAdmin, childernsController.findChildById);

module.exports = router;
