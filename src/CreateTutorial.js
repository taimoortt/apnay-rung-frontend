import "./styles.css";
import "./maham.css";
import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Memory from "./Memory";
import BottomBar from "./BottomBar";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
const CreateTutorial = () =>{
    //add post request to send to backend and uncomment Link on submit button
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    let tokenID = localStorage.getItem("Token");
    const [msg, setMsg] = useState([``]);
    const [show, setShow] = useState(false);
    // admin id`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11aGFtbWFkIFJvaGFuIEh1c3NhaW4iLCJ0eXBlT2ZVc2VyIjoiYWRtaW4iLCJpYXQiOjE2MTY4NDE4MTZ9.HJvh_8caLMReaDmJFCEklgtP9u86usbNIZ4FxOrIawk`

    const SubmitHandler = (event) => {
        event.preventDefault();
        console.log("in submit")
        sendData()
    }
    async function sendData() {
        console.log(`token is ${tokenID}`)
        const response = await fetch(
          "https://apnay-rung-api.herokuapp.com/tutorial/new",
          {
            method: "POST",
            withCredentials: true,
            credentials: "include",
            headers: {
              Authorization: `Bearer ${tokenID}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: link,
                description: description
            })
          }
        );
    
        console.log(response);
        if (response.status === 201) {
          setMsg([`Tutorial Added Successfully!`,`OK`]);
          handleShow();
        } else {
          setMsg([`There was an error adding the tutorial.`, `Back`]);
          handleShow();
        }
      }
    const handleClose = () => {
    setShow(false);
    if(msg[1] === `OK`)
    {
        window.location.href = "/AdminPanel";
    }

    };
    const handleShow = () => setShow(true);

    const titleChangeHandler = (event)=>{
        console.log(`title: ${event.target.value}`)
        setTitle(event.target.value);
    }
    const descriptionChangeHandler = (event)=>{
        console.log(`desc: ${event.target.value}`)
        setDescription(event.target.value);
    }
    const linkChangeHandler = (event)=>{
        console.log(`link: ${event.target.value}`)
        setLink(event.target.value);
    }
    return (
        <div>
            <AdminNavbar/>
            <Memory panel="Admin" page="Tutorials" current="Create Tutorial"/>
            <h1>Create New Tutorial</h1>
            <form className="form-product">
                <p className="label-form"> Title </p>
                <input
                className="input-form"
                type="text"
                name="title"
                placeholder="Enter a title for your video tutorial"
                onChange={titleChangeHandler}
                ></input>
                <p className="label-form">Description</p>
                <textarea
                className="input-des"
                type="text"
                name="description"
                placeholder="Enter descrtiption to explain what the video is about"
                onChange={descriptionChangeHandler}
                rows="4"
                cols="50"
                ></textarea>
                <p className="label-form"> Link ID</p>
                <input
                className="input-form"
                type="text"
                name="link"
                placeholder="Enter Youtube URL of video"
                onChange={linkChangeHandler}
                ></input>
                <div className="checkout-buttons">
                <input
                    type="submit"
                    className="submit-button2"
                    value="Create Tutorial"
                    onClick={SubmitHandler}
                ></input>
                </div>
            </form>
            <br/>
            <br/>
            <BottomBar/>
            <Modal show={show} onHide={handleClose} className="delete-modal">
                <Modal.Header closeButton>
                <Modal.Title>Tutorial</Modal.Title>
                </Modal.Header>
                <Modal.Body>{msg[0]}</Modal.Body>
                <Modal.Footer>
                <Button
                    variant="primary"
                    className="delete-primary"
                    onClick={handleClose}
                >
                    {msg[1] !== "Back" ? <Link to="./AdminPanel">{msg[1]}</Link> : msg[1]}
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default CreateTutorial;