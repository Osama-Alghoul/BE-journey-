import { createServer } from "http";

const users = [
  { id: 1, name: "osama" },
  { id: 2, name: "ayman" },
  { id: 3, name: "anas" },
];

const server = createServer((req, res) => {
  try {
    if (/\/api\/users/.test(req.url) && req.method === "GET") {
      res.setHeader("Content-Type", "application/json");
      if (/^\/api\/users$/.test(req.url)) {
        res.write(JSON.stringify(users));
      } else if (/^\/api\/users\/\d+$/.test(req.url)) {
        const id = parseInt(req.url.split("/")[3]);
        const user = users.find((i) => i.id === id);
        if (user) {
          res.write(JSON.stringify(user));
        } else {
          res.statusCode = 404;
          res.write(JSON.stringify({ message: "user not found" }));
        }
      }
      res.end();
    }
  } catch (error) {
    throw new Error("Internal server error");
  }
});

server.listen(3001, () => {
  console.log("server is running on port 3001");
});
