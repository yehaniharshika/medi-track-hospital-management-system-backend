import express, { Request, Response } from "express";
import { DoctorAdd } from "../database/doctor-data-store";
import multer from "multer";

// Configure Multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Define a custom request type that includes multer's file property
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

router.post("/add", upload.single("doctorImg"), async (req: MulterRequest, res: Response) => {
    try {
        const { doctorId, doctorName, specialty, gender, contactNumber, email, departmentId } = req.body;
        const doctorImg = req.file ? req.file.buffer.toString("base64") : "";

        const doctor = await DoctorAdd({
            doctorId,
            doctorName,
            specialty,
            gender,
            contactNumber,
            email,
            departmentId,
            doctorImg
        });

        res.status(201).json({ message: "Doctor added successfully", doctor });
    } catch (error) {
        res.status(400).json({error});
    }
});

export default router;
