import "./styles.css";
// import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Memory from "./Memory";
import BottomBar from "./BottomBar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Button } from "react-bootstrap";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import GroupIcon from "@material-ui/icons/Group";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import MenuIcon from "@material-ui/icons/Menu";
import EmailIcon from "@material-ui/icons/Email";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const AdminPanel = () => {
  const session = sessionStorage.getItem("logged-in");
  const checkSession = () => {
    console.log("in here")
    if (session !== true){
      localStorage.setItem("msg",JSON.stringify("Please Log in to Continue"))
      window.location.href = '/Homepage';
    }
  }
  const iconStyles = ()=> {
    return {
      buttoncolor: {
        fill: 'white',
        fontSize: 40
      }
    }
  }
  const classes = makeStyles(iconStyles)();
  return (
    <div>
      {/* {checkSession()} */}
      <AdminNavbar />
      <Memory panel="Admin Panel" /> 
      <h1>Admin Panel</h1>
      <br></br>
      <br></br>
      <div className="all-boxes">
        <div className="box-left">
          <div className="box-left-left">
            <Link to="/AdminPanel" className="router-link">
              <button href="#buyers" className="panel-box">
                <span className="icons">
                  <GroupOutlinedIcon
                    className={classes.buttoncolor}
                  />
                </span>
                <span className="text">View All Buyers</span>
              </button>
            </Link>
          </div>
          <div className="box-left-left">
            <Link to="/ViewAllProducts" className="router-link">
              <button href="#products" className="panel-box">
                <span className="icons">
                  <AddShoppingCartIcon
                    className={classes.buttoncolor}
                  />
                </span>
                <span className="text">View All Products</span>
              </button>
            </Link>
          </div>
          <div className="box-left-left">
            <Link to="/ViewAllOrders" className="router-link">
              <button href="#orders" className="panel-box">
                <span className="icons">
                  <MenuIcon
                    className={classes.buttoncolor}
                  />
                </span>
                <span className="text">View All Orders</span>
              </button>
            </Link>
          </div>
          <div className="box-left-left">
            <Link to="/Tutorials" className="router-link">
              <button className="panel-box">
                <span className="icons">
                  <CastForEducationIcon
                   className={classes.buttoncolor}
                  />
                </span>
                <span className="text">Edit Tutorials</span>
              </button>
            </Link>
          </div>
          <div className="box-left-left">
            <Link to="/Notifications" className="router-link">
              <button href="#notifications" className="panel-box">
                <span className="icons">
                  <NotificationsNoneIcon
                    className={classes.buttoncolor}
                  />
                </span>
                <span className="text">Notifications</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="box-right">
          <div className="box-right-right">
            <Link to="/ViewAllSellers" className="router-link">
              <button href="#sellers" className="panel-box">
                <span className="icons">
                  <GroupIcon
                    className={classes.buttoncolor}
                  />
                </span>
                <span className="text">View All Sellers</span>
              </button>
            </Link>
          </div>
          <div className="box-right-right">
            <Link to="/CreateTutorial" className="router-link">
              <button href="#catalog" className="panel-box">
                <span className="icons">
                <CastForEducationIcon
                    className={classes.buttoncolor}
                  />
                </span>
                <span className="text">Add Tutorial</span>
              </button>
            </Link>
          </div>
          <div className="box-right-right">
            <Link to="/QueryForms" className="router-link">
              <button href="#forms" className="panel-box">
                <span className="icons">
                  <EmailIcon
                    className={classes.buttoncolor}
                  />
                </span>
                <span className="text">Query Forms</span>
              </button>
            </Link>
          </div>
          <div className="box-right-right">
            <Link to="/AdminSettings" className="router-link">
              <button href="#settings" className="panel-box">
                <span className="icons">
                  <SettingsIcon
                    className={classes.buttoncolor}
                  />
                </span>
                <span className="text">Account Settings</span>
              </button>
            </Link>
          </div>
          <div className="box-right-right">
            <Link to="/ApproveSellers" className="router-link">
              <button href="#cart" className="panel-box">
                <span className="icons">
                  <GroupOutlinedIcon
                    className={classes.buttoncolor}
                  />
                </span>
                <span className="text">Approve Sellers</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default AdminPanel;
