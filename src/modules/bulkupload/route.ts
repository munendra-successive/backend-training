import { Router } from 'express';
import multer, { type Multer } from 'multer';
import Controller from './controller';

const router: Router = Router();
const upload: Multer = multer({ dest: 'uploads/' }); // Set destination folder for file uploads

router.route('/upload').post(upload.single('csvFile'), Controller.uploadCsv);

router.route('/get').get(Controller.getAll);

export default router;
