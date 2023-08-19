const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;

app.use(express.json()); // middleware function which is usedto recognize the incoming request Object as a JSON Object
require("./connection.js"); // this import statement will connect our server to db
app.use(cors()); // it enables CORS (cross-origin resource sharing). In order for your server to be accessible by other origins (domains).

const userRoutes = require("./routes/user.routes.js");
const taskRoutes = require("./routes/task.routes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
