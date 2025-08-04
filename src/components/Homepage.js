import React, { useContext } from "react";
import div1 from "./divimg.avif";
import div2 from "./easy.jpg";
import div3 from "./privacy.avif";
import noteContext from "../Context/notes/noteContext";


export default function Homepage(props) {

  const Context = useContext(noteContext);
  const { mode } = Context;

  const { setProgress } = props;

  const handleClick = () => {
    setProgress(12);
    setProgress(50);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  };

  return (
    <div>
      <div
        className={`bg-${mode} min-h-screen w-screen py-10 px-4`}
        style={{ marginTop: "17vh", marginBottom: "25vh" }}
      >
        <div className="text-center mb-10">
          <div className="container " id="title">
            <h1 className="header py-3 mt-5 pt-4">Welcome to iNotebook</h1>
          </div>
          <div className="d-flex justify-content-center">
            <h4
              className="fw-semibold text-start my-3"
              style={{ maxWidth: "30vw", lineHeight: "1.5" }}
            >
              Jot down ideas, track your tasks, and manage everything important
              — all in one place, anytime, anywhere.
            </h4>
          </div>
          <div className="container main-div">
            <div
              className="container div1"
              style={{ backgroundImage: `url(${div1})`, marginRight: "15vw" }}
            ></div>
            <div className="container div2">
              <p>
                <i>
                  iNotebook is a modern, secure, and user-friendly note-taking
                  app designed to simplify your digital life. Whether you're
                  jotting down quick ideas, organizing daily tasks, or storing
                  important information, iNotebook gives you a clean and
                  efficient space to do it all.
                </i>
              </p>
            </div>
          </div>
          <div className="container main-div">
            <div className="container div2 div-left">
              <p>
                <i>
                  iNotebook is designed to be simple and intuitive, so you can
                  start writing notes instantly. With a clean interface and
                  smooth experience, staying organized has never been easier.
                </i>
              </p>
            </div>
            <div
              className="container div1 div-right"
              style={{ backgroundImage: `url(${div2})` }}
            ></div>
          </div>
          <div className="container main-div">
            <div
              className="container div1"
              style={{ backgroundImage: `url(${div3})`, marginRight: "15vw" }}
            ></div>
            <div className="container div2">
              <p>
                <i>
                  At iNotebook, your privacy is our top priority. We understand
                  the importance of protecting your personal data and notes.Your
                  notes stay only with you, and we never share or sell your
                  data.
                </i>
              </p>
            </div>
          </div>

          {localStorage.getItem("token") ? (
            <div className="text-center mt-5">
              <h4 className="fw-semibold">You're back! Let's get started.</h4>
              <p className="paragraph">
                "Welcome back! Access your notes anytime, from any device. Just
                log in and pick up where you left off.
              </p>
              <a
                href={`${localStorage.getItem("token") ? "/notes" : "/login"}`}
                onClick={handleClick}
                className="btn btn-primary px-4 mt-2"
              >
                Continue
              </a>
              <p className="paragraph my-3">
                Your organized thoughts are waiting.
              </p>
            </div>
          ) : (
            <div className="text-center mt-5">
              {" "}
              <h4 className="fw-semibold">Try iNotebook Today</h4>
              <p className="paragraph">
                Ready to simplify your note-taking? Create an account in seconds
                and experience the ease of iNotebook. It's free, fast, and
                secure!
              </p>
              <a
                href={`${localStorage.getItem("token") ? "/" : "/signup"}`}
                onClick={handleClick}
                className="btn btn-primary px-4 mt-2"
              >
                Register Now
              </a>
              <p className="paragraph my-3">
                Not a user yet? Get started in just one click.
              </p>
            </div>
          )}
          <div className="container" style={{ paddingBottom: "10vh" }}></div>
        </div>
      </div>
    </div>
  );
}
