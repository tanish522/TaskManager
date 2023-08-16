const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
require("./connection.js"); // this import statement will connect our server to db
app.use(cors()); // it enables CORS (cross-origin resource sharing). In order for your server to be accessible by other origins (domains).

const userRoutes = require("./routes/user.routes.js");
const taskRoutes = require("./routes/task.routes.js");
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
