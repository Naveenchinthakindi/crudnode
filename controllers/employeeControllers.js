const Employee = require("../models/Employee");

//POST

const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, city } = req.body;

    console.log("req body ", req.body);

    const employee = new Employee({ name, email, phone, city });
    await employee.save(); //it can save the data in database
    res.status(201).json(employee);
  } catch (error) {
    console.log("there is an error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//GET

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.log("there is Error ", error);
    res.status(500).json({ message: "server Error" });
  }
};

//GET SINGLE

const singleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res
        .status(404)
        .json({ message: "No Employee found with this ID" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("there is a error ", error);
    res.status(500).json({ message: "Error getting the Employee" });
  }
};

//PUT or PATCH
const updateEmployee = async (req, res) => {
  try {
    const { name, email, phone, city } = req.body;
    console.log("body ", req.body);
    const myEmployee = await Employee.findByIdAndUpdate(req.params.id, {
      name,
      email,
      phone,
      city,
    });
    if (!myEmployee) {
      return res.status(404).json({ message: "employee not found" });
    }
    res.status(200).json(myEmployee);
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ message: "server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    console.log("req.body");
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log("error deleting employee ", error);
    res.status(500).json({ message: "server Error" });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  singleEmployee,
  updateEmployee,
  deleteEmployee,
};
