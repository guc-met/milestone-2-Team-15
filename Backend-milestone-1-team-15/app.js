const express = require("express")

const Staff_routes = require("./routes/Staff_routes");
const ac_routes = require("./routes/AcademicMember_routes");
const HR_routes = require("./routes/HR_routes");
const instructor_routes = require("./routes/instructor_routes.js");
const courseCoordinator_routes = require("./routes/Coor_routes");
const cors = require('cors');

const HoD_routes = require("./routes/HOD_routes");

const app = express();
app.use(cors());
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(cors()) 
app.use(express.json()); //readbody
app.use("/ac_routes", ac_routes);
app.use("/HoD", HoD_routes);
app.use("/courseCoordinator_routes", courseCoordinator_routes);
app.use("", Staff_routes);
app.use("/instructor_routes", instructor_routes);
app.use("/HR", HR_routes);

// app.use((req, res, next) => {
//   //middlewares wihtout next itwont terminate if not res.send
//   const token = req.header.token
//   const result = jwt.verify(token, process.env.Token_Secret)
//   console.log(result)
//   req.user = result // zwdna 7aga 3la result
//   next()
// })
// app.get("/student", (req, res) => {
//   if (req.user.role == "admin") res.send("student")
//   else res.send("accesdenied")
// })
module.exports.app = app;
