import { PrismaClient } from "@prisma/client";
import Doctor from "../model/Doctor";

const prisma = new PrismaClient();

export async function DoctorAdd(doc: Doctor) {
    try {
        // Validate that required fields are not undefined or empty
        if (
            !doc.doctorId ||
            !doc.doctorName ||
            !doc.specialty ||
            !doc.gender ||
            !doc.contactNumber ||
            !doc.email ||
            !doc.departmentId
        ) {
            throw new Error("Missing required fields");
        }

        const newDoctor = await prisma.doctor.create({
            data: {
                doctorId: doc.doctorId,
                doctorName: doc.doctorName,
                specialty: doc.specialty,
                doctorImg: doc.doctorImg || "",
                gender: doc.gender,
                contactNumber: doc.contactNumber,
                email: doc.email,
                departmentId: doc.departmentId
            }
        });

        console.log("Doctor Added: ", newDoctor);
        return newDoctor;
    } catch (err) {
        console.error("Error adding doctor:", err);
        throw err;
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

export async function DoctorUpdate(doctorId: string, doctor: Partial<Doctor>, doctorImg?: string) {
    try {
        const updatedDoctor = await prisma.doctor.update({
            where: { doctorId }, // Ensure doctorId is used for lookup
            data: {
                doctorName: doctor.doctorName,
                specialty: doctor.specialty,
                gender: doctor.gender,
                contactNumber: doctor.contactNumber,
                email: doctor.email,
                departmentId: doctor.departmentId,
                doctorImg: doctorImg ? doctorImg : doctor.doctorImg // Update image only if provided
            }
        });
        console.log("Doctor updated: ",updatedDoctor);
        return updatedDoctor;
    } catch (error) {
        console.error("Error updating doctor:", error);
        throw new Error("Doctor update failed");
    }
}

export async function getAllDoctors(){
    try {
        return await prisma.doctor.findMany();
    }catch (err){
        console.log("Error getting doctors from prisma data",err);
    }
}
