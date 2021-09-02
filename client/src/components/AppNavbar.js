import React,{Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import RegisterModel from './auth/RegisterModel';
import LoginModel from './auth/LoginModel';
import Logout from './auth/Logout';

class AppNavbar extends Component{
        state = {
            isOpen:false
        }
        toggle = ()=>{
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
        render(){
            return (
                <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">ShoppingList</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <RegisterModel/>
                                </NavItem>
                                <NavItem>
                                    <LoginModel/>
                                </NavItem>
                                <NavItem>
                                    <Logout/>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://github.com/EngrTAHAR-Noureddine/mern_shopping_list_demo">
                                        Github
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
            );
            
        }

}

export default AppNavbar;