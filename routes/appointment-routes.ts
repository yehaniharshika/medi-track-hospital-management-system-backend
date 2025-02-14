import express from "express";
import Appointment from "../model/Appointment";
import {
    AppointmentAdd,
    AppointmentDelete,
    AppointmentUpdate,
    getAllAppointments,
} from "../database/appointment-data-store";

const router = express.Router();

router.post("/add",async (req,res) => {
    console.log(req.body);
    const appointment : Appointment = req.body;
    try {
        const addedAppointment = await AppointmentAdd(appointment);
        res.json(addedAppointment);
    }catch (err){
        console.log("Error adding Appointment",err);
        res.status(400).send("Error adding Appointment");
    }
});

router.delete("/delete/:appointmentCode",async (req,res) => {
    const appointmentCode : string = String(req.params.appointmentCode);
    try {
        const deletedAppointment = await AppointmentDelete(appointmentCode);
        res.json(deletedAppointment);
    }catch (err){
        console.log("Error deleting Appointment",err);
    }
});

router.put("/update/:appointmentCode",async (req,res) =>{
    const appointmentCode : string = String(req.params.appointmentCode);
    const appointment : Appointment = req.body;

    try {
        const updatedAppointment = await AppointmentUpdate(appointmentCode,appointment);
        res.json(updatedAppointment);
    }catch (err){
        console.log("Error updating Appointment",err);
    }
});

router.get("/view",async (req,res) => {
    try {
        const appointments = await getAllAppointments();
        res.json(appointments);
    }catch (err){
        console.log("Error getting Appointments",err);
    }
});

export default router;