const express = require('express');
const requireAuth = require('../middleware/requireAuthentication');

const { upload } = require("../multer");

const router = express.Router();

//require authorization before firing all other routes
router.use(requireAuth);

const { createOrder, getBuyerOrders, getSellerOrders, getOrder } = require("../controllers/orderController")

//create order
router.post("/create", upload.single("file"), createOrder);

//GET all orders placed by authenticated buyer
router.get('/buyer', getBuyerOrders);

//GET all orders recieved by authenticated seller
router.get('/seller', getSellerOrders);

//GET a single order
router.get('/:id', getOrder);

module.exports = router;