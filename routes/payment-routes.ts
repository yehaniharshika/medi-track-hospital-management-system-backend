import express from "express";
import {PaymentCreate} from "../database/payment-data-store";

const router = express.Router();

router.post("/create",async (req,res) => {
    console.log(req.body);
    const payment = req.body;

    try {
        const createdPayment = await PaymentCreate(payment);
        res.json(createdPayment);

    } catch (err) {
        console.error("Error creating Payment:", err);
        res.status(500).json({ error: "Error adding Payment" });
    }
})

export default router;
