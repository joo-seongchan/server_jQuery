var http = require("http");
var express = require("express");
// const { response } = require("express");

var app = express();

// app.use(function (request, response, next) {
//   request.test = "request.tex";
//   response.test = "response.test";
//   next();
// });
// app.use(function (request, response, next) {
//   response.send(`<h1>${request.test}${response.test}</h1>`);
// });

// // ** 미들웨어 데이터전달

// app.use(express.static("public"));
// app.use(function (request, response) {
//   response.send("<h1>hello middleware</h1>");
// });

// stactic 미들웨어

app.use(express.static("public"));
app.use(express.Router());

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

app.use("/data.html", function (req, res) {
  var output = "";
  output += `<!DOCTYPE html>`;
  output += `<html>`;
  output += `<head>`;
  output += `<title>Data Html</title>`;
  output += `</head>`;
  output += `<body>`;

  items.forEach(function (item) {
    output += `<div>`;
    output += `<h1>${item.name}</h1>`;
    output += `<h2>${item.price}</h2>`;
    output += `</idv>`;
  });

  output += `</body>`;
  output += `</html>`;
  res.send(output);
});
app.use("/data.json", function (req, res) {
  res.send(items);
});
app.use("/data.xml", function (req, res) {
  var output = "";
  output += `<?xml version="1.0" encoding="UTF-8 ?>`;
  output += `<products>`;
  items.forEach(function (item) {
    output += `<product>`;
    output += `<name>${item.name}</name>`;
    output += `<price>${item.price}</price>`;
    output += `</product>`;
  });
  output += `</products>`;

  res.send(output);
});

// 서버 응답

app.all("/parameter", function (req, res) {
  var name = req.param("name");
  var region = req.param("region");

  res.send(`<h1>${name}:${region}</h1>`);
});

// param 매서드

app.all(`/parameter/:id`, function (req, res) {
  var id = req.param(`id`);

  res.send(`<h1>${id}</h1>`);
});

app.use(express.static("public"));
const bodyParser = require("body-parser");
const { response } = require("express");

app.use(bodyParser.json()); //요청 본문을 json 형태로 파싱
app.use(bodyParser.urlencoded({ extended: false })); //

app.get(`/products`, function (req, res) {
  res.send(items);
});
app.get(`/products/:id`, function (req, res) {
  var id = Number(req.param(`id`));

  if (isNaN(id)) {
    res.send({
      error: `숫자를 입력하세요!`,
    });
  } else if (items[id]) {
    res.send(items[id]);
  } else {
    res.send({ error: `존재하지않는 데이터입니다.` });
  }
});
app.post(`/products`, function (req, res) {
  var name = req.param("name");
  var price = req.param(`price`);
  var item = {
    name: name,
    price: price,
  };
  items.push(item);
  res.send({
    message: `데이터를 추가했습니다.`,
    data: item,
  });
});
app.put(`/products/:id`, function (req, res) {
  var id = Number(req.param(`id`));
  var name = req.param(`name`);
  var price = req.param(`price`);

  if (items[id]) {
    if (name) {
      items[id].name = name;
    }
    if (price) {
      items[id].price = price;
    }

    res.send({
      message: `데이터를 수정했습니다.`,
      data: items[id],
    });
  } else {
    res.send({
      error: `존재하지 않는 데이터입니다!`,
    });
  }
});
app.del(`/products/:id`, function (req, res) {
  var id = Number(req.param(`id`));

  if (isNaN(id)) {
    res.send({
      error: `숫자를 입력하세요!`,
    });
  } else if (items[id]) {
    items.splice(id, 1);
    res.send({
      message: `데이터를 삭제했습니다.`,
    });
  } else {
    res.send({ error: `존재하지 않는 데이터입니다!` });
  }
});

http.createServer(app).listen(5000, function () {
  console.log("sever Running at 10.10.10.119:5000");
});
