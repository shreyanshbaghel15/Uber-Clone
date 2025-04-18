
const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket"); // ✅ Ensure correct import

const port = process.env.PORT || 4000;
const server = http.createServer(app);

initializeSocket(server); // ✅ Ensure function is called

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
