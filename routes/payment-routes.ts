import express from "express";
import {getTotalIncome, PaymentCreate} from "../database/payment-data-store";
import {authenticateToken} from "./auth-routes";

const router = express.Router();

router.post("/create",authenticateToken,async (req,res) => {
    console.log(req.body);
    const payment = req.body;

    try {
        const createdPayment = await PaymentCreate(payment);
        res.json(createdPayment);

    } catch (err) {
        console.error("Error creating Payment:", err);
        res.status(500).json({ error: "Error adding Payment" });
    }
});

router.get("/total-income", async (req, res) => {
    try {
        const income = await getTotalIncome();
        res.json({ totalIncome: income });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch total income" });
    }
});

export default router;
