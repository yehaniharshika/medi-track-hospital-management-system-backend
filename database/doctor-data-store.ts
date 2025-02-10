import { PrismaClient } from "@prisma/client";
import Doctor from "../model/Doctor";

const prisma = new PrismaClient();

export async function DoctorAdd(doc: Doctor) {
    try {
        const newDoctor = await prisma.doctor.create({
            data: {
                doctorId: doc.doctorId,
                doctorName: doc.doctorName,
                specialty: doc.specialty,
                doctorImg: doc.doctorImg,
                gender: doc.gender,
                contactNumber: doc.contactNumber,
                email: doc.email,
                departmentId: doc.departmentId
            }
        });
        console.log("Doctor Added: ",newDoctor);
        return newDoctor;
    } catch (err) {
        console.error("Error adding doctor:", err);
    }
}

export async function DoctorDelete(doctorId:string){
    try {
        const deletedDoctor = await prisma.doctor.delete({
            where: {doctorId: doctorId},
        });
        console.log("Doctor deleted: ",doctorId);
        return deletedDoctor;
    }catch (err){
        console.log("Error deleting Doctor ",err);
    }
}

export async function DoctorUpdate(doctorId:string,doc:Doctor){
    try {
        const updatedDoctor = await prisma.doctor.update({
            where: {doctorId: doc.doctorId},
            data: {
                doctorName: doc.doctorName,
                specialty: doc.specialty,
                doctorImg: doc.doctorImg,
                gender: doc.gender,
                contactNumber: doc.contactNumber,
                email: doc.email,
                departmentId: doc.departmentId
            }
        })
        console.log("Doctor updated: ",updatedDoctor);
        return updatedDoctor;
    }catch (err){
        console.log("Error updating doctor",err);
    }
}

export async function getAllDoctors(){
    try {
        return await prisma.doctor.findMany();
    }catch (err){
        console.log("Error getting doctors from prisma data",err);
    }
}
