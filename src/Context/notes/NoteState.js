import { useState, useEffect } from "react";
import NoteContext from "./noteContext";
import toast from "react-hot-toast";

const NoteState = (props) => {
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);
  const [alert, setAlert] = useState("");
  const [mode, setMode] = useState("light");
  const [showToolTip, setShowToolTip] = useState(false);
  // eslint-disable-next-line
  const [note, setNote] = useState({
    id: "",
    eTitle: "",
    eDescription: "",
    etag: "",
  });

  const host = process.env.REACT_APP_API_URL;

  // to Get {Fetch} all the notes using apiapi/notes/fetchnotes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error);
      }
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // Adding notes to Database using api/notes/addnotes
  const addNote = async (Title, Description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ Title, Description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Deleting notes through delete api call using /api/notes/deletenotes
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
    // eslint-disable-next-line
    const json = await response.json();
  };

  // update note (through API call api/notes/updatenotes)
  const updateNote = async (id, Title, Description, tag) => {
    if (!id) {
      console.error("❌ ID is undefined in updateNote");
      return;
    }
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ Title, Description, tag }),
    });
    // eslint-disable-next-line
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].Title = Title;
        newNotes[index].Description = Description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      toast("Dark Mode has been enabled");
      document.body.style.backgroundColor = "#151B25";
      document.body.style.color = "#b4b4b4";
    } else {
      setMode("light");
      toast("Light Mode has been enabled");
      document.body.style.backgroundColor = " rgb(255, 255, 255)";
      document.body.style.color = "#0a0a0a";
    }
  };

  useEffect(() => {
    document.body.className = mode; // 'light' or 'dark'
  }, [mode]);

  const changeBorder = () => {
    if (mode === "light") {
      return {
        border: "1px solid #d3dce6",
        color: "#4c4d8899",
      };
    } else {
      return {
        border: "1px solid #ffffff33",
        color: "#ffffff",
      };
    }
  };

  const show = () => {
    setShowToolTip(true);
  };
  const hide = () => {
    setShowToolTip(false);
  };

  const styleTooltip = () => {
    return {
      backgroundColor: "#535353ff",
      color: "#ffffff",
      border: "2px solid #ffffff",
      position: "absolute",
      top: "110%",
      fontSize: "13px",
      borderRadius: "6%",
      left: "50%",
      zIndex: 1000,
      padding: "5px 5px 5px 5px",
      whiteSpace: "nowrap",
      width: "130px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  const handleEditnote = (currentNote) => {
    setNote({
      id: currentNote._id,
      eTitle: currentNote.Title,
      eDescription: currentNote.Description,
      etag: currentNote.tag,
    });
  };

  return (
    <NoteContext.Provider
      value={{
        note,
        notes,
        alert,
        mode,
        showToolTip,
        setNote,
        setAlert,
        addNote,
        deleteNote,
        updateNote,
        getNotes,
        handleEditnote,
        toggleMode,
        changeBorder,
        show,
        hide,
        styleTooltip,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
