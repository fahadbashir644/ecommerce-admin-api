import {filterSales, getSummary, getCategoriesSummary} from '../Controllers/salesController.js';
import {Router} from 'express';
const router = Router();

router.get('/', filterSales);
router.get('/summary', getSummary);
router.get('/categories-summary', getCategoriesSummary);

export default router;