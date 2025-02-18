import {PrismaClient} from "@prisma/client";
import Patient from "../model/Patient";


const prisma = new PrismaClient();

export async function PatientAdd(p:Patient){
    try {

        const newPatient = await prisma.patient.create({
            data: {
                patientId: p.patientId,
                patientName: p.patientName,
                age: p.age,
                patientImg: p.patientImg,
                addressLine1: p.addressLine1,
                addressLine2: p.addressLine2,
                postalCode: p.postalCode,
                gender: p.gender,
                contactNumber: p.contactNumber,
                blood_type: p.blood_type,
                chronic_diseases: p.chronic_diseases,
                last_visit_date: p.last_visit_date
            }
        });
        console.log("Patient Added: ",newPatient);
    }catch (err){
        console.log("Error adding Patient",err);
        throw err;
    }
}

export async function PatientUpdate(patientId: string, patient: Partial<Patient>,patientImg?: string){
    try {
        const updatedPatient = await prisma.patient.update({
            where: {patientId},
            data: {
                patientName: patient.patientName,
                age: patient.age,
                addressLine1: patient.addressLine1,
                addressLine2: patient.addressLine2,
                postalCode: patient.postalCode,
                gender: patient.gender,
                contactNumber: patient.contactNumber,
                blood_type: patient.blood_type,
                chronic_diseases: patient.chronic_diseases,
                last_visit_date: patient.last_visit_date,
                patientImg: patientImg ? patientImg : patient.patientImg

            }
        });
        console.log("Patient updated: ",updatedPatient);
    }catch (err){
        console.log("Error updating patient",err);
    }
}

export async function PatientDelete(patientId:string){
    try {
        const deletedPatient = await prisma.patient.delete({
            where: {patientId: patientId},
        });
        console.log("Patient deleted: ",patientId);
        return deletedPatient;
    }catch (err){
        console.log("Error deleting Patient",err);
    }
}

export async function getAllPatients(){
    try {
        return await prisma.patient.findMany();
    }catch (err) {
        console.log("Error getting nurses",err);
    }
}

