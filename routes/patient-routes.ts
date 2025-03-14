import multer from "multer";
import express, {Request, Response} from "express";
import {getAllPatients, getPatientsCount, PatientAdd, PatientDelete, PatientUpdate} from "../database/patient-data-store";
import {authenticateToken} from "./auth-routes";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

router.post("/add",authenticateToken, upload.single("patientImg"), async (req: MulterRequest, res: Response) => {
    try {
        const { patientId, patientName, age, addressLine1, addressLine2, postalCode, gender, contactNumber, blood_type, chronic_diseases, last_visit_date } = req.body;
        const patientImg = req.file ? req.file.buffer.toString("base64") : "";

        const patient = await PatientAdd({
            patientId,
            patientName,
            age,
            addressLine1,
            addressLine2,
            postalCode,
            gender,
            contactNumber,
            blood_type,
            chronic_diseases,
            last_visit_date,
            patientImg
        });

        res.status(201).json({ message: "Patient added successfully", patient });
    } catch (error) {
        res.status(400).json({error});
    }
});

router.put("/update/:patientId", authenticateToken,upload.single("patientImg"), async (req: MulterRequest, res: Response) => {
    const patientId: string = req.params.patientId;

    const { patientName, age, addressLine1, addressLine2, postalCode, gender, contactNumber, blood_type, chronic_diseases, last_visit_date  } = req.body;

    const patientImg = req.file ? req.file.buffer.toString("base64") : undefined;

    try {
        const updatedPatient = await PatientUpdate(
            patientId,
            { patientName,age,addressLine1,addressLine2,postalCode, gender, contactNumber,blood_type,chronic_diseases,last_visit_date  },
            patientImg
        );

        res.json({ message: "patient updated successfully", updatedPatient });
    } catch (err) {
        console.error("Error updating patient:", err);
        res.status(400).json({ error: "Patient update failed" });
    }
});

router.delete("/delete/:patientId",authenticateToken,async (req,res) => {
    const patientId : string = String(req.params.patientId);
    try {
        const deletedPatient = await PatientDelete(patientId);
        res.json(deletedPatient);
    }catch (err) {
        console.log("Error deleting patient",err);
    }
});

router.get("/view",authenticateToken ,async (req,res) => {
    try {
        const patients = await getAllPatients();
        res.json(patients);
    }catch (err) {
        console.log("Error getting patients",err);
    }
});

router.get("/patient-count",authenticateToken,async (req,res) => {
    try {
        const patientsCount = await getPatientsCount();
        res.status(200).json(patientsCount);
    }catch (err){
        res.status(500).json({ error: "Failed to get patient count" });
    }
});

export default router;
