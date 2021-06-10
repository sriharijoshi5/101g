import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { NavLink } from "react-router-dom";
import { COLOR } from "../Constants/Color";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const activeStyle = {borderBottom:`3px ${COLOR.BUTTON_SUCCESS_BLUE} solid`};
    const style = {borderBottom:'none',paddingBottom:'1px'};


    return (
        <div className="top_bar">
            <Navbar dark className="color_nav" expand="md" >
                <NavbarBrand href="/home" className="mr-auto"> 
                    <span style={{float:"left",marginTop:"5px"}}>Synamedia</span>
                    
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="ml-4 mr-2">
                            <NavLink className="nav-link" activeStyle={activeStyle} style={style} to="/home">
                                <span>Home</span>
                            </NavLink>
                        </NavItem>
                        <NavItem className="ml-4 mr-2">
                            <NavLink className="nav-link" activeStyle={activeStyle} style={style} to="/about">
                                <span>About</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <UncontrolledDropdown  inNavbar className="user_icon">
                        <DropdownToggle className="user_icon" style={{padding:2,borderRadius:100}}>
                            <AccountCircleIcon fontSize="large" /> 
                        </DropdownToggle>
                        <DropdownMenu right >
                            <DropdownItem >
                                Account
                            </DropdownItem>
                            <DropdownItem >
                                Settings
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header;
