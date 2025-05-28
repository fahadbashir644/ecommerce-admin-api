import registerProduct from '../Controllers/productController.js';
import {Router} from 'express';
const router = Router();

router.post('/register', registerProduct);

export default router;