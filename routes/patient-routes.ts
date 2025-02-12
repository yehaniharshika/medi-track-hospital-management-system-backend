import multer from "multer";
import express, {Request, Response} from "express";
import {PatientAdd, PatientUpdate} from "../database/patient-data-store";
import {NurseUpdate} from "../database/nurse-data-store";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

router.post("/add", upload.single("patientImg"), async (req: MulterRequest, res: Response) => {
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

router.put("/update/:patientId", upload.single("patientImg"), async (req: MulterRequest, res: Response) => {
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

export default router;
