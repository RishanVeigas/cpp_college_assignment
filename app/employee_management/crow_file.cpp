#include "crow_all.h"
#include "asio.hpp"
#include "employee.h"
#include "employee_manager.h"
#include "json.hpp"

using json = nlohmann::json;
using namespace std;
EmployeeManager manager;

struct CORS
{
    struct context
    {
    };

    void before_handle(crow::request &req, crow::response &res, context &)
    {
        res.add_header("Access-Control-Allow-Origin", "*");
        res.add_header("Access-Control-Allow-Headers", "Content-Type");
        res.add_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    }

    void after_handle(crow::request &, crow::response &res, context &)
    {
        res.add_header("Access-Control-Allow-Origin", "*");
        res.add_header("Access-Control-Allow-Headers", "Content-Type");
        res.add_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    }
};

int main()
{
    crow::App<CORS> app;

    // ADD EMPLOYEE (POST)
    CROW_ROUTE(app, "/employee/add")
        .methods("POST"_method)([](const crow::request &req)
                                {
             auto data = crow::json::load(req.body);
            
             if (!data)
                     return crow::response(400, "Invalid JSON");

             manager.addEmployee(
                 data["id"].s(),
                 data["name"].s(),
                 data["role"].s(),
                 data["salary"].d());

             return crow::response(200, "Employee Added"); });

    // LIST EMPLOYEES
    CROW_ROUTE(app, "/employee/list")
        .methods("GET"_method)([]()
                               { return crow::response(manager.toJson().dump()); });

    // GET SINGLE EMPLOYEE
    CROW_ROUTE(app, "/employee/<string>")
        .methods("GET"_method)([](string id)
                               {
             Employee *e = manager.findEmployee(id);

             if (!e)
                 return crow::response(404, "Not Found");

             return crow::response(e->toJson().dump()); });

    // UPDATE EMPLOYEE
    CROW_ROUTE(app, "/employee/update")
        .methods("PUT"_method)([](const crow::request &req)
                               {
             auto data = crow::json::load(req.body);

             bool ok = manager.updateEmployee(
                 data["id"].s(),
                 data["name"].s(),
                 data["role"].s(),
                 data["salary"].d());

             if (!ok)
                 return crow::response(404, "Not Found");

             return crow::response(200, "Updated"); });

    // DELETE EMPLOYEE
    CROW_ROUTE(app, "/employee/delete/<string>")
        .methods("DELETE"_method)([](string id)
                                  {
             bool ok = manager.deleteEmployee(id);

             if (!ok)
                 return crow::response(404, "Not Found");

             return crow::response(200, "Deleted"); });

    // DELETE ALL EMPLOYEES
    CROW_ROUTE(app, "/employee/delete-all")
        .methods("DELETE"_method)([]()
                                  {
        bool ok= manager.deleteAllEmployees();
         if (!ok)
                 return crow::response(404, "Not Found");
        return crow::response(200, "All employees deleted"); });

    CROW_ROUTE(app, "/<path>")
        .methods(crow::HTTPMethod::Options)([](const crow::request &, crow::response &res, std::string)
                                            {
    res.add_header("Access-Control-Allow-Origin", "*");
    res.add_header("Access-Control-Allow-Headers", "Content-Type");
    res.add_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.end(); });

    app.port(8080).multithreaded().run();
}
