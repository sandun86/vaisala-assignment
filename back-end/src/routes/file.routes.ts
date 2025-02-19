import { Router } from "express";
import { container } from '../inversify.config';
import { FileController } from "../controllers/file.controller";
import multer from "multer";
import fileValidator from "../validators/file.validator";
import { authHandler } from "../middleware/authenticate.middleware";

// Set up Multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('uploadFile');

const router = Router();
const fileController = container.get<FileController>(FileController);

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Upload a JSON file
 *     parameters:
  *       - in: header
 *         name: x-api-key
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication key for the frontend
 *       - in: header
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the frontend unique identifier
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               uploadFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: JSON file uploaded successfully
 *       400:
 *         description: Invalid JSON file or no file uploaded
 *       403:
 *         description: Authentication failed
 *       500:
 *         description: Server error
 */



router.post("/upload", authHandler, upload, fileValidator.uploadRequest, fileController.upload);


/**
 * @swagger
 * /file/switch-temperature:
 *   get:
 *     summary: Switch temperature data
 *     description: Converts an amount from one currency to another using exchange rates.
 *     parameters:
 *       - in: header
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the frontend unique identifier
 *       - in: query
 *         name: from_unit
 *         schema:
 *           type: number
 *         required: true
 *         description: from unit
 *         example: 1
 *       - in: query
 *         name: to_unit
 *         schema:
 *           type: number
 *         required: true
 *         description: to unit
 *         example: 2
 *     responses:
 *       200:
 *         description: Temperature data switch successfully
 *       400:
 *         description: Invalid input data
 *       403:
 *         description: Authentication failed
 *       404:
 *         description: Temperature data are not available
 *       500:
 *         description: Server error
 */

router.get("/switch-temperature", fileController.switchTemperature);




export default router;
