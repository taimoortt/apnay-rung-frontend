import "./styles.css";
import "./momina.css";
import AdminNavbar from "./AdminNavbar";
import Memory from "./Memory";
import BottomBar from "./BottomBar";
import {useState,useEffect} from 'react';
import FormPopup from './FormPopup';
import { Modal, Button } from "react-bootstrap";

const QueryForms = () => {
  const session = sessionStorage.getItem("logged-in");
  let tokenID = localStorage.getItem("Token");
  const [viewForm, setViewForm] = useState(false)
  const [callEffect,setCallEffect]= useState(false)
  const [show, setShow] = useState(false);
  const [id, setID] = useState(0);
  const [state, setState] = useState([
    {
      message_id: 0,
      subject: "",
      content: "",
      customer_id: 0,
      timestamp: ""
    }
  ]);

  const checkSession = () => {
    if (session === false || session === null){
      localStorage.setItem("msg",JSON.stringify("Please Log in to Continue"))
      window.location.href = '/Homepage';
    }
  }
  useEffect(() => {
    const getData = async (url) => {
      const response = await fetch(url, {
        method: "GET",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization:
          `Bearer ${tokenID}`,
          "Content-Type": "application/json"
        }
      });
      return response.json();
    };
    getData("https://apnay-rung-api.herokuapp.com/message/all").then(
    (response) => {
      console.log(`printing response`, response)
      setState(response)
    }
  );
  }, [callEffect]);

  async function sendData() {

    const response = await fetch(
      `https://apnay-rung-api.herokuapp.com/message/${id} `,
      {
        method: "DELETE",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${tokenID}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log(response);

    if (response.status === 200 || response.status === 201 || response.status === 202 ) {
      console.log(`processed ${!callEffect}`)
      setCallEffect(!callEffect)
    }  
  }
  async function sendNotification(customerID) {

    const response = await fetch(
      "http://apnay-rung-api.herokuapp.com/notification/new",
      {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11aGFtbWFkIFJvaGFuIEh1c3NhaW4iLCJ0eXBlT2ZVc2VyIjoiYWRtaW4iLCJpYXQiOjE2MTY4NDE4MTZ9.HJvh_8caLMReaDmJFCEklgtP9u86usbNIZ4FxOrIawk`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title:`Your query form has been received by the Admin. A response email will be sent within 2 days.`,
          type:"message", 
          details: null, 
          customer_id : customerID
        })
      }
    );

    console.log(`response from notification`, response)

  }

  const handleSetViewForm = () => setViewForm(true);

  const handleViewForm =(id,customer_id, subject,content) => {
    const temp = 
    {
      formID:id,
      customerID: customer_id, 
      subject: subject, 
      content: content 
    }
    sendNotification(customer_id)
    localStorage.setItem("form-content", JSON.stringify(temp));
    handleSetViewForm();
  }

  const handleShow = (formID) => {
    setID(formID)
    setShow(true)
  };

  const handleClose = (isDelete) => {
    setShow(false);
    if(isDelete===true){
      console.log(`sending to backend`)
      sendData()
    }
  };

  const renderTableData = () => {
    return state.map((form, index) => {
      const { message_id, subject, content,customer_id, timestamp} = form; //destructuring
      let time = timestamp.split(':')
      time = time[0]

      return (
        <tr className="data">
          <td>{customer_id}</td>
          <td>{message_id}</td>
          <td>{subject}</td>
          <td>{time}</td>
          <td>
            <button className="link-v2" onClick={() => handleViewForm(id,customer_id, subject,content)}>
              View
            </button>
            |
            <button className="link-v2" onClick={()=>handleShow(message_id)}>
               Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      {checkSession()}
      <AdminNavbar />
      <Memory panel="Admin Panel " page="" current=" Query Forms" />{" "}
      <div className="min-height-div">
      <h1>Query Forms </h1>
      <div className="table-responsive">
        <table className="table table-size">
          <thead>
            <tr className="top-row">
              <th>Customer ID</th>
              <th>Message ID</th>
              <th>Subject</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
      </div>
      <FormPopup trigger={viewForm} setTrigger={setViewForm}>
      </FormPopup>
      <Modal show={show} onHide={handleClose} className="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this form?</Modal.Body>
        <Modal.Footer>
        <Button
            variant="secondary"
            className="delete-secondary"
            onClick={()=>handleClose(false)}
          >
            Don't Delete
          </Button>
          <Button
            variant="primary"
            className="delete-primary"
            onClick={()=>handleClose(true)}
          >
            Delete Form
          </Button>
        </Modal.Footer>
      </Modal>
      <BottomBar />
    </div>
  );
};
export default QueryForms;
