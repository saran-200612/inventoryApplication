import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { logoutUser } from '../../services/LoginService';

const AdminMenu = () => {
    let navigate = useNavigate();

    const handleLogout = () => {
        logoutUser().then(() => {
            localStorage.clear();
            sessionStorage.clear();
            navigate('/');
        });
    };

    return (
        <div className="min-vh-100 bg-light">
            {/* Header Section */}
            <div className="bg-primary text-white py-4 shadow-sm">
                <Container>
                    <h1 className="text-center fw-bold mb-2">
                        <span className="fs-1 me-2">📦</span>
                        Inventory Admin Panel
                    </h1>
                    <p className="text-center mb-0 opacity-75">Manage your inventory with ease</p>
                </Container>
            </div>

            {/* Navigation Bar */}
            <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
                <Container>
                    <Navbar.Brand href="#" className="fw-bold">Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="admin-navbar-nav" />
                    <Navbar.Collapse id="admin-navbar-nav">
                        <Nav className="ms-auto">

                            {/* SKU Dropdown */}
                            <NavDropdown
                                title={<span className="fw-semibold">📊 SKU</span>}
                                id="sku-dropdown"
                                className="mx-1"
                            >
                                <NavDropdown.Item href="#sku-list" className="py-2">
                                    <span className="me-2">📋</span> SKU List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#sku-add" className="py-2">
                                    <span className="me-2">➕</span> Add New SKU
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/* Product Dropdown */}
                            <NavDropdown
                                title={<span className="fw-semibold">📦 Product</span>}
                                id="product-dropdown"
                                className="mx-1"
                            >
                                <NavDropdown.Item href="#product-add" className="py-2">
                                    <span className="me-2">➕</span> Add Product
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#product-list" className="py-2">
                                    <span className="me-2">📋</span> Product List
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <DropdownButton
                                    as={ButtonGroup}
                                    key="end"
                                    id="dropdown-button-drop-end"
                                    drop="end"
                                    variant="light"
                                    title="📈 Product Analysis"
                                    className="w-100 border-0"
                                >
                                    <Dropdown.Item href="#all-products-analysis" className="py-2">
                                        All Products Analysis
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#single-product-analysis" className="py-2">
                                        Single Product Demand
                                    </Dropdown.Item>
                                </DropdownButton>
                            </NavDropdown>

                            {/* Transaction Report Dropdown */}
                            <NavDropdown
                                title={<span className="fw-semibold">📄 Reports</span>}
                                id="transaction-dropdown"
                                className="mx-1"
                            >
                                <NavDropdown.Item href="#out-transaction" className="py-2">
                                    <span className="me-2">📤</span> Out Transactions
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#in-transaction" className="py-2">
                                    <span className="me-2">📥</span> In Transactions
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/* User Details Link */}
                            <Nav.Link href="#user-details" className="fw-semibold mx-1">
                                👤 User Details
                            </Nav.Link>

                            {/* Logout Button */}
                            <Nav.Link onClick={handleLogout} className="mx-1">
                                <span className="btn btn-danger btn-sm fw-semibold px-3">
                                    🚪 Logout
                                </span>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default AdminMenu;