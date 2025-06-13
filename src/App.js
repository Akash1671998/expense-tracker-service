require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./Connections/connetion");
const AuthRouter = require("./Routes/AuthRouters");
const ProductRouter = require("./Routes/ProductRouter");
const ExpenseRouter = require("./Routes/ExpenseRouter");
const UserRouter = require("./Routes/UserRouters");

const cors = require("cors");
const { ensureAuthenticated } = require("./Middlewares/Auth");
const createDefaultAdmin = require("./Middlewares/createDefault");
const PORT = 9090;

const app = express();

app.use(bodyParser.json());
app.use(cors());
connectDB().then(() => {
    createDefaultAdmin();
  });

// FIXED: Added forward slashes in route paths
app.use("/auth", AuthRouter);
app.use("/productRouter", ProductRouter);
app.use("/expense",ensureAuthenticated, ExpenseRouter);
app.use("/users",ensureAuthenticated,UserRouter)

app.listen(PORT, () => {
    console.log("🚀 Server is running on port:", PORT);
});
