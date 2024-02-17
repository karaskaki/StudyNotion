
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./componenets/common/Navbar";
import OpenRoute from "./componenets/core/auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./componenets/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./componenets/core/auth/PrivateRoute";
import Error from "./pages/Error";
import EnrolledCourses from "./componenets/core/Dashboard/EnrolledCourses";
import Settings from "./componenets/core/Dashboard/Settings/index"
import Cart from "./componenets/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import MyCourses from "./componenets/core/Dashboard/MyCourses";
import AddCourse from "./componenets/core/Dashboard/AddCourse";
import EditCourse from "./componenets/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";



function App() {

  const {user} = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="catalog/:catalogName" element={<Catalog />} />

        <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

         <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
        path="Signup"
        element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        }
        >
        </Route>

        <Route
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />

        <Route path="/contact" element={<Contact />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/Settings" element={<Settings />} />


          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/cart" element={<Cart />} />
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
              </>
            )  
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
              {/* <Route
                path="dashboard/instructor"
                element={<InstructorDashboard />}
              /> */}
            </>
          )}

          </Route>
        
        

        <Route path="*" element={<OpenRoute><Error /></OpenRoute>} />
        
  </Routes>
    </div>
  );
}

export default App;
