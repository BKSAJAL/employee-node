import express from "express";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../Controller/employee.controller.js";
const router = express.Router();

//Get all employees
router.get("/", getAllEmployees);

//Create employee
router.post("/", createEmployee);

//Update employee
router.put("/:id", updateEmployee);

//Delete employee
router.delete("/:id", deleteEmployee);

export default router;
