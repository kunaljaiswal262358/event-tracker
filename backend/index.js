require("dotenv").config();
require("./config/db")();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", authRoutes);
app.use("/api/event/", eventRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
