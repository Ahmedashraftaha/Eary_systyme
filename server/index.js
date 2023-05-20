const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
app.use(cors());
const db = require("./db/dbConnection");

const examsAppRouter = require("./routes/exam-routes/route-application");
const examsManageRouter = require("./routes/exam-routes/router-manage");
const admin = require("./middleware/admin");
const userRouter=require("./routes/userRouter");
const autRouter=require("./routes/authRouter");
const adminRouter=require("./routes/adminRouter");


app.use("/api/auth",autRouter);
app.use("/api/users",userRouter);
app.use("/api/admin",adminRouter);
app.use("/api/exams/manage/",admin, examsManageRouter);

app.use("/exams", examsAppRouter);




const port = 4000;
app.all("*",(req,res) =>{
    console.log("route doesn't exist "+req.path);
    res.sendStatus(404);
})
app.listen(port, "localhost", () => {
    console.log(`Server is running on port ${port}`);
  
});