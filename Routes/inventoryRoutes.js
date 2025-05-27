import {getInventoryStatus, updateInventory} from '../Controllers/inventoryController.js';
import {Router} from 'express';
const router = Router();

router.get('/status', getInventoryStatus);
router.post('/update', updateInventory);

export default router;