require("dotenv").config({ path: "../config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const PORT = process.env.PORT;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/bootcamps", require("./routes/bootcampRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
