const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const { swaggerUi, specs } = require("./swagger");
require("dotenv").config();

const authRoute = require("./routes/loginRoute");
const teachersRoute = require("./routes/teachersRoute");
const classRoute = require("./routes/classRoute");
const childernsRoute = require("./routes/childernsRoute");
const isAuthorization = require("./MiddleWares/authrMW");
//cors
const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
};

//server
const PORT = process.env.PORT || 3000;
const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connected Successfully...");
    app.listen(PORT || 3000, () => {
      console.log("I'm Listening Now ", PORT);
    });
  })
  .catch((error) => {
    console.error("DB Connection Error:", error);
  });

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(authRoute);
// app.use(isAuthorization);
app.use(teachersRoute);
app.use(childernsRoute);
app.use(classRoute);
app.use(express.json());
// Not found middleware
app.use((req, res) => {
  res.status(404).json({ message: "Not Found Page!" });
});

// Error middleware
app.use((error, req, res, next) => {
  let status = error.status || 500;
  res
    .status(status)
    .json({ message: error.message || "Internal Server Error" });
});
