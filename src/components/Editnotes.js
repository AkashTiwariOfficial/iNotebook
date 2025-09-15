import React, { useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export default function Editnotes(props) {
  const Context = useContext(noteContext);
  const { note, setNote, updateNote } = Context;

  const { setProgress } = props;
  const [showSpinner, setSpinner] = useState(false);


  let navigate = useNavigate();
  const ref = useRef(null);
  const titleref = useRef(null);
  const desref = useRef(null);

  useEffect(() => {
    const resize = (txtarea) => {
      if (txtarea.current) {
        txtarea.current.style.height = "auto";
        txtarea.current.style.height = txtarea.current.scrollHeight + "px";
      }
    };
    resize(titleref);
    resize(desref);
    resize(ref);
  }, []);


  const clickHandler = async (event) => {
    event.preventDefault();
    setSpinner(true);
    setProgress(12);
    await updateNote(note.id, note.eTitle, note.eDescription, note.etag);
    setProgress(40);
    setNote({ eTitle: "", eDescription: "", etag: "" });
    toast.success("Notes has been updated");
    setProgress(70);
    navigate("/notes");
    setSpinner(false);
    setProgress(100);
  };

  const changeHandler = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
    if (event.target.tagName === "TEXTAREA") {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    }
  };

  return (
    <>
      {showSpinner ? (<Spinner />) : (
        <div className="mb-3 col-12 col-lg-12 mx-auto" style={{ marginTop: "10dvh", marginBottom: "12dvh" }}>
          <h1 className=" mt-5 pt-4 text-center">Edit Notes</h1>

          <form className="my-3">
            <div className="mb-3 col-12 col-lg-8 mx-auto">
              <label htmlFor="eTitle" className="form-label">
                Title
              </label>
              <textarea
                type="text"
                className="form-control"
                id="eTitle"
                name="eTitle"
                ref={titleref}
                onChange={changeHandler}
                style={{ overflow: "hidden", resize: "none" }}
                rows="1"
                value={note.eTitle}
                minLength={3}
                aria-describedby="Title"
                required
              />
              <div id="eTitle" className="themed-section form-text">
                Enter the Title of Notes
              </div>
            </div>
            <div className="mb-3 col-12 col-lg-8 mx-auto">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                type="text"
                ref={desref}
                id="eDescription"
                rows="4"
                name="eDescription"
                value={note.eDescription}
                minLength={8}
                onChange={changeHandler}
                required
                style={{ overflow: "hidden", resize: "none" }}
              ></textarea>
              <div id="eDescription" className="themed-section form-text">
                Enter the Description for Notes
              </div>
            </div>
            <div className="mb-3 col-12 col-lg-8 mx-auto">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <textarea
                type="text"
                className="form-control"
                id="etag"
                row="1"
                name="etag"
                ref={ref}
                onChange={changeHandler}
                value={note.etag}
                style={{ overflow: "hidden", resize: "none" }}
                minLength={3}
                required
              />
              <div id="etag" className="themed-section form-text">
                Enter the Tag of Notes
              </div>
            </div>
          </form>
          <div className="Button cred-cont" style={{ marginBottom: "30vh" }}>
            <button
              type="button"
              disabled={
                note.eTitle.length === 0 ||
                note.eDescription.length === 0 ||
                note.eTitle.length < 3 ||
                note.eDescription.length < 8
              }
              className="btn btn-primary"
              onClick={clickHandler}
            >
              Update Notes
            </button>
          </div>
        </div>
      )}
    </>
  );
}
