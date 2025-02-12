import express, { Request, Response } from "express";
import {DoctorAdd, DoctorDelete, DoctorUpdate, getAllDoctors} from "../database/doctor-data-store";
import multer from "multer";

// configure "Multer" for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// define a custom request type that includes multer's file property
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

router.delete("/delete/:doctorId",async (req,res) => {
    const doctorId : string = String(req.params.doctorId);
    try {
        const deletedDoctor = await DoctorDelete(doctorId);
        res.json(deletedDoctor);
    }catch (err){
        console.log("Error deleting doctor",err);
    }
});

router.put("/update/:doctorId", upload.single("doctorImg"), async (req: MulterRequest, res: Response) => {
    const doctorId: string = req.params.doctorId;

    // Extract text fields from form-data
    const { doctorName, specialty, gender, contactNumber, email, departmentId } = req.body;

    // Process the uploaded image file (if provided)
    const doctorImg = req.file ? req.file.buffer.toString("base64") : undefined;

    try {
        const updatedDoctor = await DoctorUpdate(
            doctorId,
            { doctorName, specialty, gender, contactNumber, email, departmentId },
            doctorImg
        );

        res.json({ message: "Doctor updated successfully", updatedDoctor });
    } catch (err) {
        console.error("Error updating doctor:", err);
        res.status(400).json({ error: "Doctor update failed" });
    }
});

router.get("/view",async (req,res) => {
    try {
        const doctors = await getAllDoctors();
        res.json(doctors);
    }catch (err){
        console.log("Error getting doctors",err);
    }
})

export default router;
