import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { checkIsAuth } from "../redux/features/auth/authSlice";

export const MainPage = () => {
  const isAuth = useSelector(checkIsAuth);

  return (
    <div className="py-4 font-medium h-max absolute top-2/4 left-2/4 -translate-x-1/2">
      {!isAuth ? (
        <ul className="flex gap-3 items-center text-lg">
          <li>
            <NavLink to={"/login"} href="/" className="auth-button px-6 py-3">
              Login
            </NavLink>
          </li>
          <li className="text-white">or</li>
          <li>
            <NavLink to={"/register"} href="/" className="auth-button px-6 py-3 ">
              Register
            </NavLink>
          </li>
        </ul>
      ) : (
        <h1 className="text-white text-4xl">Welcome !</h1>
      )}
    </div>
  );
};
