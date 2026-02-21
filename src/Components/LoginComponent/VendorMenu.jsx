import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
//import DropdownButton from 'react-bootstrap/DropdownButton';
import {logoutUser} from '../../services/LoginService';
import {useNavigate} from 'react-router-dom';

const VendorMenu = () => {
    let navigate=useNavigate();
  const handleLogout = () => {
  logoutUser().then(() => {
          localStorage.clear();
          sessionStorage.clear();
          navigate('/');
     })
  };
return (
      <div className=".container">
      <br/>
        <div  align="center" style={{backgroundColor:'yellow'}}>
        <h1 className = "text-center" style={{color:'blue'}}><u><i>Inventory Vendor Menu</i></u></h1>
        </div>
        <Navbar expand="lg" bg="warning">
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
         <Nav.Link href=""><b>Show User Details</b></Nav.Link>
         <Nav.Link onClick={handleLogout}><b>Logout</b></Nav.Link>
         </Nav>
       </Navbar.Collapse>
  </Navbar>
 </div>
  );
 
}
export default VendorMenu;