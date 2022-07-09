/** @format */

import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import { BrowserRouter, Switch } from "react-router-dom";
import "swiper/css/bundle";
import "./App.css";
import Details from "./pages/HomePages/Home/CourseDetails/Details";
import Home from "./pages/HomePages/Home/home";
import CourseInfo from "./pages/HomePages/Home/CourseDetails/CourseInfo";
import Checkout from "./pages/HomePages/Checkout/Checkout";
import Cart from "./pages/HomePages/cart/Cart";
import Default from "./pages/LandingPage/Default";
import { USER_LOGIN } from "./ulti/setting";
import {
  IsAdminRedirect,
  IsUserRedirect,
  ProtectedRoute,
} from "./Helpers/routes";
import UserInfo from "./pages/HomePages/User/UserInfo";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Dashboard from "./pages/AdminPages/Dashboard/Dashboard";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import EditUser from "./pages/AdminPages/Dashboard/EditUser/EditUser";
import AddNewUser from "./pages/AdminPages/Dashboard/AddNewUser/AddNewUser";
import AddNew from "./pages/AdminPages/Courses/AddNew/AddNew";
import Courses from "./pages/AdminPages/Courses/Courses";
import Edit from "./pages/AdminPages/Courses/Edit/Edit";

function App() {
  let user = JSON.parse(localStorage.getItem(USER_LOGIN));

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* Admin*/}
          <IsAdminRedirect user={user} path="/admin">
            <AdminTemplate Component={Dashboard} />
          </IsAdminRedirect>
          <IsAdminRedirect user={user} path="/admin/users">
            <AdminTemplate Component={Dashboard} />
          </IsAdminRedirect>
          <IsAdminRedirect
            user={user}
            path="/admin/dashboard/edituser/:taiKhoan"
          >
            <AdminTemplate Component={EditUser} />
          </IsAdminRedirect>
          <IsAdminRedirect user={user} path="/admin/dashboard/addnewuser">
            <AdminTemplate Component={AddNewUser} />
          </IsAdminRedirect>
          <IsAdminRedirect user={user} path="/admin/courses">
            <AdminTemplate Component={Courses} />
          </IsAdminRedirect>
          <IsAdminRedirect user={user} path="/admin/courses/edit/:id">
            <AdminTemplate Component={Edit} />
          </IsAdminRedirect>
          <IsAdminRedirect user={user} path="/admin/courses/addnew">
            <AdminTemplate Component={AddNew} />
          </IsAdminRedirect>
          {/* user */}

          <IsUserRedirect exact path="/" loggedInPath="/home" user={user}>
            <Default />
          </IsUserRedirect>
          <ProtectedRoute user={user} exact path="/cart">
            <HomeTemplate Component={Cart} />
          </ProtectedRoute>
          <ProtectedRoute user={user} exact path="/home">
            <HomeTemplate Component={Home} />
          </ProtectedRoute>
          <ProtectedRoute user={user} exact path="/home/user">
            <HomeTemplate Component={UserInfo} />
          </ProtectedRoute>
          <ProtectedRoute user={user} exact path="/checkout">
            <HomeTemplate Component={Checkout} />
          </ProtectedRoute>
          <ProtectedRoute user={user} exact path="/details/:category">
            <HomeTemplate Component={Details} />
          </ProtectedRoute>
          <ProtectedRoute
            user={user}
            exact
            path="/details/:category/:courseName"
          >
            <HomeTemplate Component={CourseInfo} />
          </ProtectedRoute>
          <ProtectedRoute
            user={user}
            exact
            path="/details/:category/search/:keyword"
          >
            <HomeTemplate Component={Details} />
          </ProtectedRoute>
          <ProtectedRoute user={user}>
            <HomeTemplate Component={PageNotFound} />
          </ProtectedRoute>
        </Switch>

        {/* <HomeTemplate path="/design" Component={Design} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
