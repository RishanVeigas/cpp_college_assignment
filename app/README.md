## Employee Management System Overview

The Employee Management System is a full-stack CRUD application developed as part of a college assignment.
It allows users to manage employee records through a React (Next.js) frontend and a C++ backend built using the Crow framework.
Employee data is stored persistently in a local JSON file.

## Tech Stack
## Frontend

React (Next.js App Router)

Tailwind CSS

JavaScript (ES6+)

## Backend

C++

Crow Framework

nlohmann/json

ASIO

## Data Storage

JSON file (file-based persistence)

## Features

Add new employees

View all employees

Edit employee details

Delete a single employee

Delete all employees

Client-side form validation

REST-like API communication

CORS enabled backend

## Project Structure

Frontend (/app)
app/
 ├── page.jsx                  # Home / Dashboard
 ├── add-employee/
 │    └── page.jsx             # Add Employee page
 ├── employees/
 │    └── page.jsx             # Employee List + Delete
 ├── edit-employee/
 │    └── page.jsx             # Edit Employee page

## Backend
backend/
 ├── main.cpp                  # Crow server and routes
 ├── employee.h
 ├── employee.cpp
 ├── employee_manager.h
 ├── employee_manager.cpp
 ├── employees.json            # Data storage file

## Backend API Endpoints
Method	                     Endpoint	               Description
POST                       	 /employee/add	           Add a new employee
GET                       	 /employee/list	           Get all employees
GET	                         /employee/{id}	           Get employee by ID
PUT	                         /employee/update	       Update employee details
DELETE	                     /employee/delete/{id}	   Delete employee by ID
DELETE	                     /employee/delete-all	   Delete all employees

## How the Application Works

The user interacts with the React frontend.

Frontend sends HTTP requests to the Crow backend.

The backend processes requests and updates in-memory data.

Data is saved to a JSON file for persistence.

Responses are sent back to the frontend and displayed to the user.

How to Run the Project
Backend Setup

Install required dependencies:

C++ compiler (g++)

Crow framework

ASIO

nlohmann/json

## Compile the backend:

g++ -std=c++17 -I. -I./asio crow_file.cpp -o server.exe -lws2_32 -lmswsock


## Run the server:

./server


## Backend runs on:

http://localhost:8080

## Frontend Setup

## Install dependencies:

npm install


## Run the frontend:

npm run dev


## Frontend runs on:

http://localhost:3000

Validation & Error Handling

Client-side validation ensures required fields are filled.

Salary field accepts only numeric values.

Backend handles missing or invalid employee IDs.

Confirmation dialogs prevent accidental deletions.

Future Enhancements (Optional)

Authentication and authorization

Pagination and search

Database integration

Improved error handling and logging

Learning Outcomes

This project helped in understanding:

Full-stack application development

REST-style API design

Frontend-backend communication

C++ backend development using Crow

State management in React

JSON-based persistence


## License

This project is created for educational purposes as part of a college assignment.