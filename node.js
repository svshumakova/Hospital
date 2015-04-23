var http = require("http"),
    fs = require("fs");

var server = http.createServer();


server.listen(8080);



server.on("request", function(request, response){
    var path = "./public/" + request.url;
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
});
