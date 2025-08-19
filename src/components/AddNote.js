import React, { useState, useContext } from "react";
import noteContext from "../Context/notes/noteContext";
import toast from "react-hot-toast";

export default function AddNote(props) {
  const Context = useContext(noteContext);
  const { addNote } = Context;
  const { setProgress } = props;

  const [note, setNote] = useState({ Title: "", Description: "", tag: "" });

  const clickHandler = (event) => {
    event.preventDefault();
    setProgress(40);
    addNote(note.Title, note.Description, note.tag);
    setNote({ Title: "", Description: "", tag: "" });
    setProgress(80);
    toast.success("Notes have been added to your Account");
    setProgress(100);
  };

  const changeHandler = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "17dvh" }}>
        <h1>Add Notes</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="Title"
              name="Title"
              onChange={changeHandler}
              value={note.Title}
              minLength={3}
              aria-describedby="Title"
              required
            />
            <div id="Title" className="themed-section form-text">
              Enter the Title of Notes
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              type="text"
              id="Description"
              rows="4"
              name="Description"
              value={note.Description}
              minLength={8}
              onChange={changeHandler}
              required
            ></textarea>
            <div id="Title" className="themed-section form-text">
              Enter the Description for Notes
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={changeHandler}
              minLength={3}
              required
            />
            <div id="Title" className="themed-section form-text">
              Enter the Tag of Notes
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              note.Title === 0 ||
              note.Description === 0 ||
              note.Title < 3 ||
              note.Description < 8
            }
            onClick={clickHandler}
          >
            Add Notes
          </button>
        </form>
      </div>
    </div>
  );
}
