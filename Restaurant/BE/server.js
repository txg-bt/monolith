const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 5000);
//app.set("trust proxy", true);

app.use("/users", require("./src/routes/user"));
app.use("/restaurants", require("./src/routes/restaurants"));
app.use("/reservations", require("./src/routes/reservations"));

app.get("*", async (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(app.get("port"), function () {
  console.log(`Starting server on port ${app.get("port")}`);
});
