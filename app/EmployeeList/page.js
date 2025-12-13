"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployeeList() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchEmployees() {
    try {
      const res = await fetch("http://localhost:8080/employee/list");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:8080/employee/delete/${id}`, {
        method: "DELETE",
      });

      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error("Failed to delete employee", err);
    }
  }

  async function handleDeleteAll() {
    if (employees.length === 0) return;

    const confirmDelete = confirm(
      "This will delete ALL employees. Are you sure?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        "http://localhost:8080/employee/delete-all",
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        alert("Failed to delete all employees");
        return;
      }

      setEmployees([]);
      alert("All employees deleted");
    } catch (err) {
      console.error("Failed to delete all employees", err);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-black">
        <p className="text-lg font-semibold">Loading employees...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 text-black">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Employee List
          </h2>

          <button
            onClick={handleDeleteAll}
            disabled={employees.length === 0}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 disabled:opacity-50"
          >
            Delete All
          </button>
        </div>

        {employees.length === 0 ? (
          <p className="text-center text-gray-600">No employees found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Salary</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{emp.id}</td>
                  <td className="p-3 border">{emp.name}</td>
                  <td className="p-3 border">{emp.role}</td>
                  <td className="p-3 border">{emp.salary}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() =>
                        router.push(`/EditEmployee?id=${emp.id}`)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}
