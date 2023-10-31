const Order = require("../models/orderModel");
const CustomOrder = require("../models/customOrderModel");

const mongoose = require('mongoose');
const path = require("path");

//Create a new request
const createOrder = async (req, res) => {
    
    const { orderData, timeline } = req.body;

    //console.log(orderData, req.file);
    //add document to DB
    try {
        const filename = req.file.filename;
        const fileURL = path.join(filename);

        const jsonOrderData = JSON.parse(orderData);

        //console.log(jsonOrderData)

        const order = {
            buyerId: jsonOrderData.buyerId,
            buyerUsername: jsonOrderData.buyerUsername,
            sellerId: jsonOrderData.sellerId,
            sellerUsername: jsonOrderData.sellerUsername,
            projectId: jsonOrderData.projectId,
            description: jsonOrderData.description,
            price: jsonOrderData.price,
            requirements: jsonOrderData.requirements,
            timeline: timeline,
        }

        console.log(order);

        if (!mongoose.Types.ObjectId.isValid(order.buyerId) || !mongoose.Types.ObjectId.isValid(order.sellerId) || !mongoose.Types.ObjectId.isValid(order.projectId)) {
            return res.status(404).send({ message: 'Invalid ID' });
        }

        const newOrder = await Order.create(order);
        console.log("New Order Placed Successfully")


        res.status(200).send({ order: newOrder, success: true, message: "Your Order has been placed Successfully!" });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}

//GET all orders of a single buyer
const getBuyerOrders = async (req, res) => {

    const buyerId = req.user._id;

    try {
        const buyerOrders = await Order.find({ buyerId }).sort({ createdAt: -1 });

        res.status(200).send({ buyerOrders, success: true });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }

};

//GET all orders of a single seller
const getSellerOrders = async (req, res) => {

    const sellerId = req.user._id;

    try {
        const sellerOrders = await Order.find({ sellerId }).sort({ createdAt: -1 });

        res.status(200).send({ sellerOrders, success: true });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }

};

//GET all orders of a single seller
const getOrder = async (req, res) => {

    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error("No such Order")
        }
        const order = await Order.findById(id);

        res.status(200).send({ order, success: true });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }

};

module.exports = { createOrder, getBuyerOrders, getSellerOrders, getOrder };