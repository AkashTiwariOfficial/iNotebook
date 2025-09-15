import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Signup(props) {

  const { setProgress } = props;

  const host = process.env.REACT_APP_API_URL;

  const [credentials, setCredentials] = useState({
    Name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const handlerSubmit = async (event) => {
    event.preventDefault();

    try{
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: credentials.Name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
      
    setProgress(12);
    if (credentials.password === credentials.cpassword) {
      const json = await response.json();
      if (json.success) {
       toast.success("You have created an account in inoteBook successfully")
        setProgress(40);
        localStorage.setItem("token", json.authenticationToken);
        setProgress(60);
        navigate("/");
      } else {
        setProgress(40);
        setProgress(60);
        toast.error("User with email already exists. Please Signup again!")
      }
    } else {
      setProgress(40);
      setProgress(60);
      toast.error("Both password did not match. Please try again!");
    }
    }  catch(error){
      toast.error("Internal Server Error");
    } finally{
        setProgress(100);      
    }
  };

  const changeHandler = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
    <div
      className="container"
      style={{ marginTop: "17dvh", marginBottom: "25dvh" }}
    >
      <h2 className="my-4 text-center">Signup on iNotebook</h2>
      <form onSubmit={handlerSubmit}>
        <div className="mb-3 col-12 col-lg-5 mx-auto">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            value={credentials.Name}
            name="Name"
            minLength={3}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-3 col-12 col-lg-5 mx-auto">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            autoComplete="username"
            aria-describedby="emailHelp"
            onChange={changeHandler}
            required
          />
          <div id="email" className="themed-section form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3 col-12 col-lg-5 mx-auto">
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
            autoComplete="new-password"
            minLength={8}
            required
          />
          <div id="password" className="themed-section form-text">
            Length must be greater than 8 including a symbols or numbers
          </div>
        </div>
        <div className="mb-3 col-12 col-lg-5 mx-auto">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            value={credentials.cpassword}
            name="cpassword"
            onChange={changeHandler}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <div className="cred-cont">
        <button
          type="submit"
          disabled={
            credentials.email.length === 0 ||
            credentials.email.length < 8 ||
            credentials.password.length === 0 ||
            credentials.password.length < 8 ||
            credentials.cpassword.length === 0 ||
            credentials.cpassword.length < 8
          }
          className="btn btn-cred btn-primary"
        >
          Signup
        </button>
        </div>
      </form>
    </div>
    </>
  );
}
