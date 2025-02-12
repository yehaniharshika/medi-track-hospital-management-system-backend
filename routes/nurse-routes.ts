import express, {Request, Response} from "express";
import multer from "multer";
import {DoctorAdd} from "../database/doctor-data-store";
import {NurseAdd} from "../database/nurse-data-store";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

router.post("/add", upload.single("nurseImg"), async (req: MulterRequest, res: Response) => {
    try {
        const { nurseId, nurseName, gender, contactNumber, qualification, email, departmentId } = req.body;
        const nurseImg = req.file ? req.file.buffer.toString("base64") : "";

        const nurse = await NurseAdd({
            nurseId,
            nurseName,
            gender,
            contactNumber,
            qualification,
            email,
            departmentId,
            nurseImg
        });

        res.status(201).json({ message: "Nurse added successfully", nurse });
    } catch (error) {
        res.status(400).json({error});
    }
});

export default router;