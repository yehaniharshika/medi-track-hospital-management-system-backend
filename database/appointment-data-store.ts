import {PrismaClient} from "@prisma/client";
import Appointment from "../model/Appointment";


const prisma = new PrismaClient();

export async function AppointmentAdd(app : Appointment) {
    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                appointmentCode: app.appointmentCode,
                appointmentDate: app.appointmentDate,
                appointmentTime: app.appointmentTime,
                patientId: app.patientId,
                doctorId: app.doctorId,
                appointmentType: app.appointmentType,
                appointmentStatus: app.appointmentStatus
            }
        })
        console.log("Appointment Added: ",newAppointment);
        return newAppointment;
    }catch (err){
        console.log("Error adding Appointment",err);
    }
}

export async function AppointmentDelete(appointmentCode:string){
    try {
        const deletedAppointment = await prisma.appointment.delete({
            where: {appointmentCode: appointmentCode},
        });
        console.log("Appointment deleted: ",deletedAppointment);
        return deletedAppointment;
    }catch (err){
        console.log("Error deleting Appointment ",err);
    }
}

export async function AppointmentUpdate(appointmentCode:string,app:Appointment){
    try {
        const updatedAppointment = await prisma.appointment.update({
            where: {appointmentCode : app.appointmentCode},
            data: {
                appointmentDate: app.appointmentDate,
                appointmentTime: app.appointmentTime,
                patientId: app.patientId,
                doctorId: app.doctorId,
                appointmentType: app.appointmentType,
                appointmentStatus: app.appointmentStatus
            }
        });
        console.log("Appointment updated: ",updatedAppointment);
        return updatedAppointment;
    }catch (err){
        console.log("Error updating Appointment");
    }
}

export async function getAllAppointments(){
    try {
        return await prisma.appointment.findMany();
    }catch (err){
        console.log("Error getting Appointments from prisma data",err);
    }
}
