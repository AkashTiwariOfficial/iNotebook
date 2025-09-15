import React, { useContext, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export default function NotesItems(props) {
  const Context = useContext(noteContext);
  const { deleteNote, handleEditnote } = Context;

  const { note, editnote, setProgress } = props;

  let navigate = useNavigate();
  const location = useLocation();

  const last_tap = useRef(0);

  const [showSpinner, setSpinner] = useState(false);

  const clickHandler = () => {
    setProgress(12);
    setProgress(40);
    toast.success("Notes has been Deleted", "success");
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
    setSpinner(true);
    handleEditnote(note);
    setProgress(40);
    setTimeout(() => {
      navigate("/editnotes");
      window.scrollTo({ top: "0", behavior: "smooth" });
      setProgress(100);
      setSpinner(false);
    }, 1000);
  };

  const handleClick = () => {
    console.log(note._id);
    setProgress(12);
    setSpinner(true);
    navigate(`/note/${note._id}`);
    window.scrollTo({ top: "0", behavior: "smooth" });
    setProgress(100);
    setSpinner(false);
  }

  return (
    <>
      {showSpinner && <Spinner />}
      <div
        className={`col-md-4`}
      >
        <div className="card my-3">
          <div className="card-body" style={{ position: "relative" }}>
            <h4 className="card-title text-center my-4 py-2">
              {"VEIWING YOUR NOTES"}
            </h4>
            <div className="d-flex align-items-center">
              <h5 className="card-title py-2">
                Title :{" "}
                <span
                  id="Notes-item"
                  onDoubleClick={handleDoubleClick}
                  onTouchStart={handleDoubleTouch}
                >
                  {note.Title.length > 30 ?
                    note.Title.slice(0, 30) + "......"
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
                  {
                    note.tag.length > 20
                      ? note.tag.slice(0, 20) + "......"
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
                  {
                    note.Description.length > 100
                      ? note.Description.slice(0, 100) + "......"
                      : note.Description}
                </span>
              </p>
            </div>
            {location.pathname === '/usernotes' ? (
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary btn-sm mt-4 mb-2" onClick={handleClick} >Read More</button>
              </div>
            ) : ''}
          </div>
        </div>
      </div>
    </>
  );
}
