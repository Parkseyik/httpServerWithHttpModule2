// app.js
const http = require("http");
//const { threadId } = require("worker_threads");
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

// 보내줄 데이터 pop 데이터
function pop(userTable, posttable) {
  const theradArr = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < posts.length; j++) {
      if (users[i]["id"] === posts[j]["userId"]) {
        const makeArray = {
          userId: userTable[i]["id"],
          userName: userTable[i]["name"],
          postingId: posttable[j]["id"],
          postingTitle: posttable[j]["title"],
          postingContent: posttable[j]["description"],
        };
        theradArr.push(makeArray);
      }
    }
  }
  return theradArr;
}

console.log(pop(users, posts));

const httpRequestListener = function (request, response) {
  const { url, method } = request;

  //---------------------------GET 호출--------------------------------
  if (method === "GET") {
    if (url === "/ping") {
      //받고
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "pong" })); // 보낸다
    } else if (url === "/posts") {
      // posts url
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ data: posts }));
    } else if (url === "/users") {
      // users url
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ data: users }));
    } else if (url === "/checks") {
      // pop url
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ data: pop(users, posts) }));

      // ---------------------------POST 호출--------------------------------
    } else if (method === "POST") {
      // users
      if (url === "/users") {
        let body = "";

        request.on("data", (data) => {
          body += data;
        });

        request.on("end", () => {
          const user = JSON.parse(body);

          users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
          });
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(
            JSON.stringify({ message: "usersCreated", data: users })
          ); // (9)
        });
      }

      // posts
      else if (url === "/posts") {
        let body = "";

        request.on("data", (data) => {
          body += data;
        });

        // stream을 전부 받아온 이후에 실행
        request.on("end", () => {
          const post = JSON.parse(body);

          posts.push({
            id: post.id,
            title: post.title,
            description: post.description,
            userId: post.userId,
          });
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "postCreated", data: posts }));
        });
      }
      //---------------------------PATCH 호출--------------------------------
    } else if (method === "PATCH") {
      if (url === "/users") {
        let body = "";

        request.on("data", (data) => {
          body += data;
        });
        request.on("end", () => {
          const array = [];
          const post = JSON.parse(body);
          array.push(post);
          const Arr1 = posts.map((item) => {
            const Arr2 = array.map((item2) => item2.id === item.id);
            return Arr2 ? { ...posts } : item;
          });
        });
      }

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "postCreated", data: users }));
    }
  }
};

server.on("request", httpRequestListener);

server.listen(8000, "127.0.0.1", function () {
  console.log("Listening to requests on port 8000");
});
