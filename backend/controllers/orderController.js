const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
        .populate('items.product');

        if (!cart || cart.items.lenght === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        const orderItems = cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            priceAtPurchase: item.product.price,
        }));

        const totalAmount = orderItems.reduce((total, item) => {
            return total + item.priceAtPurchase * item.quantity;
        }, 0);

        const order = new Order({
            user: req.user._id,
            items: orderItems,
            totalAmount,
        });

        const savedOrder = await order.save();

        cart.items = [];
        await cart.save();

        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        .populate('items.product')
        .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOneOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate('items.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorize' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate('items.product')
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        const savedOrder = await order.save();

        res.json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getOneOrder,
    getAllOrders,
    updateOrderStatus,
};