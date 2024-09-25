import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Navbar";

// InputField Component
const InputField = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className="border p-2 rounded mb-2 w-full"
  />
);

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([
    {
      id: uuidv4(),
      image: "https://via.placeholder.com/50",
      name: "John Doe",
      email: "john@example.com",
      mobile: "123-456-7890",
      designation: "Developer",
      gender: "Male",
      course: "React Basics",
      createdDate: new Date().toLocaleDateString(),
    },
    {
      id: uuidv4(),
      image: "https://via.placeholder.com/50",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "987-654-3210",
      designation: "Designer",
      gender: "Female",
      course: "UI/UX Design",
      createdDate: new Date().toLocaleDateString(),
    },
    // Additional sample data for pagination
  ]);

  const [image, setImage] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });
  const [error, setError] = useState("");
  const [sortCriterion, setSortCriterion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Toggle Form Visibility
  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
    if (isFormVisible) {
      resetForm(); // Reset the form when hiding it
    }
  };

  // Reset Form
  const resetForm = () => {
    setIsEditing(false);
    setEditingEmployee(null);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      designation: "",
      gender: "",
      course: "",
    });
    setImage(null); // Clear image on reset
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Add Employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.designation ||
      !formData.gender ||
      !formData.course
    ) {
      setError("All fields are required.");
      return;
    }
    setEmployees((prev) => [
      ...prev,
      {
        ...formData,
        id: uuidv4(),
        image: image || "https://via.placeholder.com/50",
        createdDate: new Date().toLocaleDateString(),
      },
    ]);
    toggleFormVisibility();
    setError("");
  };

  // Handle Edit Employee
  const handleEditEmployee = (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map((employee) =>
      employee.id === editingEmployee.id
        ? {
            ...formData,
            id: editingEmployee.id,
            image: image || employee.image,
            createdDate: employee.createdDate,
          }
        : employee
    );
    setEmployees(updatedEmployees);
    toggleFormVisibility();
  };

  // Handle Sort Change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortCriterion(value);
  };

  // Sort Employees
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortCriterion === "name") return a.name.localeCompare(b.name);
    if (sortCriterion === "email") return a.email.localeCompare(b.email);
    if (sortCriterion === "id") return a.id.localeCompare(b.id);
    if (sortCriterion === "date")
      return new Date(a.createdDate) - new Date(b.createdDate);
    return 0;
  });

  // Filter employees based on search term
  const filteredEmployees = sortedEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Delete Employee
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    toggleFormVisibility(); // Close the form
  };

  // Return statement
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col p-4">
        <h2 className="text-center text-xl font-bold mb-4">
          Welcome to the Employee Panel
        </h2>
        <p className="text-center mb-4">Hello, {username}!</p>
        <button
          onClick={toggleFormVisibility}
          className="mb-4 p-2 w-40 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isFormVisible ? "Create Employee" : "Create Employee"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {isFormVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <form
              onSubmit={isEditing ? handleEditEmployee : handleAddEmployee}
              className="bg-white p-6 rounded shadow-lg border border-gray-300 w-96"
            >
              <h3 className="text-lg font-semibold mb-4">
                {isEditing ? "Edit Employee" : "Add New Employee"}
              </h3>
              <InputField
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <InputField
                name="mobile"
                placeholder="Mobile No"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="border p-2 rounded mb-2 w-full"
              >
                <option value="">Select Designation</option>
                <option value="Manager">Manager</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
              </select>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="border p-2 rounded mb-2 w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <InputField
                name="course"
                placeholder="Course"
                value={formData.course}
                onChange={handleInputChange}
                required
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="border p-2 rounded mb-2 w-full"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  {isEditing ? "Update Employee" : "Add Employee"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded mb-4 w-1/3"
        />
        <div className="overflow-x-auto">
          <div className="mb-2">
            <label className="mr-2">Sort by:</label>
            <select onChange={handleSortChange} className="border p-2 rounded">
              <option value="">None</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="id">ID</option>
              <option value="date">Created Date</option>
            </select>
          </div>
          <table className="border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border p-2">Unique ID</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Mobile No</th>
                <th className="border p-2">Designation</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Course</th>
                <th className="border p-2">Created Date</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee, index) => (
                <tr key={employee.id} className="hover:bg-gray-100">
                  <td className="border p-2">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="border p-2">
                    <img
                      src={employee.image}
                      alt="employee"
                      className="w-10 h-10 rounded"
                    />
                  </td>
                  <td className="border p-2">{employee.name}</td>
                  <td className="border p-2">{employee.email}</td>
                  <td className="border p-2">{employee.mobile}</td>
                  <td className="border p-2">{employee.designation}</td>
                  <td className="border p-2">{employee.gender}</td>
                  <td className="border p-2">{employee.course}</td>
                  <td className="border p-2">{employee.createdDate}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditingEmployee(employee);
                        setFormData({
                          name: employee.name,
                          email: employee.email,
                          mobile: employee.mobile,
                          designation: employee.designation,
                          gender: employee.gender,
                          course: employee.course,
                        });
                        setImage(employee.image); // Set image for editing
                        toggleFormVisibility();
                      }}
                      className="text-white-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-900 hover:underline ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of{" "}
              {Math.ceil(filteredEmployees.length / itemsPerPage)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredEmployees.length / itemsPerPage)
                  )
                )
              }
              disabled={
                currentPage ===
                Math.ceil(filteredEmployees.length / itemsPerPage)
              }
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
