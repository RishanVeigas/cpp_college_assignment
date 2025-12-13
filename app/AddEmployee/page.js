"use client"
import { useState } from "react";

export default function AddEmployee() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    role: "",
    salary: ""
  });
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!form.id.trim()) newErrors.id = "ID is required";
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.role.trim()) newErrors.role = "Role is required";

    if (!form.salary.trim()) {
      newErrors.salary = "Salary is required";
    } else if (isNaN(form.salary)) {
      newErrors.salary = "Salary must be numeric";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    if (!validate()) return;
    try {
      const res = await fetch("http://localhost:8080/employee/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: form.id,
          name: form.name,
          role: form.role,
          salary: parseFloat(form.salary)
        })
      });
      if (res.ok) {
        alert("Employee Added");
        console.log("Employee Added");
      }
    } catch (e) {
      console.log(e);
    }

    setForm({ id: "", name: "", role: "", salary: "" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 text-black">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Add Employee
        </h2>

        {/* ID */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">
            Employee ID
          </label>
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employee ID"
          />
          {errors.id && (
            <p className="text-red-600 text-sm mt-1">{errors.id}</p>
          )}
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employee name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Role */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">
            Role
          </label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employee role"
          />
          {errors.role && (
            <p className="text-red-600 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {/* Salary */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Salary
          </label>
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter salary amount"
          />
          {errors.salary && (
            <p className="text-red-600 text-sm mt-1">{errors.salary}</p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
