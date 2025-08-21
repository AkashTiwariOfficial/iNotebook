import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export default function Login(props) {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
   const [showSpinner, setSpinner] = useState(false);
  let navigate = useNavigate();

  const { setProgress } = props;

  const host = process.env.REACT_APP_API_URL;

  const handlerSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);

    try{
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    setProgress(12);
    const json = await response.json();
    setProgress(40);
    if (json.success) {
      toast.success("LoggedIn in inoteBook successfully");
      localStorage.setItem("token", json.authenticationToken);
      setProgress(70);
      navigate("/");
    } else {
      setProgress(70);
      toast.error(
        "Invalid Credentials. Please Login again!"
      );
    }
   } catch (error) {
    toast.error("Internal Server Error");
  } finally {
         setSpinner(false);
         setProgress(100);
  }
};

  const changeHandler = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
        {showSpinner ? (
          <Spinner /> )
          : (
    <div
      className="container"
      style={{ marginTop: "17dvh", marginBottom: "25dvh" }}
    >
      <h2 className="my-4">Login to use iNotebook</h2>
      <form onSubmit={handlerSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
            autoComplete="username"
            onChange={changeHandler}
          />
          <div id="email" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            name="password"
            onChange={changeHandler}
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            credentials.email.length === 0 ||
            credentials.password.length === 0 
          }
        >
          Login
        </button>
      </form>
    </div>
          )}
        </>
  );
}
