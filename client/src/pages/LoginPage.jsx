import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, loginUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

import image from "../Group.png";

export const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ login, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <img className="pb-6" src={image} alt="group" />
      <h2 className="text-3xl text-white">Authorization</h2>
      <div className="flex items-center flex-col gap-4 w-full">
        <label className="w-full" htmlFor="login">
          <input
            className="input"
            id="login"
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
        <label className="w-full" htmlFor="password">
          <input
            className="input"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="flex flex-col items-center gap-1 w-full">
        <button className="auth-button w-full" type="submit" onClick={handleSubmit}>
          Login
        </button>
        <span className="text-white text-sm">or</span>
        <Link to={"/register"} className="auth-button w-full">
          Are you haven't account ?
        </Link>
      </div>
    </form>
  );
};
