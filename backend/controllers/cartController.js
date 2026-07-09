const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        const saveCart = await cart.save();
        res.json(saveCart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
        .populate('items.product');

        if (!cart) {
            return res.json({ items: [] });
        }

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user._id });
        if(!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        const saveCart = await cart.save();
        res.json(saveCart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if(!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        const savedCart = await cart.save();
        res.json({ message: 'Cart cleared', cart: savedCart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
};