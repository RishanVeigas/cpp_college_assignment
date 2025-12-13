"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white max-w-xl w-full rounded-xl shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-center mb-4 text-black">
          Employee Management System
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Manage employee records using a React frontend and C++ backend (Crow framework).
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/AddEmployee")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Employee
          </button>

          <button
            onClick={() => router.push("/EmployeeList")}
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            View Employees
          </button>
        </div>

      </div>
    </div>
  );
}
