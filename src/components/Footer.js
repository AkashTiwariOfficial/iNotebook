import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer(props) {
  const { setProgress } = props;

  const handleClick = () => {
    setProgress(12);
    setProgress(40);
    setProgress(70);
    setProgress(100);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <footer>
        <div className="footer container-fluid px-3">
          <div className="footer-1">
            iNotebook - Your Notes, Organized and Secure
          </div>
          <div className="main-footer">
            <div className="main-content">
              <div className="cont-1">
                <p id="items">Get to Know Us</p>
                <ul>
                  <li className="item-1">
                    <Link
                      className="item-link-1"
                      to="/about"
                      onClick={handleClick}
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="item-1">
                    <Link
                      className="item-link-1"
                      to="/contact"
                      onClick={handleClick}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="random-cont"></div>
              <div className="cont-2">
                <p id="items"> Connect with Us</p>
                <ul>
                  <li className="item-1">
                    {" "}
                    <Link
                      className="item-link-1"
                      to="https://www.linkedin.com/in/akash-tiwari-4aa047298/"
                    >
                      <FaLinkedin size={24} color="#0077B5" /> Linkedin
                    </Link>{" "}
                  </li>
                  <li className="item-1">
                    {" "}
                    <Link
                      className="item-link-1"
                      to="https://www.instagram.com/akashtiwari00624/"
                    >
                      {" "}
                      <FaInstagram size={24} color="#E1306C" /> Instagram
                    </Link>{" "}
                  </li>
                  <li className="item-1">
                    {" "}
                    <Link
                      className="item-link-1"
                      to="https://www.facebook.com/profile.php?id=61572388684983"
                    >
                      {" "}
                      <FaFacebook size={24} color="#4267B2" /> Facebook
                    </Link>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            <div className="container-3">
              <img
                className="mx-2 my-1"
                src="https://flagsapi.com/IN/flat/24.png"
                alt="...."
              />{" "}
              India
            </div>
          </div>
          <div className="last-footer">
            <div style={{ color: "#b4b4b4", fontSize: "13px", margin: "2px" }}>
              <p style={{ color: "#b4b4b4", fontSize: "13px", margin: "2px" }}>
                Thanks for visiting iNotebook — Keep thinking, keep writing.
              </p>
            </div>
            <p style={{ margin: "7px", fontSize: "14px" }}>
              © 2024–2025 iNotebook.com, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
