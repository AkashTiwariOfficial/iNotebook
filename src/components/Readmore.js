import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function Readmore(props) {

    const Context = useContext(noteContext);
    const { deleteNote, handleEditnote, getNoteID } = Context;

    const { setProgress } = props;

    const { id } = useParams();
    const last_tap = useRef(0);
    const navigate = useNavigate(null);

    const [showSpinner, setSpinner] = useState(false);
    const [note, setNote] = useState({
        id: "",
        Title: "",
        Description: "",
        tag: "",
    });

    useEffect(() => {
        setProgress(12)
        setSpinner(true);
        const fetchMore = async () => {
            const data = await getNoteID(id);
            console.log("Fetched Note:", data);
            setNote(data);
        }
        fetchMore();
        setProgress(100);
        setSpinner(false);
        // eslint-disable-next-line
    }, [id]);

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

    if (!note) return <h2>Loading...</h2>;

    return (
        <div>
            {showSpinner ? (<Spinner />) : (
                <div style={{ marginTop: "17dvh", marginBottom: "25dvh" }}>
                    <h1 className='text-center mb-4 pb-4'>iNotebook</h1>
                    <div
                        className={`col-12`}
                    >
                        <div className="card my-3">
                            <div className="card-body" style={{ position: "relative" }}>
                                <h4 className="card-title text-center my-4 py-2">
                                    {"YOUR NOTES"}
                                </h4>
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title py-2">
                                        Title :{" "}
                                        <span
                                            id="Notes-item"
                                            onDoubleClick={handleDoubleClick}
                                            onTouchStart={handleDoubleTouch}
                                        >
                                            {note.Title}
                                        </span>
                                    </h5>
                                    <div className="icon">
                                        <i
                                            className="fa-regular fa-trash-can mx-4"
                                            onClick={clickHandler}
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
                                            {note.tag}
                                        </span>
                                    </p>
                                    <p className="card-text">
                                        <span className="fw-bold" >Description : </span>{" "}
                                        <span
                                            id="Notes-item"
                                            onDoubleClick={handleDoubleClick}
                                            onTouchStart={handleDoubleTouch}
                                        >
                                            {note.Description}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
