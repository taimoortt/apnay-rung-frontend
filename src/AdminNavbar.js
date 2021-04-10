import React, { useState } from "react";
import "./styles.css";
import "./momina.css";
import Logo from "./css/logo.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { Link } from "react-router-dom";

// Checking

// import Button from "@material-ui/core/Button";
// import Badge from "@material-ui/core/Badge";
// import { makeStyles } from "@material-ui/core/styles";
// import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(0.5)
//   }
// }));

const Navbar = () => {
  // const classes = useStyles();
  const [home, setHome] = useState(false);
  const [panel, setPanel] = useState(false);
  const [contact, setContact] = useState(false);

  const setHomeClass = () => {
    setHome(true);
    setPanel(false);
    setContact(false);
  };
  const setPanelClass = () => {
    setHome(false);
    setPanel(true);
    setContact(false);
  };
  const setContactClass = () => {
    setHome(false);
    setPanel(false);
    setContact(true);
  };
  return (
    <div className="Topbar">
      <img className="logo" src={Logo} alt="Logo" />
      <Link
        to="/Homepage"
        onMouseEnter={setHomeClass}
        className={home ? "active" : ""}
      >
        Home
      </Link>
      <Link
        to="/AdminPanel"
        onMouseEnter={setPanelClass}
        className={panel ? "active" : ""}
      >
        {" "}
        Panel
      </Link>
      <Link
        to="/Homepage"
        onMouseEnter={setContactClass}
        className={contact ? "active" : ""}
      >
        Contact Us
      </Link>

      <p>
        Admin Name
        <br />
        Admin
      </p>
      <div className="nav-button">
        <Link to="/Notifications">
          <button href="#cart" className="test-notifications-admin">
            <span>
              <NotificationsNoneIcon />
              {/* Logout */}
            </span>
          </button>
        </Link>
        <Link to="/HomePage">
          <button href="#cart" className="test-logout-admin">
            <span>
              <ExitToAppIcon className="rotate-180" />
              {/* Logout */}
            </span>
            <span className="text">Logout</span>
          </button>
        </Link>
      </div>
      {/* <input type="button" className="logout_button" value="Logout" /> */}
    </div>
  );
};
export default Navbar;
