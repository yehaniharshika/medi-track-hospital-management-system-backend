import {PrismaClient} from "@prisma/client";
import Medicine from "../model/Medicine";

const prisma = new PrismaClient();

export async function MedicineAdd(m:Medicine){
    try {
        const newMedicine = await prisma.medicine.create({
            data: {
                medicineId: m.medicineId,
                medicineName: m.medicineName,
                brand: m.brand,
                medicineImg: m.medicineImg || "",
                dosage_form: m.dosage_form,
                unit_price: m.unit_price,
                quantity_in_stock: parseInt(m.quantity_in_stock.toString()),
                expiry_date: m.expiry_date
            }
        });
        console.log("Medicine Added: ",newMedicine);
        return newMedicine;
    }catch (err){
        console.log("Error adding Medicine",err);
    }
}

export async function MedicineUpdate(medicineId: string, medicine: Partial<Medicine>, medicineImg?: string) {
    try {
        const updatedMedicine = await prisma.medicine.update({
            where: { medicineId },
            data: {
                medicineName: medicine.medicineName,
                brand: medicine.brand,
                dosage_form: medicine.dosage_form,
                unit_price: medicine.unit_price,
                quantity_in_stock: medicine.quantity_in_stock
                    ? Number(medicine.quantity_in_stock)
                    : undefined, // Convert to number
                expiry_date: medicine.expiry_date,
                medicineImg: medicineImg ? medicineImg : medicine.medicineImg
            }
        });

        console.log("Medicine updated: ", updatedMedicine);
        return updatedMedicine;
    } catch (err) {
        console.log("Error updating Medicine", err);
    }
}



export async function MedicineDelete(medicineId:string){
    try {
        const deletedMedicine = await prisma.medicine.delete({
            where: {medicineId: medicineId},
        });
        console.log("Medicine deleted: ",medicineId);
        return deletedMedicine;
    }catch (err){
        console.log("Error deleting Medicine ",err);
    }
}

export async function getAllMedicines(){
    try {
        return await prisma.medicine.findMany();
    }catch (err){
        console.log("Error getting Medicines",err);
    }
}