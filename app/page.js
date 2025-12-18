"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl p-8 border border-gray-100">
        
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Employee Management System
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Manage employee records using a React frontend and C++ backend (Crow framework).
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/AddEmployee")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Add Employee
          </button>

          <button
            onClick={() => router.push("/EmployeeList")}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View Employees
          </button>
        </div>

      </div>
    </div>
  );
}