import express from "express";
import Department from "../model/Department";
import {DepartmentAdd, DepartmentDelete, DepartmentUpdate, getAllDepartments} from "../database/department-data-store";

const router = express.Router();

router.post("/add",async(req,res) => {
    console.log(req.body);
    const department : Department = req.body;
    try {
        const addedDepartment = await DepartmentAdd(department);
        res.json(addedDepartment);
    }catch (err){
        console.log("Error adding department",err);
        res.status(400).send("Error adding department");
    }
});

router.delete("/delete/:departmentId",async (req,res) => {
    const departmentId : string = String(req.params.departmentId);
    try {
        const deletedDepartment = await DepartmentDelete(departmentId);
        res.json(deletedDepartment);
    }catch (err){
        console.log("Error deleting department",err);
    }
});

router.put("/update/:departmentId",async (req,res) => {
    const departmentId:string = String(+req.params.departmentId);
    const department : Department = req.body;

    try {
        const updatedDepartment = await DepartmentUpdate(departmentId,department);
        res.json(updatedDepartment);
    }catch (err){
        console.log("Error updating department",err);
    }
});

router.get("/view",async (req,res) => {
    try {
        const departments = await getAllDepartments();
        res.json(departments);
    }catch (err){
        console.log("Error getting departments",err);
    }
});
export default router;