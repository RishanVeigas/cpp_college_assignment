#pragma once
#include <vector>
#include <string>
#include <fstream>
#include "json.hpp"
#include "Employee.h"

using json = nlohmann::json;
using namespace std;

class EmployeeManager
{
private:
    vector<Employee> employees;
    const string FILE_NAME = "employees.json";

public:
    EmployeeManager() { loadFromFile(); }

    void loadFromFile()
    {
        ifstream file(FILE_NAME);
        if (!file.is_open())
            return;

        json j;
        file >> j;
        employees.clear();

        for (auto &item : j)
        {
            employees.push_back(Employee::fromJson(item));
        }
    }

    void saveToFile()
    {
        json j = json::array();
        for (auto &e : employees)
            j.push_back(e.toJson());

        ofstream file(FILE_NAME);
        file << setw(4) << j;
    }

    void addEmployee(const string &id, const string &name, const string &role, double salary)
    {
        employees.push_back(Employee(id, name, role, salary));
        saveToFile();
    }

    vector<Employee> &getAllEmployees()
    {
        return employees;
    }

    Employee *findEmployee(const string &id)
    {
        for (auto &e : employees)
        {
            if (e.getId() == id)
            {
                return &e;
            }
        }
        return nullptr;
    }

    bool updateEmployee(const string &id, const string &name, const string &role, double salary)
    {
        Employee *e = findEmployee(id);
        if (!e)
            return false;

        e->setName(name);
        e->setRole(role);
        e->setSalary(salary);

        saveToFile();
        return true;
    }

    bool deleteEmployee(const string &id)
    {
        for (int i = 0; i < employees.size(); i++)
        {
            if (employees[i].getId() == id)
            {
                employees.erase(employees.begin() + i);
                saveToFile();
                return true;
            }
        }
        return false;
    }
    
    bool deleteAllEmployees()
    {
    employees.clear();
    saveToFile();   // saves empty array to JSON file
    return true;
}


    json toJson()
    {
        json arr = json::array();
        for (auto &e : employees)
            arr.push_back(e.toJson());
        return arr;
    }
};
