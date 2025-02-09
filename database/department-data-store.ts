import {PrismaClient} from "@prisma/client";
import Department from "../model/Department";

const prisma = new PrismaClient();

export async function DepartmentAdd(d : Department) {
    try {
        const newDepartment = await prisma.department.create({
            data: {
                departmentId: d.departmentId,
                departmentName: d.departmentName,
                departmentEmail: d.departmentEmail,
                location: d.location,
                headOfDepartment: d.headOfDepartment,
                phoneNumber: d.phoneNumber,
            }
        })
        console.log("Department Added: ",newDepartment);
        return newDepartment;
    }catch (err){
        console.log("Error adding Department",err);
    }
}

export async function DepartmentDelete(departmentId:string){
    try {
        const deletedDepartment = await prisma.department.delete({
            where: {departmentId: departmentId},
        });
        console.log("Department deleted: ",departmentId);
        return deletedDepartment;
    }catch (err){
        console.log("Error deleting Department ",err);
    }
}

export async function DepartmentUpdate(departmentId:string,d:Department){
    try {
        const updatedDepartment = await prisma.department.update({
            where: {departmentId : d.departmentId},
            data: {
                departmentName: d.departmentName,
                departmentEmail: d.departmentEmail,
                location: d.location,
                headOfDepartment: d.headOfDepartment,
                phoneNumber: d.phoneNumber,
            }
        })
        console.log("Department updated: ",updatedDepartment);
        return updatedDepartment;
    }catch (err){
        console.log("Error updating department",err);
    }
}

export async function getAllDepartments(){
    try {
        return await prisma.department.findMany();
    }catch (err){
        console.log("Error getting departments from prisma data",err);
    }
}