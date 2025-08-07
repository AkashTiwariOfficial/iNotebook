import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../Context/notes/noteContext";
import { Sun, Moon } from "lucide-react";

export default function Navbar(props) {
  let navigate = useNavigate();
  let location = useLocation();

  const { setProgress } = props;

  const Context = useContext(noteContext);
  const {
    mode,
    showAlert,
    toggleMode,
    changeBorder,
    show,
    hide,
    styleTooltip,
    showToolTip,
  } = Context;

  const handleLogout = () => {
    setProgress(12);
    setProgress(40);
    localStorage.removeItem("token");
    showAlert("You have Logged out from inoteBook successfully", "success");
    navigate("login");
    setProgress(100);
  };

  const handleClick = () => {
    setProgress(12);
    setTimeout(() => {
      setProgress(40);
      setProgress(100);
    }, 100);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top navbar-${mode} bg-${mode} `}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" onClick={handleClick} to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                onClick={handleClick}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li
              className={`nav-item ${
                localStorage.getItem("token") ? "d-block" : "d-none"
              }`}
            >
              <Link
                className={`nav-link ${
                  location.pathname === "/notes" ? "active" : ""
                }`}
                onClick={handleClick}
                to="/notes"
              >
                AddNotes
              </Link>
            </li>
            <li
              className={`nav-item ${
                localStorage.getItem("token") ? "d-block" : "d-none"
              }`}
            >
              <Link
                className={`nav-link ${
                  location.pathname === "/usernotes" ? "active" : ""
                }`}
                onClick={handleClick}
                to="/usernotes"
              >
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                onClick={handleClick}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <div  className="d-flex align-items-center mx-5"style={{ display: "inline-block", position: "relative" }}>
            <button
              className={`p-2 rounded-full shadow bg-${mode} dark:bg-zinc-800 transition-all duration-300 hover:rotate-180`}
              onClick={toggleMode}
              style={changeBorder()}
              onMouseEnter={show}
              onMouseLeave={hide}
              onTouchStart={show}
              onTouchEnd={hide}
              onTouchCancel={hide}
            >
              {" "}
              {mode === "dark" ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-zinc-800" />
              )}
            </button>
            {showToolTip && (
              <div
                className="container"
                style={{
                  ...styleTooltip(),
                  border:
                    mode === "dark" ? "2px solid #ffffff" : "2px solid #ffffff",
                }}
              >
                {mode === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"}
              </div>
            )}
          </div>

          {!localStorage.getItem("token") ? (
           <div className="d-flex auth-buttons">
              <Link
                className="btn btn-primary mx-1"
                to="/login"
                onClick={handleClick}
                role="button"
              >
                Login
              </Link>
              <Link
                className="btn btn-primary mx-2"
                to="/signup"
                onClick={handleClick}
                role="button"
              >
                SignUp
              </Link>
          </div>
          ) : (
            <div className="d-flex auth-buttons">
            <button className="btn btn-primary mx-4" onClick={handleLogout}>
              Logout
            </button></div>
          )}
        </div>
      </div>
    </nav>
  );
}
