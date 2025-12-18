"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditEmployee() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState({
    id: "",
    name: "",
    role: "",
    salary: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchEmployee() {
      try {
        const res = await fetch(`http://localhost:8080/employee/${id}`);
        if (!res.ok) {
          alert("Employee not found");
          router.push("/EmployeeList");
          return;
        }

        const data = await res.json();
        setForm({
          id: data.id,
          name: data.name,
          role: data.role,
          salary: data.salary.toString()
        });
      } catch (err) {
        console.error("Failed to fetch employee", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [id, router]);

  function validate() {
    const newErrors = {};

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
      const res = await fetch("http://localhost:8080/employee/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: form.id,
          name: form.name,
          role: form.role,
          salary: parseFloat(form.salary)
        })
      });

      if (!res.ok) {
        alert("Update failed");
        return;
      }

      alert("Employee updated successfully");
      router.push("/EmployeeList");
    } catch (err) {
      console.error("Update failed", err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading employee...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Edit Employee
        </h2>

        {/* ID (Read-only) */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Employee ID</label>
          <input
            value={form.id}
            disabled
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 text-gray-600"
          />
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Role */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Role</label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
          />
          {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* Salary */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Salary</label>
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
          />
          {errors.salary && (
            <p className="text-red-600 text-sm mt-1">{errors.salary}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Update
          </button>

          <button
            onClick={() => router.push("/EmployeeList")}
            className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white py-4 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
