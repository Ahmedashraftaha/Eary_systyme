import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "./HomePage/Home";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import GetAllUser from "./pages/adminPages/mangeUser/GetAllUser";
import AddUser from "./pages/adminPages/mangeUser/AddUser";
import UpdateUser from "./pages/adminPages/mangeUser/UpdateUser";
import ViewUser from "./pages/adminPages/mangeUser/ViewUser ";
import Admin from "../src/middleware/Admin";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import PendingPage from "./pages/pendingPage/PendingPage";
import ExamTable from "./pages/adminPages/manageExam/viewExam/ExamTable";
import CreateExam from "./pages/adminPages/manageExam/createExam/CreateExam"

import ExamDetails from "./pages/adminPages/manageExam/viewExam/ExamDetails";
import UpdateExam from "./pages/adminPages/manageExam/createExam/UpdateExam";
import EditQuestion from "./pages/adminPages/manageExam/createExam/EditQuestion";
import ExamsGrid from "./pages/userPages/browseExams/BrowseExams";
import BrowseExams from "./pages/userPages/browseExams/BrowseExams";
import TakeExam from "./pages/userPages/takeExam/TakeExam";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    //nesting routes
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
     path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
      {
        path: "/manage-user",
        element: <Admin />,
        
        children: [
          {
            path: "",
            element: <GetAllUser />,
          },
        {

          path: "add",
          element: <AddUser/>,
        },
        {
          path: "update/:id",
          element: <UpdateUser/>,
        },
        {
          path: "view/:id",
          element: <ViewUser />,
        },
      ],
    },
    {
      path: "/manage-exam",
      element: <Admin />,
      
      children: [
        {
          path: "",
          element: <ExamTable />,
        },
        {
          path:":id",
          element: <ExamDetails/>,
        },
        {
          path:":Examid/edit-question/:id",
          element: <EditQuestion/>,
        },
      {

        path: "create",
        element: <CreateExam/>,
      },
      {

        path: "update-exam/:examId",
        element: <UpdateExam/>,
      },
    ],
  },
    {
      path: "/update-profile/:id",
      element: <UpdateProfile />,
    }
    ,
    {
      path: "/panding",
      element: <PendingPage />,
    },
    {
      path: "/browse-exam",
      children:[{
        path: "",
        element: <BrowseExams />
      },
      {
        path:":id",
        element:<TakeExam />
      }
      
      ]
    }
   
    ],
    
  },
]);
