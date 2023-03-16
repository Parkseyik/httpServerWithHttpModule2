// app.js
const http = require("http");
const server = http.createServer();

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    description:
      "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    description: "Request/Response와 Stateless!!",
    userId: 2,
  },
];

const httpRequestListener = function (request, response) {
  const { url, method } = request;
  if (method === "GET") {
    if (url === "/ping") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "pong" }));
    }
  } else if (method === "POST") {
    // users
    if (url === "/users") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      // stream을 전부 받아온 이후에 실행
      request.on("end", () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });

        response.end(JSON.stringify({ message: "usersCreated" })); // (9)
      });
    }
    // posts
    else if (url === "/posts") {
      let body = ""; // (4)

      request.on("data", (data) => {
        body += data;
      }); // (5)

      // stream을 전부 받아온 이후에 실행
      request.on("end", () => {
        // (6)
        const posts = JSON.parse(body); //(7)

        users.push({
          // (8)
          id: posts.id,
          title: posts.title,
          description: posts.description,
          userId: posts.userId,
        });

        response.end(JSON.stringify({ message: "postCreated" }));
      });
    }
  }
};
server.on("request", httpRequestListener);

server.listen(8000, "127.0.0.1", function () {
  console.log("Listening to requests on port 8000");
});
