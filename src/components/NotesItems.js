import React, { useContext, useRef } from "react";
import noteContext from "../Context/notes/noteContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotesItems(props) {
  const Context = useContext(noteContext);
  const { deleteNote, showAlert, handleEditnote } = Context;

  const { note, editnote, setProgress } = props;

  let navigate = useNavigate();
  const location = useLocation();

  const last_tap = useRef(0);

  const clickHandler = () => {
    setProgress(12);
    setProgress(40);
    showAlert("Notes has been Deleted", "success");
    setProgress(70);
    setProgress(100);
    return deleteNote(note._id);
  };

  const handleDoubleTouch = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (last_tap.current && now - last_tap.current < DOUBLE_PRESS_DELAY) {
      handleEditnote(note);
      navigate("/editnotes");
    }
    last_tap.current = now;
  };

  const handleDoubleClick = () => {
    setProgress(12);
    handleEditnote(note);
    setProgress(40);
    setTimeout(() => {
      navigate("/editnotes");
      window.scrollTo({ top: "0", behavior: "smooth" });
      setProgress(100);
    }, 800);
  };

  return (
    <div
      className={`col-${location.pathname === "/usernotes" ? "12" : "md-4"}`}
    >
      <div className="card my-3">
        <div className="card-body" style={{ position: "relative" }}>
          <h4 className="card-title text-center my-4 py-2">
            {"Viewing Your Note"}
          </h4>
          <div className="d-flex align-items-center">
            <h5 className="card-title py-2">
              Title :{" "}
              <span
                id="Notes-item"
                onDoubleClick={handleDoubleClick}
                onTouchStart={handleDoubleTouch}
              >
                {location.pathname === "/usernotes"
                  ? note.Title
                  : note.Title.length > 50
                  ? note.Title.slice(0, 50) + "......"
                  : note.Title}
              </span>
            </h5>
            <div className="icon">
              <i
                className="fa-regular fa-trash-can mx-4"
                onClick={clickHandler}
              ></i>
              <i
                className="fa-regular fa-pen-to-square"
                onClick={() => {
                  editnote(note);
                }}
              ></i>
            </div>
          </div>
          <div>
            <p className="card-text pb-2" style={{ marginBottom: "7px" }}>
              <span className="fw-bold">Tag :</span>{" "}
              <span
                id="Notes-item"
                onDoubleClick={handleDoubleClick}
                onTouchStart={handleDoubleTouch}
              >
                {location.pathname === "/usernotes"
                  ? note.tag
                  : note.tag.length > 35
                  ? note.tag.slice(0, 35) + "......"
                  : note.tag}
              </span>
            </p>
            <p className="card-text">
              <span className="fw-bold" >Description : </span>{" "}
              <span
                id="Notes-item"
                onDoubleClick={handleDoubleClick}
                onTouchStart={handleDoubleTouch}
              >
                {location.pathname === "/usernotes"
                  ? note.Description
                  : note.Description.length > 400
                  ? note.Description.slice(0, 400) + "......"
                  : note.Description}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
