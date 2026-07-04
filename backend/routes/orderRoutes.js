const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getMyOrders,
    getOneOrder,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, placeOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOneOrder);
router.get('/', protect, getAllOrders);
router.put('/:id', protect, updateOrderStatus);

module.exports = router;