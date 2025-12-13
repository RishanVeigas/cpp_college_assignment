// #include <iostream>
// #include <fstream>
// #include <vector>
// #include <string>
// #include "json.hpp"

// using json = nlohmann::json;
// using namespace std;



// class Employee {
// private:
//     string id;
//     string name;
//     string role;
//     double salary;

// public:
//     Employee() : id(""), name(""), role(""), salary(0.0) {}

//     Employee(string id, string name, string role, double salary)
//         : id(id), name(name), role(role), salary(salary) {}

    
//     string getId() const { return id; }
//     string getName() const { return name; }
//     string getRole() const { return role; }
//     double getSalary() const { return salary; }

    
//     void setName(const string& n) { name = n; }
//     void setRole(const string& r) { role = r; }
//     void setSalary(double s) { salary = s; }


//     json toJson() const {
//         return json{
//             {"id", id},
//             {"name", name},
//             {"role", role},
//             {"salary", salary}
//         };
//     }

//     static Employee fromJson(const json& j) {
//         return Employee(
//             j["id"],
//             j["name"],
//             j["role"],
//             j["salary"]
//         );
//     }


//     void display() const {
//         cout << "ID: " << id
//              << " | Name: " << name
//              << " | Role: " << role
//              << " | Salary: " << salary << "\n";
//     }
// };

// class EmployeeManager {
// private:
//     vector<Employee> employees;
//     const string FILE_NAME = "employees.json";

// public:
//     EmployeeManager() { loadFromFile(); }

   
//     void loadFromFile() {
//         ifstream file(FILE_NAME);
//         if (!file.is_open()) {
//             cout << "No existing file found. Starting fresh.\n";
//             return;
//         }

//         json j;
//         file >> j;

//         employees.clear();
//         for (auto& item : j) {
//             employees.push_back(Employee::fromJson(item));
//         }

//         file.close();
//     }

    
//     void saveToFile() {
//         json j = json::array();
//         for (auto& e : employees) {
//             j.push_back(e.toJson());
//         }

//         ofstream file(FILE_NAME);
//         file << setw(4) << j;
//         file.close();
//     }

    
//     void addEmployee() {
//         string id, name, role;
//         double salary;

//         cout << "Enter ID: ";
//         cin >> id;
//         cin.ignore();

//         cout << "Enter Name: ";
//         getline(cin, name);

//         cout << "Enter Role: ";
//         getline(cin, role);

//         cout << "Enter Salary: ";
//         cin >> salary;

//         employees.push_back(Employee(id, name, role, salary));
//         saveToFile();
//         cout << "Employee added successfully!\n";
//     }

   
//     void viewEmployees() {
//         if (employees.empty()) {
//             cout << "No employees found.\n";
//             return;
//         }

//         cout << "\n--- Employee List ---\n";
//         for (auto& e : employees) {
//             e.display();
//         }
//     }

  
//     void searchEmployee() {
//         string id;
//         cout << "Enter ID to search: ";
//         cin >> id;

//         for (auto& e : employees) {
//             if (e.getId() == id) {
//                 cout << "Employee found:\n";
//                 e.display();
//                 return;
//             }
//         }
//         cout << "Employee not found.\n";
//     }


//     void updateEmployee() {
//         string id;
//         cout << "Enter ID to update: ";
//         cin >> id;
//         cin.ignore();

//         for (auto& e : employees) {
//             if (e.getId() == id) {

//                 string name, role;
//                 double salary;

//                 cout << "Enter new name: ";
//                 getline(cin, name);

//                 cout << "Enter new role: ";
//                 getline(cin, role);

//                 cout << "Enter new salary: ";
//                 cin >> salary;

//                 e.setName(name);
//                 e.setRole(role);
//                 e.setSalary(salary);

//                 saveToFile();
//                 cout << "Employee updated successfully!\n";
//                 return;
//             }
//         }
//         cout << "Employee not found.\n";
//     }

    
//     void deleteEmployee() {
//         string id;
//         cout << "Enter ID to delete: ";
//         cin >> id;

//         for (int i = 0; i < employees.size(); i++) {
//             if (employees[i].getId() == id) {
//                 employees.erase(employees.begin() + i);
//                 saveToFile();
//                 cout << "Employee deleted.\n";
//                 return;
//             }
//         }
//         cout << "Employee not found.\n";
//     }
// };

// class EmployeeSystem {
// private:
//     EmployeeManager manager;

// public:
//     void menu() {
//         int choice;

//         while (true) {
//             cout << "\n===== Employee Management System =====\n";
//             cout << "1. Add Employee\n";
//             cout << "2. View All Employees\n";
//             cout << "3. Search Employee\n";
//             cout << "4. Update Employee\n";
//             cout << "5. Delete Employee\n";
//             cout << "6. Exit\n";
//             cout << "Enter your choice: ";
//             cin >> choice;

//             switch (choice) {
//                 case 1: manager.addEmployee(); break;
//                 case 2: manager.viewEmployees(); break;
//                 case 3: manager.searchEmployee(); break;
//                 case 4: manager.updateEmployee(); break;
//                 case 5: manager.deleteEmployee(); break;
//                 case 6:
//                     cout << "Exiting...\n";
//                     return;
//                 default:
//                     cout << "Invalid choice! Try again.\n";
//             }
//         }
//     }
// };


// int main() {
//     EmployeeSystem system;
//     system.menu();
//     return 0;
// }
