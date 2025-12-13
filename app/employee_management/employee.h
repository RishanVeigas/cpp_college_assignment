#pragma once
#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include "json.hpp"

using json = nlohmann::json;
using namespace std;



class Employee {
private:
    string id;
    string name;
    string role;
    double salary;

public:
    Employee() : id(""), name(""), role(""), salary(0.0) {}

    Employee(string id, string name, string role, double salary)
        : id(id), name(name), role(role), salary(salary) {}

    
    string getId() const { return id; }
    string getName() const { return name; }
    string getRole() const { return role; }
    double getSalary() const { return salary; }

    
    void setName(const string& n) { name = n; }
    void setRole(const string& r) { role = r; }
    void setSalary(double s) { salary = s; }


    json toJson() const {
        return json{
            {"id", id},
            {"name", name},
            {"role", role},
            {"salary", salary}
        };
    }

    static Employee fromJson(const json& j) {
        return Employee(
            j["id"],
            j["name"],
            j["role"],
            j["salary"]
        );
    }


    void display() const {
        cout << "ID: " << id
             << " | Name: " << name
             << " | Role: " << role
             << " | Salary: " << salary << "\n";
    }
};