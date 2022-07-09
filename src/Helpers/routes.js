/** @format */

import React from "react";
import { Route, Redirect } from "react-router-dom";

export function IsAdminRedirect({ path, user, children, ...restProp }) {
  return (
    <Route
      path={path}
      render={() => {
        if (user.maLoaiNguoiDung === "GV") {
          return children;
        }
        if (user.maLoaiNguoiDung === "HV") {
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        }
      }}
    />
  );
}
export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children;
        }
        if (user) {
          console.log("user already logged in");
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}
export function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        }
      }}
    />
  );
}
