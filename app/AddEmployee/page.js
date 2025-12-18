"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const router = useRouter();

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
      }
    } catch (e) {
      console.log(e);
    }

    setForm({ id: "", name: "", role: "", salary: "" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Add Employee
        </h2>

        {/* ID */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Employee ID
          </label>
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
            placeholder="Enter employee ID"
          />
          {errors.id && (
            <p className="text-red-600 text-sm mt-1">{errors.id}</p>
          )}
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
            placeholder="Enter employee name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Role */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Role
          </label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
            placeholder="Enter employee role"
          />
          {errors.role && (
            <p className="text-red-600 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {/* Salary */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Salary
          </label>
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
            placeholder="Enter salary amount"
          />
          {errors.salary && (
            <p className="text-red-600 text-sm mt-1">{errors.salary}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Submit
          </button>

          <button
            onClick={() => router.push("/EmployeeList")}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View Employees
          </button>
        </div>
      </div>
    </div>
  );
}