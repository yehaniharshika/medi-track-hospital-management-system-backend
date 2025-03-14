import express from "express";
import Appointment from "../model/Appointment";
import {
    AppointmentAdd,
    AppointmentDelete,
    AppointmentUpdate,
    getAllAppointments, getAppointmentsCount,
} from "../database/appointment-data-store";
import {authenticateToken} from "./auth-routes";
import {getDoctorsCount} from "../database/doctor-data-store";

const router = express.Router();

router.post("/add",authenticateToken,async (req,res) => {
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

router.delete("/delete/:appointmentCode",authenticateToken ,async (req,res) => {
    const appointmentCode : string = String(req.params.appointmentCode);
    try {
        const deletedAppointment = await AppointmentDelete(appointmentCode);
        res.json(deletedAppointment);
    }catch (err){
        console.log("Error deleting Appointment",err);
    }
});

router.put("/update/:appointmentCode",authenticateToken,async (req,res) =>{
    const appointmentCode : string = String(req.params.appointmentCode);
    const appointment : Appointment = req.body;

    try {
        const updatedAppointment = await AppointmentUpdate(appointmentCode,appointment);
        res.json(updatedAppointment);
    }catch (err){
        console.log("Error updating Appointment",err);
    }
});

router.get("/view",authenticateToken,async (req,res) => {
    try {
        const appointments = await getAllAppointments();
        res.json(appointments);
    }catch (err){
        console.log("Error getting Appointments",err);
    }
});

router.get("/appointment-count",authenticateToken,async (req,res) => {
    try {
        const appointmentsCount = await getAppointmentsCount();
        res.status(200).json(appointmentsCount);
    }catch (err){
        res.status(500).json({ error: "Failed to get appointments count" });
    }
});

export default router;