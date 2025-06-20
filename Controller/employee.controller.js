import employee from "../Model/employee.model.js";

//Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    let employees = await employee.find({});
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//create employees
export const createEmployee = async (req, res) => {
  try {
    const { name, dob, salary, location } = req.body;

    if (!name || !dob || !salary || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEmployee = new employee({ name, dob, salary, location });
    const savedEmployee = await newEmployee.save();

    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//update employee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dob, salary, location } = req.body;

    const updatedEmployee = await employee.findByIdAndUpdate(
      id,
      { name, dob, salary, location },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
