const express =require('express');
const app = express();

const AuthRoutes = require("./Routes/authRoutes"); 
const schedularTasksRoutes = require('./Routes/schedularTasksRoutes')
const managerRoutes = require("./Routes/ManagerRoutes");

const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const req = require("express/lib/request");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan("dev"));
 
app.use("/api/v1/auth", AuthRoutes);  
app.use("/api/v1/scedular",schedularTasksRoutes);
app.use("/api/v1/manager",managerRoutes);

module.exports = app;