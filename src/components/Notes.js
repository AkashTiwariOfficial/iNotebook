import { useLocation, useNavigate } from "react-router-dom";
import noteContext from "../Context/notes/noteContext";
import AddNote from "./AddNote";
import NotesItems from "./NotesItems";
import { useContext, useEffect, useRef, useState } from "react";

export default function Notes(props) {
  const ref = useRef(null);
  const refClose = useRef(null);
  const Context = useContext(noteContext);
  const location = useLocation();

  const { notes, getNotes, updateNote, showAlert } = Context;
  const { setProgress } = props;

  const [note, setNote] = useState({
    id: "",
    eTitle: "",
    eDescription: "",
    etag: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const clickHandler = async (event) => {
    event.preventDefault();
    setProgress(12);
    await updateNote(note.id, note.eTitle, note.eDescription, note.etag);
    setProgress(40);
    setTimeout(() => {
      ref.current.click();
    }, 100);
    setNote({ eTitle: "", eDescription: "", etag: "" });
    showAlert("Notes has been updated", "success");
    setProgress(100);
  };

  const changeHandler = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const editnote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      eTitle: currentNote.Title,
      eDescription: currentNote.Description,
      etag: currentNote.tag,
    });
  };

  const handleText = () => {
    if (location.pathname === "/usernotes") {
      return (
        <h5>Looks like you haven’t added any notes yet. Let’s create one!</h5>
      );
    } else {
      return "No notes to Display.";
    }
  };

  const handleClick = () => {
    setProgress(12);
    setProgress(50);
    navigate("/notes");
    setProgress(100);
  };

  return (
    <div style={{ marginBottom: "170px" }}>
      {location.pathname === "/usernotes" ? (
        ""
      ) : (
        <AddNote setProgress={setProgress} />
      )}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header" id="editnotes">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Notes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" id="editnotes">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="eTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTitle"
                    name="eTitle"
                    onChange={changeHandler}
                    value={note.eTitle}
                    minLength={3}
                    aria-describedby="Title"
                    required
                  />
                  <div id="eTitle" className="themed-section form-text">
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
                    id="eDescription"
                    rows="4"
                    name="eDescription"
                    value={note.eDescription}
                    minLength={8}
                    onChange={changeHandler}
                    required
                  ></textarea>
                  <div id="eDescription" className="themed-section form-text">
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
                    id="etag"
                    name="etag"
                    onChange={changeHandler}
                    value={note.etag}
                    minLength={3}
                    required
                  />
                  <div id="etag" className="themed-section form-text">
                    Enter the Tag of Notes
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer" id="editnotes">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                disabled={
                  note.eTitle === 0 ||
                  note.eDescription === 0 ||
                  note.eTitle < 3 ||
                  note.eDescription < 8
                }
                className="btn btn-primary"
                onClick={clickHandler}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        {location.pathname === "/usernotes" ? (
          <h1 className="text-center my-4 py-4">All Your Notes in One Place</h1>
        ) : (
          <h1 className="text-center my-4 py-4">Your Notes</h1>
        )}
         {!notes || notes.length === 0 ? (
          <div className="text-center mx-2 my-4">
            {handleText()}
            {location.pathname === "/usernotes" ? (
              <button className="btn btn-primary my-3" onClick={handleClick}>
                Add Notes
              </button>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {notes.map((note) => {
          return (
            <NotesItems
              key={note._id}
              editnote={editnote}
              setProgress={setProgress}
              note={note}
            />
          );
        })}
      </div>
    </div>
  );
}
