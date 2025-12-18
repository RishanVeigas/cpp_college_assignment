"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployeeList() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

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
      const res = await fetch("http://localhost:8080/employee/delete-all", {
        method: "DELETE",
      });

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

  //  Search filter
  let filteredEmployees = employees.filter((emp) => {
    const term = search.toLowerCase();
    return (
      emp.id.toLowerCase().includes(term) ||
      emp.name.toLowerCase().includes(term) ||
      emp.role.toLowerCase().includes(term)
    );
  });

  //  Sorting
  if (sortBy === "name") {
    filteredEmployees.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "salary") {
    filteredEmployees.sort((a, b) => a.salary - b.salary);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 text-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading employees...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 text-black">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Employee Directory
              </h1>
              <p className="text-gray-600">Manage your team members</p>
            </div>

            <button
              onClick={handleDeleteAll}
              disabled={employees.length === 0}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Delete All
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 text-black">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by ID, name, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              <option value="">Sort By</option>
              <option value="name">Name (A–Z)</option>
              <option value="salary">Salary (Low → High)</option>
            </select>

            <button
              onClick={() => router.push("/AddEmployee")}
              className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 py-[12px]"
            >
              Add A New Employee
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {employees.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No employees found.</p>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No matching employees found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <th className="p-4 text-left font-semibold">ID</th>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Role</th>
                    <th className="p-4 text-left font-semibold">Salary</th>
                    <th className="p-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp, idx) => (
                    <tr
                      key={emp.id}
                      className={`${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-indigo-50 transition-colors duration-150 border-b border-gray-100`}
                    >
                      <td className="p-4 text-gray-700 font-medium">
                        {emp.id}
                      </td>
                      <td className="p-4 text-gray-800 font-semibold">
                        {emp.name}
                      </td>
                      <td className="p-4 text-gray-600">{emp.role}</td>
                      <td className="p-4 text-gray-700 font-medium">
                        ${emp.salary.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              router.push(`/EditEmployee?id=${emp.id}`)
                            }
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-pink-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
