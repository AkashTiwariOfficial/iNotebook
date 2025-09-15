import React, { useContext, useEffect, useState } from "react";
import logo from "./logo.png";
import noteContext from "../Context/notes/noteContext";
import Spinner from "./Spinner";

export default function About(props) {
  const Context = useContext(noteContext);
  const { mode } = Context;

  const { setProgress } = props;

   const [showSpinner, setSpinner] = useState(false);

  const handleloadingbar = () => {
    setProgress(12);
    setProgress(40);
    setProgress(80);
    setProgress(100);
  };

    useEffect(() => {
      setSpinner(true);
      setTimeout(() => {
         setSpinner(false);
      }, 1000);
    }, [])

  return (
    <div>
      { showSpinner ? ( <Spinner /> ) :
      (
      <div
        className="container py-5"
        style={{ marginTop: "10dvh", marginBottom: "5dvh" }}
      >
        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">About iNotebook</h1>
          <p className="paragraph fs-5">
            Your thoughts deserve a smart home. Welcome to your personal cloud
            notebook.
          </p>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-5">
            <div style={{ height: "" }}>
              <img
                src={logo}
                alt="Notebook"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
          <div className="col-md-6">
            <h3 className="fw-semibold">What is iNotebook?</h3>
            <p className="paragraph">
              iNotebook is a secure, cloud-based note management app designed to
              simplify your digital life. Whether you're jotting down thoughts,
              saving ideas, or organizing projects — we've built a space where
              your mind meets clarity.
            </p>
            <p className="paragraph">
              Fast, free, and fully encrypted — your notes go where you go,
              backed by strong privacy and a minimalist interface.
            </p>
          </div>
        </div>

        <div className="mb-5">
          <h3 className="fw-semibold mb-4 text-center">
            Why Choose iNotebook?
          </h3>
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className={`bg-${mode} p-4 rounded shadow-sm h-100`}>
                <h5>🧠 Clean UI</h5>
                <p className="paragraph">
                  Focus on writing. No clutter, no distractions.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`bg-${mode} p-4 rounded shadow-sm h-100`}>
                <h5>🔐 100% Privacy</h5>
                <p className="paragraph">
                  Your notes are yours — encrypted and secure.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`bg-${mode} p-4 rounded shadow-sm h-100`}>
                <h5>🚀 Access Anywhere</h5>
                <p className="paragraph">
                  Mobile or desktop, your notes follow you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6">
            <h4 className="fw-semibold">🎯 Our Mission</h4>
            <p className="paragrapgh">
              To empower minds with a seamless and secure platform for capturing
              ideas, boosting productivity, and unlocking creative potential.
            </p>
          </div>
          <div className="col-md-6">
            <h4 className="fw-semibold">🌍 Our Vision</h4>
            <p className="paragraph">
              To become the go-to note app for students, developers, writers,
              and thinkers worldwide — built on simplicity, trust, and
              innovation.
            </p>
          </div>
        </div>

        <div className="text-center mb-5">
          <h5 className="fw-semibold">Meet the Developer</h5>
          <p className="paragraph">
            Created by Akash Tiwari — a developer passionate about productivity,
            privacy, and user-first design.
          </p>
        </div>

        <div className="text-center mt-5">
          <h4 className="fw-semibold">Ready to simplify your notes?</h4>
          <p className="paragraph">Join who all trust iNotebook every day.</p>
          <a
            href={`${localStorage.getItem("token") ? "/" : "/signup"}`}
            onClick={handleloadingbar}
            className="btn btn-primary px-4 mt-2"
          >
            Get Started
          </a>
        </div>
      </div>
)}
    </div>
  );
}
