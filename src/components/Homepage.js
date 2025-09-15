import React, { useContext, useState } from "react";
import div1 from "./divimg.avif";
import div2 from "./easy.jpg";
import div3 from "./privacy.avif";
import noteContext from "../Context/notes/noteContext";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";


export default function Homepage(props) {

  const Context = useContext(noteContext);
  const { mode } = Context;
  const navigate = useNavigate();

  const { setProgress } = props;
  const [showSpinner, setSpinner] = useState(false);

  const handleClick = (path) => {
    setSpinner(true);
    setProgress(12);
    setProgress(50);
    setTimeout(() => {
      navigate(path);
      setProgress(100);
      setSpinner(false);
       window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  };

  return (
    <>
    {showSpinner && <Spinner />}
    <div>
      <div
        className={`bg-${mode} min-h-screen w-screen py-10 px-4`}
        style={{ marginTop: "10dvh", marginBottom: "12dvh" }}
      >
        <div className="text-center mb-10">
          <div className="container " id="title">
            <h1 className="header py-3 mt-5 pt-4">Welcome to iNotebook</h1>
          </div>
          <div className="d-flex justify-content-center">
            <h6
              className="fw-semibold text-start my-1 heading"
            >
              Jot down ideas, track your tasks, and manage everything important
              — all in one place, anytime, anywhere.
            </h6>
          </div>
          <div className="main-cont">
            <div className="container main-div">
              <div
                className="container div1"
                style={{ backgroundImage: `url(${div1})` }}
              ></div>
              <div className="empty-div"></div>
              <div className="container div2">
                <p className="home-paragrapgh">
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
              <div className="container div2">
                <p className="home-paragrapgh">
                  <i>
                    iNotebook is designed to be simple and intuitive, so you can
                    start writing notes instantly. With a clean interface and
                    smooth experience, staying organized has never been easier.
                  </i>
                </p>
              </div>
               <div className="empty-div"></div>
              <div
                className="container div1 div-right"
                style={{ backgroundImage: `url(${div2})` }}
              ></div>
            </div>
            <div className="container main-div">
              <div
                className="container div1"
                style={{ backgroundImage: `url(${div3})` }}
              ></div>
               <div className="empty-div"></div>
              <div className="container div2">
                <p className="home-paragrapgh" >
                  <i>
                    At iNotebook, your privacy is our top priority. We understand
                    the importance of protecting your personal data and notes.Your
                    notes stay only with you, and we never share or sell your
                    data.
                  </i>
                </p>
              </div>
            </div>
          </div>

          {localStorage.getItem("token") ? (
            <div className="text-center mt-5">
              <h4 className="fw-semibold">You're back! Let's get started.</h4>
              <p className="paragraph">
                "Welcome back! Access your notes anytime, from any device. Just
                log in and pick up where you left off.
              </p>
              <button
                onClick={() => {handleClick("/notes")}}
                className="btn btn-primary px-4 mt-2"
              >
                Continue
              </button>
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
              <button
                onClick={() => {handleClick("/signup")}}
                className="btn btn-primary px-4 mt-2"
              >
                Register Now
              </button>
              <p className="paragraph my-3">
                Not a user yet? Get started in just one click.
              </p>
            </div>
          )}
          <div className="container" style={{ paddingBottom: "10dvh" }}></div>
        </div>
      </div>
    </div>
    </>
  );
}
