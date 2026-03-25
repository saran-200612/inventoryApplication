import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
//import DropdownButton from 'react-bootstrap/DropdownButton';

import {useNavigate} from 'react-router-dom';
import {logoutUser} from '../../Services/LoginService';

const ManagerMenu = () => {
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
    <div  align="center" style={{backgroundColor:'pink'}}>
      <h1 className = "text-center" style={{color:'magenta'}}><u><i>Inventory Manager Menu</i></u></h1>
    </div>
    <Navbar expand="lg" bg="warning">
      <Navbar.Collapse id="basic-navbar-nav">
       <Nav className="me-auto">
          <NavDropdown title="SKU" id="collasible-nav-dropdown"><b>SKU</b>
           <NavDropdown.Item href="/sku-list">SKU List</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Product" id="collasible-nav-dropdown"><b>Product</b>
          <NavDropdown.Item href="">Product List</NavDropdown.Item>
          <NavDropdown.Item href="">Product Analysis</NavDropdown.Item>
        </NavDropdown>
          <NavDropdown title="Transaction Report" id="collasible-nav-dropdown"><b>Transaction Report</b>
          <NavDropdown.Item href="">Out Transaction Report</NavDropdown.Item>
          <NavDropdown.Item href="">In Transaction Report</NavDropdown.Item>
        </NavDropdown>
          <Nav.Link href=""><b>Show User Details</b></Nav.Link>
           <Nav.Link onClick={handleLogout}><b>Logout</b></Nav.Link>
     </Nav>
    </Navbar.Collapse>
  </Navbar>
</div>
 );
 
}
export default ManagerMenu;