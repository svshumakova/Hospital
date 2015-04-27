var http = require("http"),
    fs = require("fs"),
    _ = require("lodash");

var server = http.createServer();


server.listen(8080);

var employees = [
    {   "id":"c49f39b2-b5de-44f8-a27b-9bbf6d5f22fa",
        "firstName": "Sveta",
        "lastName":"Shumakova",
        "position":"nurse"},
    {   "id":"e5e3e2a4-fdc0-4081-a984-1b8863f36249",
        "firstName": "Alena",
        "lastName":"Lisogub",
        "position":"prinsipal"},
    {   "id":"d12fd9fa-a25d-4f30-ad73-3a9d67e71e84",
        "firstName": "Yura",
        "lastName":"Krivinets",
        "position":"psychologist"}
];

var result = {
    status:"",
    message:""
}

var status = ["OK", "ERROR"];

var message = {
    addEmployeeSuccsess: "Employee has been created",
    addEmployeeFail: "Employee hasn't been created",
    editEmployeeSuccess: "Employee hasn been edited",
    userNotFound: "Employee not found",
    editEmployeeFail: "Employee hasn't been edited"
}


server.on("request", function(request, response){
    if(request.method === "GET"){
        var url = request.url;
        if(url == "/ajax/getEmployees"){
            if(employees){
                response.writeHead(200);
                response.end(JSON.stringify(employees));
            } else {
                response.writeHead(500);
                response.end("Internal error")
            }
        } else {
            if(url === "/"){
                url = "index.html";
            }
            var path = "./public/" + url;
            fs.readFile(path,function(err,data){
                if(data){
                    response.writeHead(200);
                    response.end(data);
                }
                if(err){
                    var err404='HTTP/1.1 404 Not Found\r\n\r\n';
                    response.writeHead(404);
                    response.end(err404);
                }
            });
        }
    }
    function getId(url, urlPart){
        var id = "";
        if(url.indexOf(urlPart) !== -1){
            id = url.substr(urlPart.length);
        }
        return id;
    }
    if(request.method === "DELETE"){
        var urlPart = "/ajax/deleteEmployee/";
        var url = request.url;
        var id = getId(url, urlPart);
        if (_.find(employees, {id: id})) {
            employees = _.reject(employees, {id: id});
            response.writeHead(200);
            response.end("200");
        } else {
            response.writeHead(404);
            response.end("404");
        }
    }

    if(request.method === "POST"){
        if(request.url === "/ajax/addEmployee"){
            var body = "";
            request.on("data", function(chunk){
                body += chunk;
                if(body.toString() !== ""){
                    var user = JSON.parse(body.toString());
                    employees.push(user);
                    result.status = status[0];
                    result.message = message.addEmployeeSuccsess;
                    response.writeHead(200);
                    response.end(JSON.stringify(result));
                } else {
                    result.status = status[1];
                    result.message = message.addEmployeeFail;
                    response.writeHead(500);
                    response.end(JSON.stringify(result));
                }
            });

        }
    }

    if(request.method === "PUT"){
        if(request.url === "/ajax/editEmployee/") {
            console.log("here");
            var body = "";
            request.on("data", function(chunk){
                body += chunk;
                if(body.toString() !== ""){
                    var user = JSON.parse(body.toString());
                    var updatedUser = _.find(employees,{id:user.id});
                    if(updatedUser){
                        updatedUser.firstName = user.firstName;
                        updatedUser.lastName = user.lastName;
                        updatedUser.position = user.position;
                        result.status = status[0];
                        result.message = message.editEmployeeSuccess;
                        response.writeHead(200);
                        response.end(JSON.stringify(result));
                    } else {
                        result.status = status[1];
                        result.message = message.userNotFound;
                        response.writeHead(500);
                        response.end(JSON.stringify(result));
                    }

                } else {
                    result.status = status[1];
                    result.message = message.editEmployeeFail;
                    response.writeHead(500);
                    response.end(JSON.stringify(result));
                }
            });
        }
    }
    //http://habrahabr.ru/post/193458/
    //response.end("unknown method");
});
