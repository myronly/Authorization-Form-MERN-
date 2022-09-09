import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("Log out.");
  };
  return (
    <header className="flex justify-between items-center py-6 px-6">
      <h2 className="text-white text-3xl font-bold select-none">Logo</h2>
      {!isAuth ? (
        <NavLink to={"/"} href="/" className="auth-button px-6 py-4">
          Home
        </NavLink>
      ) : (
        <button className="auth-button px-6 py-4" onClick={logoutHandler}>
          Log out
        </button>
      )}
    </header>
  );
};
