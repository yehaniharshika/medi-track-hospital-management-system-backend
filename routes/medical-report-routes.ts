import MedicalReport from "../model/MedicalReport";
import {
    getAllMedicalReports,
    MedicalReportAdd,
    MedicalReportDelete,
    MedicalReportUpdate
} from "../database/medical-report-data-store";
import express from "express";

const router = express.Router();

router.post("/add",async(req,res) => {
    console.log(req.body);
    const medicalReport : MedicalReport = req.body;
    try {
        const addedMedicalReport = await MedicalReportAdd(medicalReport);
        res.json(addedMedicalReport);
    }catch (err){
        console.log("Error adding Medical Report",err);
        res.status(400).send("Error adding Medical Report");
    }
});

router.delete("/delete/:medicalReportId",async (req,res) => {
    const medicalReportId : string = String(req.params.medicalReportId);
    try {
        const deletedMedicalReport = await MedicalReportDelete(medicalReportId);
        res.json(deletedMedicalReport);
    }catch (err){
        console.log("Error deleting Medical Report",err);
    }
});

router.put("/update/:medicalReportId",async (req,res) => {
    const medicalReportId:string = String(+req.params.medicalReportId);
    const medicalReport : MedicalReport = req.body;

    try {
        const updatedMedicalReport = await MedicalReportUpdate(medicalReportId,medicalReport);
        res.json(updatedMedicalReport);
    }catch (err){
        console.log("Error updating Medical Report",err);
    }
});

router.get("/view",async (req,res) => {
    try {
        const medicalReports = await getAllMedicalReports();
        res.json(medicalReports);
    }catch (err){
        console.log("Error getting Medical Reports",err);
    }
});
export default router;
