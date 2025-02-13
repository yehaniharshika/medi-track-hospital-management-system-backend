import {PrismaClient} from "@prisma/client";
import MedicalReport from "../model/MedicalReport";

const prisma = new PrismaClient();

export async function MedicalReportAdd(mr : MedicalReport){
    try {
        const newMedicalReport = await prisma.medicalReport.create({
            data: {
                medicalReportId: mr.medicalReportId,
                reportDate: mr.reportDate,
                testResults: mr.testResults,
                notes: mr.notes,
                patientId: mr.patientId,
                patientName: mr.patientName,
                doctorId: mr.doctorId,
            }
        })
        console.log("Medical Report Added: ",newMedicalReport);
        return newMedicalReport;
    }catch (err){
        console.log("Error adding Medical report",err);
    }
}

export async function MedicalReportDelete(medicalReportId:string){
    try {
        const deletedMedicalReport = await prisma.medicalReport.delete({
            where: {medicalReportId: medicalReportId},
        });
        console.log("Medical Report deleted: ",medicalReportId);
        return deletedMedicalReport;
    }catch (err){
        console.log("Error deleting Medical Report ",err);
    }
}

export async function MedicalReportUpdate(medicalReportId:string,mr:MedicalReport){
    try {
        const updatedMedicalReport =  await prisma.medicalReport.update({
            where: {medicalReportId : mr.medicalReportId},
            data: {
                reportDate: mr.reportDate,
                testResults: mr.testResults,
                notes: mr.notes,
                patientId: mr.patientId,
                patientName: mr.patientName,
                doctorId: mr.doctorId
            }
        });
        console.log("Medical Report updated: ",updatedMedicalReport);
        return updatedMedicalReport;
    }catch (err){
        console.log("Error updating Medical Report ",err);
    }
}

export async function getAllMedicalReports(){
    try {
        return await prisma.medicalReport.findMany();
    }catch (err){
        console.log("Error getting Medical Reports from prisma data",err);
    }
}