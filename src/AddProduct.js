import "./styles.css";
import "./momina.css";
import "./vafa.css";
import React, { useState } from "react";
import SellerNavbar from "./SellerNavbar";
import Memory from "./Memory";
import BottomBar from "./BottomBar";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddProduct = () => {
  let tokenID = localStorage.getItem("Token");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [values, setValues] = useState({
    fileName:"",
    file: "",
    tempFile: ""
  });
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [msg, setMsg] = useState([``]);
  const [show, setShow] = useState(false);
  
  const SubmitHandler = async(event) => {
    event.preventDefault();
    setPrice(parseInt(price))
    setStock(parseInt(stock))
    console.log("in submit")
    let response;
    response = await sendData();
    console.log("coming p")
    console.log(response)
    if (response.status === 201 || response.status === 200) {
      setMsg([`Product added to inventory successfully!`, `Back to My Panel`]);
      handleShow();
    } else {
      setMsg([`There was an error while adding the product.`, `Back`]);
      handleShow();
    }
  }

  const fileHandler = (e) => {
    console.log(e.target.files[0])
    setValues({
      fileName: "",
      file: e.target.files[0],
      tempFile: e.target.files[0].name
    });
    // values.tempFile = values.file.name;
    console.log(values);
  };

  const setFile = (event) => {
    event.preventDefault();
    if (values.tempFile){
      values.fileName = values.tempFile
    }
  }
  async function sendData() { //to submit data to the backend
    // console.log(`token is ${tokenID}`)
    const form = document.getElementById("empty-form");
    const fileObj = new FormData(form);
    console.log(title,description, category)
    fileObj.append("title", title);
    fileObj.append("description", description);
    fileObj.append("category", category);
    fileObj.append("image", values.file, values.fileName);
    fileObj.append("price", price);
    fileObj.append("stock", stock);
    console.log("IM ERERREER")
    console.log(fileObj)
    try{
      const response = await fetch(
        "https://apnay-rung-api.herokuapp.com/inventory/new",
        {
          method: "POST",
          withCredentials: true,
          credentials: "include",
          headers: {Authorization:
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJyb2hhbiIsInR5cGVPZlVzZXIiOiJzZWxsZXIiLCJpYXQiOjE2MTgwNTY1NTl9.tLCUDNdB0thVcK58QLx6itWMSW6FNYssLahnWueLrF0`
          },
          body: fileObj
        }  
      );
      return response; 
    }
    catch(err){
      console.log(err)
    }
  }
  const handleClose = () => {
    setShow(false);
    if(msg[1] === `Back to My Panel`)
    {
      window.location.href = "/SellerPanel";
    }

  };
  const handleShow = () => setShow(true);
  const TitleChangeHandler = (event) => {
    // console.log("in title", event.target.value)
    setTitle(event.target.value);
    console.log("in title", title)
  };
  const DescriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const CategoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };
  const PriceChangeHandler = (event) => {
    console.log(values)
    setPrice(event.target.value);
  };
  const StockChangeHandler = (event) => {
    setStock(event.target.value);
  };

  return (
    <div className="productForm">
      <SellerNavbar />
      <Memory panel="Seller Panel " page="" current=" Add Product" />{" "}
      <h1>Add Product</h1>
      <form
          enctype="multipart/form-data"
          method="POST"
          id="empty-form"
        ></form>
      <form className="form-product" enctype="multipart/form-data" onSubmit={SubmitHandler}>
        <p className="label-form"> Product Title </p>
        <input
          className="input-form"
          type="text"
          name="title"
          placeholder="e.g. Shawl"
          onChange={TitleChangeHandler}
        ></input>
        <p className="label-form"> Product Description </p>
        <textarea
          className="input-des"
          type="text"
          name="description"
          placeholder="e.g. Color: purple, Length: 2m"
          onChange={DescriptionChangeHandler}
          rows="4"
          cols="50"
        ></textarea>
        <p className="label-form"> Product Category </p>
        <select
          className="input-form"
          name="category"
          // value="Bags"
          onChange={CategoryChangeHandler}
        >
          <option value="">--</option>
          <option value="Bags">Bags</option>
          <option value="Decor">Decor</option>
          <option value="Clothing">Clothing</option>
          <option value="Footwear">Footwear</option>
          <option value="Jewellery">Jewellery</option>
          <option value="Crockery">Crockery</option>
        </select>
        <p className="label-form">Upload Product Image</p>
        <div>
            <label for="upload-photo" className="input-form">
              {values.fileName}
            </label>
            <input
              type="file"
              name="image"
              accept="image/*, application/pdf"
              onChange={fileHandler}
              id="upload-photo"
            />
            <button className="upload" onClick = {setFile}>Upload</button>
          </div>
        <p className="label-form">Product Price</p>
        <input
          className="input-form"
          type="number"
          name="price"
          placeholder="e.g. 2000"
          onChange={PriceChangeHandler}
        ></input>
        <p className="label-form">Number of Pieces in Stock</p>
        <input
          className="input-form"
          type="number"
          name="stock"
          placeholder="e.g. 20"
          onChange={StockChangeHandler}
        ></input>
        <br />
        <div className="checkout-buttons">
          <input
            type="submit"
            className="submit-button2"
            value="Submit"
          ></input>
        </div>
      </form>
      <BottomBar />
      <Modal show={show} onHide={handleClose} className="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg[0]}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="delete-primary"
            onClick={handleClose}
          >
            {msg[1] !== "Back" ? <Link to="./SellerPanel">{msg[1]}</Link> : msg[1]}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddProduct;
