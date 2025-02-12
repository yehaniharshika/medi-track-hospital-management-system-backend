import express, {Request, Response} from "express";
import multer from "multer";
import {getAllNurses, NurseAdd, NurseDelete, NurseUpdate} from "../database/nurse-data-store";

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

router.delete("/delete/:nurseId",async (req,res) => {
    const nurseId : string = String(req.params.nurseId);
    try {
        const deletedNurse = await NurseDelete(nurseId);
        res.json(deletedNurse);
    }catch (err){
        console.log("Error deleting nurse",err);
    }
});

router.put("/update/:nurseId", upload.single("nurseImg"), async (req: MulterRequest, res: Response) => {
    const nurseId: string = req.params.nurseId;

    const { nurseName, gender, contactNumber, qualification, email, departmentId } = req.body;

    const nurseImg = req.file ? req.file.buffer.toString("base64") : undefined;

    try {
        const updatedNurse = await NurseUpdate(
            nurseId,
            { nurseName, gender, contactNumber,qualification, email, departmentId },
            nurseImg
        );

        res.json({ message: "Nurse updated successfully", updatedNurse });
    } catch (err) {
        console.error("Error updating nurse:", err);
        res.status(400).json({ error: "Nurse update failed" });
    }
});

router.get("/view",async (req,res) => {
    try {
        const nurses = await getAllNurses();
        res.json(nurses);
    }catch (err){
        console.log("Error getting nurses",err);
    }
})
export default router;