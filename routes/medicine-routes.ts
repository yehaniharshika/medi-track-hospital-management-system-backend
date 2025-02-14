import multer from "multer";
import express, {Request, Response} from "express";
import {MedicineAdd} from "../database/medicine-data-store";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

router.post("/add", upload.single("medicineImg"), async (req: MulterRequest, res: Response) => {
    try {
        const { medicineId, medicineName, brand, dosage_form, unit_price, quantity_in_stock, expiry_date } = req.body;
        const medicineImg = req.file ? req.file.buffer.toString("base64") : "";

        const medicine = await MedicineAdd({
            medicineId,
            medicineName,
            brand,
            dosage_form,
            unit_price,
            quantity_in_stock,
            expiry_date,
            medicineImg
        });

        res.status(201).json({ message: "medicine added successfully", medicine });
    } catch (error) {
        res.status(400).json({error});
    }
});

export default router;

