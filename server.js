var http = require("http");
var express = require("express");
const { response } = require("express");

var app = express();
// app.use(function (request, response, next) {
//   request.test = "request.tex";
//   response.test = "response.test";
//   next();
// });
// app.use(function (request, response, next) {
//   response.send(`<h1>${request.test}${response.test}</h1>`);
// });

// ** 미들웨어 데이터전달

// app.use(express.static("public"));
// app.use(function (request, response) {
//   response.send("<h1>hello middleware</h1>");
// });

//stactic 미들웨어

// app.use(express.static("public"));
// app.use(express.Router());

// app.all("/a", function (request, response) {
//   response.send(`<h1>Page A<h1>`);
// });

// app.all("/b", function (request, response) {
//   response.send(`<h1>Page B<h1>`);
// });
// app.all("/c", function (request, response) {
//   response.send(`<h1>Page C<h1>`);
// });

//라우트

var items = [
  { name: "우유", price: "2000" },
  { name: "홍차", price: "5000" },
  { name: "커피", price: "5000" },
];

// app.use("/data.html", function (req, res) {
//   var output = "";
//   output += `<!DOCTYPE html>`;
//   output += `<html>`;
//   output += `<head>`;
//   output += `<title>Data Html</title>`;
//   output += `</head>`;
//   output += `<body>`;

//   items.forEach(function (item) {
//     output += `<div>`;
//     output += `<h1>${item.name}</h1>`;
//     output += `<h2>${item.price}</h2>`;
//     output += `</idv>`;
//   });

//   output += `</body>`;
//   output += `</html>`;
//   res.send(output);
// });
// app.use("/data.json", function (req, res) {
//   res.send(items);
// });
// app.use("/data.xml", function (req, res) {
//   var output = "";
//   output += `<?xml version="1.0" encoding="UTF-8 ?>`;
//   output += `<products>`;
//   items.forEach(function (item) {
//     output += `<product>`;
//     output += `<name>${item.name}</name>`;
//     output += `<price>${item.price}</price>`;
//     output += `</product>`;
//   });
//   output += `</products>`;

//   res.send(output);
// });

//서버 응답

// app.all("/parameter", function (req, res) {
//   var name = req.param("name");
//   var region = req.param("region");

//   res.send(`<h1>${name}:${region}</h1>`);
// });

//param 매서드

// app.all(`/parameter/:id`, function (req, res) {
//   var id = req.param(`id`);

//   res.send(`<h1>${id}</h1>`);
// });

app.use(express.static("public"));
app.use(express.bodyPaser());
app.use(express.Router);

app.get("/products", function (req, res) {
  res.send(items);
});
app.get(`/products/:id`, function (req, res) {
  var id = Number(req.param(`id`));
  res.send(items[id]);
});
// app.post(`/products`, function (req, res) {});
// app.put(`/products/:id`, function (req, res) {});
// app.del(`/products/:id`, function (req, res) {});

http.createServer(app).listen(5000, function () {
  console.log("sever Running at 10.10.10.119:5000");
});
