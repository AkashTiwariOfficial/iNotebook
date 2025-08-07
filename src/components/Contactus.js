import React, { useContext, useRef } from "react";
import emailjs from "@emailjs/browser";
import noteContext from "../Context/notes/noteContext";

export default function Contactus(props) {
  const Context = useContext(noteContext);
  const { showAlert, mode } = Context;

  const { setProgress } = props;

  const form = useRef();

  const serviceKey = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_AUTO;
  const templateId2 = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_SEND;

  const sendEmail = async (e) => {
    e.preventDefault();
    setProgress(12);
    // eslint-disable-next-line
    const time = (document.getElementById("time").value =
      new Date().toLocaleString());

    try {
      // eslint-disable-next-line
      const result = await emailjs.sendForm(
        serviceKey,
        templateId2,
        form.current,
        publicKey
      );

      // eslint-disable-next-line
      const result2 = await emailjs.sendForm(
        serviceKey,
        templateId,
        form.current,
        publicKey
      );
      setProgress(50);
      showAlert(
        "Thanks for reaching out! Our team will get back to you shortly via email.",
        "success"
      );
      setProgress(100);
      e.target.reset();
    } catch (error) {
      showAlert("Failed! A error occcured, Try again!", "danger");
    }
  };

  return (
    <div style={{ marginTop: "17dvh", marginBottom: "10dvh" }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">About iNotebook</h2>
          <p className="paragraph">
            {" "}
            iNotebook is your digital companion for notes, ideas, and
            productivity. We believe in simplicity, privacy, and seamless
            experiences.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-md-6 d-flex">
            <div className={`bg-${mode} p-4 rounded shadow-sm w-100`}>
              <form ref={form} onSubmit={sendEmail}>
                <input
                  type="hidden"
                  className="form-control"
                  id="time"
                  name="time"
                />

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    name="user_name"
                    minLength={3}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    name="user_email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className=".themed-section form-control"
                    id="subject"
                    placeholder="Enter the Title"
                    name="subject"
                    minLength={8}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className=".themed-section form-control"
                    id="message"
                    rows="3"
                    placeholder="Type your message here..."
                    name="message"
                    minLength={18}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Attach file
                  </label>
                  <input
                    className=".themed-section form-control"
                    type="file"
                    id="file"
                    name="file"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Send Mail
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-6 d-flex">
            <div className={`bg-${mode} p-4 rounded shadow-sm w-100`}>
              <h4 className="fw-semibold">iNotebook</h4>
              <h5 className="fw-semibold">
                {" "}
                It Your's personal space with creative thoughts.
              </h5>
              <h6 className="mt-4 fw-semibold">Admin</h6>
              <p className="paragraph">akashtiwari00624@gmail.com</p>

              <h6 className="fw-semibold">Email</h6>
              <p className="paragraph">iNotebook00@gmail.com</p>

              <h5 className="fw-semibold">We’d Love to Hear from You</h5>
              <p className="paragraph">
                Whether you're facing an issue or just want to say hello — send
                us a message. Your voice helps us grow!
              </p>

              <h6 className="fw-semibold">Working Hours</h6>
              <p className="paragraph">Fri – Sun: 9 AM – 6 PM</p>

              <h6 className="fw-semibold">🛡️ Data Privacy</h6>
              <p className="paragraph" style={{ fontSize: "16px" }}>
                We value your trust. Your contact details and messages are
                encrypted and never shared with third parties. Communication
                stays between you and the iNotebook team.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-center mb-5"
        style={{ margin: "35px", padding: "20px" }}
      >
        <h2 className="fw-bold text-primary">
          Let’s Connect — We’re Listening
        </h2>
        <p className="paragraph">
          Have a question, idea, or feedback? The iNotebook Team is here to
          help. Reach out and we’ll respond as soon as possible.
        </p>
      </div>
    </div>
  );
}
