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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading employee...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 text-black">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Employee
        </h2>

        {/* ID (Read-only) */}
        <div className="mb-4">
          <label className="block font-semibold">Employee ID</label>
          <input
            value={form.id}
            disabled
            className="border p-2 w-full rounded bg-gray-100"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block font-semibold">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block font-semibold">Role</label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block font-semibold">Salary</label>
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.salary && (
            <p className="text-red-600 text-sm">{errors.salary}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>

          <button
            onClick={() => router.push("/EmployeeList")}
            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
