import multer from "multer";
import express, {Request, Response} from "express";
import {getAllMedicines, MedicineAdd, MedicineDelete, MedicineUpdate} from "../database/medicine-data-store";

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

router.put("/update/:medicineId", upload.single("medicineImg"), async (req: MulterRequest, res: Response) => {
    const medicineId: string = req.params.medicineId;

    const { medicineName, brand, dosage_form, unit_price, quantity_in_stock, expiry_date } = req.body;
    const medicineImg = req.file ? req.file.buffer.toString("base64") : undefined;


    try {
        const updatedMedicine = await MedicineUpdate(
            medicineId,
            { medicineName, brand, dosage_form,unit_price, quantity_in_stock, expiry_date },
            medicineImg
        );

        res.json({ message: "Medicine updated successfully", updatedMedicine });
    } catch (err) {
        console.error("Error updating Medicine:", err);
        res.status(400).json({ error: "Medicine update failed" });
    }
});

router.delete("/delete/:medicineId",async (req,res) => {
    const medicineId : string = String(req.params.medicineId);
    try {
        const deletedMedicine = await MedicineDelete(medicineId);
        res.json(deletedMedicine);
    }catch (err){
        console.log("Error deleting Medicine",err);
    }
});

router.get("/view",async (req,res) => {
    try {
        const medicines = await getAllMedicines();
        res.json(medicines);
    }catch (err){
        console.log("Error getting medicines",err);
    }
});
export default router;

