import {PrismaClient} from "@prisma/client";
import Nurse from "../model/Nurse";

const prisma = new PrismaClient();

export async function NurseAdd(n:Nurse){
    try {
        const newNurse = await prisma.nurse.create({
            data: {
                nurseId: n.nurseId,
                nurseName: n.nurseName,
                nurseImg: n.nurseImg || "",
                gender: n.gender,
                contactNumber: n.contactNumber,
                qualification: n.qualification,
                email: n.email,
                departmentId: n.departmentId
            }
        });

        console.log("Nurse Added: ",newNurse);
        return newNurse;
    }catch (err){
        console.error("Error adding nurse:", err);
        throw err;
    }
}

export async function NurseUpdate(nurseId: string, nurse: Partial<Nurse>, nurseImg?: string){
    try {
        const updatedNurse = await prisma.nurse.update({
            where: {nurseId},
            data: {
                nurseName: nurse.nurseName,
                gender: nurse.gender,
                contactNumber: nurse.contactNumber,
                qualification: nurse.qualification,
                email: nurse.email,
                departmentId: nurse.departmentId,
                nurseImg: nurseImg ? nurseImg : nurse.nurseImg
            }
        });
        console.log("Nurse updated: ",updatedNurse);
        return updatedNurse;
    }catch (err){
        console.log("Error updating nurse: ",err);
    }
}

export async function NurseDelete(nurseId:string){
    try {
        const deletedNurse = await prisma.nurse.delete({
            where: {nurseId: nurseId},
        });
        console.log("Nurse deleted: ",nurseId);
        return deletedNurse;
    }catch (err) {
        console.log("Error deleting Nurse ",err);
    }
}

export async function getAllNurses(){
    try {
        return await prisma.nurse.findMany();
    }catch (err) {
        console.log("Error getting nurses",err);
    }
}

