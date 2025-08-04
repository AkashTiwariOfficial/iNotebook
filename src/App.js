import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contactus from "./components/Contactus";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Notescomp from "./components/Notescomp";
import Editnotes from "./components/Editnotes";
import Usernotes from "./components/Usernotes";
import LoadingBar from "react-top-loading-bar";
import React, { useState } from "react";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <NoteState>
        <Router>
          <Navbar setProgress={setProgress} />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Alert />
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home setProgress={setProgress} />} />
              <Route
                path="/about"
                element={<About setProgress={setProgress} />}
              />
              <Route
                path="/login"
                element={<Login setProgress={setProgress} />}
              />
              <Route
                path="/signup"
                element={<Signup setProgress={setProgress} />}
              />
              <Route
                path="/contact"
                element={<Contactus setProgress={setProgress} />}
              />
              <Route
                path="/home"
                element={<Homepage setProgress={setProgress} />}
              />
              <Route
                path="/notes"
                element={<Notescomp setProgress={setProgress} />}
              />
              <Route
                path="/editnotes"
                element={<Editnotes setProgress={setProgress} />}
              />
              <Route
                path="/usernotes"
                element={<Usernotes setProgress={setProgress} />}
              />
            </Routes>
          </div>
          <Footer setProgress={setProgress} />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
