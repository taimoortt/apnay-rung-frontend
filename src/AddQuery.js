import "./styles.css";
import "./maham.css";
import React, { useState, useEffect } from "react";
import CustomerNavbar from "./CustomerNavbar";
import Memory from "./Memory";
import BottomBar from "./BottomBar";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
const AddQuery = () =>{
  let tokenID = localStorage.getItem("Token");
  const [userstate, setUserState] = useState([]);
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState([``]);
  const [show, setShow] = useState(false);
  // for testing eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJUYWltb29yIFRhcmlxIiwidHlwZU9mVXNlciI6ImN1c3RvbWVyIiwiaWF0IjoxNjE2OTYxNzMwfQ.Dn0FATITkhrR7e5tkp_XAmdPfp-FKJGzdskczt9k2fw`
  useEffect(() => { //for getting user's name for display
      const getData = async (url) => {
        const response = await fetch(url, {
          method: "GET",
          withCredentials: true,
          credentials: "include",
          headers: {
            Authorization:
              `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJUYWltb29yIFRhcmlxIiwidHlwZU9mVXNlciI6ImN1c3RvbWVyIiwiaWF0IjoxNjE2OTYxNzMwfQ.Dn0FATITkhrR7e5tkp_XAmdPfp-FKJGzdskczt9k2fw`,
            "Content-Type": "application/json"
          }
        });
        return response.json();
      };
    
      getData("https://apnay-rung-api.herokuapp.com/customer/info").then(
      (response) => {
        console.log(`customer navbar response: ${response}`)
        setUserState(response);
      }
    );
  }, []);

  const SubmitHandler = (event) => {
    event.preventDefault();
    console.log("in submit")
    sendData()
  }
  async function sendData() { //to submit data to the backend
    console.log(`token is ${tokenID}`)
    const response = await fetch(
      "https://apnay-rung-api.herokuapp.com/message/new",
      {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJUYWltb29yIFRhcmlxIiwidHlwZU9mVXNlciI6ImN1c3RvbWVyIiwiaWF0IjoxNjE2OTYxNzMwfQ.Dn0FATITkhrR7e5tkp_XAmdPfp-FKJGzdskczt9k2fw`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        subject: subject,
        content: query
        })
      }
    );
    console.log(response);
    console.log(subject, query)
    if (response.status === 201) {
      
      setMsg([`Thank you. Your response has been recorded.`, `Back to My Panel`]);
      handleShow();
      // localStorage.removeItem("customerInformation");
    } else {
      setMsg([`There was an error while submitting your query/comment.`, `Back`]);
      handleShow();
    }
  }
    const handleClose = () => {
      setShow(false);
      if(msg[1] === `Back to My Panel`)
      {
        window.location.href = "/CustomerPanel";
      }
  
    };
    const handleShow = () => setShow(false);

    const queryChangeHandler = (event) =>{
        console.log(event.target.value)
        setQuery(event.target.value)
    }
    const subjectChangeHandler = (event) =>{
        console.log(event.target.value)
        setSubject(event.target.value)
    }
    return (
      <div>
          <CustomerNavbar/>
          <Memory panel="Customer Panel" current="Forms"/>
          <h1>Contact Apnay Rung</h1>
          <div>
              <h3 className="contact-form">Hello {userstate.name}!</h3>
              
              <form className="form-product">
              <p className="label-form">How may we help you? Please submit your queries using this form.<br/>
              Our team will reach out to you.</p>
              <p className="label-form-2">Queries and Comments</p>
              <p className="label-form">Subject</p>
              <input
                  className="input-form"
                  type="text"
                  // name="subject"
                  onChange={subjectChangeHandler}
              ></input>
              <p className="label-form">Content</p>
              <textarea
              className="input-des-2"
              type="text"
              // name="additional_info"
              placeholder="e.g. Hi. I have a query. Can you help?"
              onChange={queryChangeHandler}
              rows="4"
              cols="50"
              ></textarea>
              <div className="checkout-buttons">
              {/* <Link to="/CustomerPanel"> */}
              <input
                  type="submit"
                  className="submit-button2"
                  value="Submit"
                  onClick={SubmitHandler}
              ></input>
              </div>
              {/* </Link> */}
              </form>
              <br/>
          </div>
          <BottomBar/>
          <Modal show={show} onHide={handleClose} className="delete-modal">
            <Modal.Header closeButton>
              <Modal.Title>Add Query</Modal.Title>
            </Modal.Header>
            <Modal.Body>{msg[0]}</Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                className="delete-primary"
                onClick={handleClose}
              >
                {msg[1] !== "Back" ? <Link to="./CustomerPanel">{msg[1]}</Link> : msg[1]}
              </Button>
            </Modal.Footer>
          </Modal>
      </div>
    )
}
export default AddQuery;