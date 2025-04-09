import express from "express";
import  connectMongodb from "./utils/connection.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {checkForAuthentication,restrictTo} from "./middleware/authMiddleware.js";
import studentRoute from "./routes/studentRoute.js";
import path from "path";
import { fileURLToPath } from 'url'


const app = express();
const PORT = 9000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
connectMongodb("mongodb://localhost:27017/innovateHUB")
.then((e)=>console.log("mongodb connected"));


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', //frontend URL
    credentials: true, // Allows cookies to be sent
  })
);
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
// });


// Define routes
app.use("/user", userRoute);
app.use("/student",checkForAuthentication, restrictTo(["student"]), studentRoute);

// app.use("/faculty", checkForAuthentication, restrictTo(["faculty"]), facultyRoute);
// app.use("/admin", checkForAuthentication, restrictTo(["admin"]), adminRoute);


//auth and authorization in react
app.get("/auth/me", checkForAuthentication, restrictTo(["student"]), (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
