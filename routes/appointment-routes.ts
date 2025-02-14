import express from "express";
import Appointment from "../model/Appointment";
import {AppointmentAdd} from "../database/appointment-data-store";

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

export default router;