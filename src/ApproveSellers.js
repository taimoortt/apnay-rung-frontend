import "./styles.css";
import "./momina.css";
import AdminNavbar from "./AdminNavbar";
import Memory from "./Memory";
import BottomBar from "./BottomBar";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const ApproveSellers = () => {
  const session = sessionStorage.getItem("logged-in");
  let tokenID = localStorage.getItem("Token");
  const [state, setState] = useState([
    {
      seller_id: 0,
      name: "",
      email: "",
      cnic: "",
      location: "",
      bio: null,
      weeklyartisan: false,
      blocked: true,
      profile_picture: null
    }
  ]);
  const checkSession = () => {
    if (session !== true){
      localStorage.setItem("msg",JSON.stringify("Please Log in to Continue"))
      window.location.href = '/Homepage';
    }
  }

  const [callEffect,setCallEffect]= useState(false)
  const [approval, setApprove] = useState(`approve`)
  const [id, setID] = useState(0);

  async function sendData() {

    const response = await fetch(
      `http://apnay-rung-api.herokuapp.com/seller/${approval}/${id} `,
      {
        method: "PATCH",
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

  const [showPicture, setPictureModal] = useState(false);
  const [cnic, setCnic]=useState()
  const [url, setURL]= useState(0)

  async function getImage(seller_id) {
    setURL(`http://apnay-rung-api.herokuapp.com/seller/cnic/${seller_id}`)
    setPictureModal(true)
  }

  const [msg, setMsg] = useState([``]);
  const [show, setShow] = useState(false);
  
  const handleShow = (message,sellerID,approvalStatus) => {
    setMsg(message)
    setID(sellerID)
    setApprove(approvalStatus)
    setShow(true)
    
  };
  const handleClose = (changeBlock) => {
    setShow(false);
    if(changeBlock === true){
      console.log(`sending to backend`)
      sendData()
    }
    
  };

  const closePicture= () => {
    setPictureModal(false);
  }

  useEffect(() => {
    async function getData(url) {
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
    }

    getData("http://apnay-rung-api.herokuapp.com/seller/all/unapproved").then(
      (response) => {
        console.log(response);
        setState(response);
      }
    );
  }, [callEffect]);


  const renderTableData = () => {
    return state.map((seller, index) => {
      const { seller_id, name, email, location, cnic } = seller; //destructuring
      return (
        <tr className="data">
          <td>{seller_id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{location}</td>
          <td>
            <button className="link-v2" onClick={()=>getImage(seller_id)}>
              View Image
            </button>
          </td>
          <td>
            <button className="link-v2" onClick={()=>handleShow([`Are you sure you want to approve this seller`,`Don't Approve`,`Approve Seller`],seller_id,`approve`)}>
              Approve
            </button>
            |
            <button className="link-v2" onClick={()=>handleShow([`Are you sure you want to reject this seller`,`Don't Reject`,`Reject Seller`],seller_id,`disapprove`)}>
              Reject
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
      <Memory panel="Admin Panel " page="" current=" Approve Sellers" />{" "}
      {/* when three links needed in panel, include a '/' in the middle 'page' argument */}
      <h1>Approve Sellers</h1>
      <div className="table-responsive">
        <table className="table table-size">
          <thead>
            <tr className="top-row">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>CNIC Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <BottomBar />
      <Modal show={showPicture} onHide={closePicture} className="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>CNIC Image</Modal.Title>
        </Modal.Header>
        <Modal.Body><img className="shoppingCart-image" src={url} alt="Logo" /></Modal.Body>
      </Modal>

      <Modal show={show} onHide={handleClose} className="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>Seller Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg[0]}</Modal.Body>
        <Modal.Footer>
        <Button
            variant="secondary"
            className="delete-secondary"
            onClick={()=>handleClose(false)}
          >
            {msg[1]}
            {/* {msg[1] !== "Dont Unblock" ? <Link to="./ViewSellers">{msg[1]}</Link> : msg[1]} */}
          </Button>
          <Button
            variant="primary"
            className="delete-primary"
            onClick={()=>handleClose(true)}
          >
            {msg[2]}
            {/* {msg[2] !== "Dont block" ? <Link to="./ViewSellers">{msg[2]}</Link> : msg[2]} */}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ApproveSellers;
