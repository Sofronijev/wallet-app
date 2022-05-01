const express = require("express");
const config = require("./config/config");

const app = express();

const PORT = config.port || 5000;

app.use(express.json());

//Stop CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes
const usersRoute = require("./routes/users");

app.use("/users", usersRoute);

app.listen(PORT, () => {
  console.log(`[Server]: Server is running on port ${PORT} 👍`);
});
