import { useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow} className="navbar-toggler">
                <span className="navbar-toggler-icon"></span>
            </button>

            <Offcanvas show={show} onHide={handleClose} placement="end" className="bg-success-subtle">
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title className="fw-bold text-success">Menú</Offcanvas.Title>
                </Offcanvas.Header>
                
                <Offcanvas.Body>
                    <Nav className="flex-column gap-2">
                        {/* Dropdown Usuario */}
                        <div className="dropdown">
                            <Nav.Link as="a" className="dropdown-toggle text-success-emphasis fw-medium d-flex align-items-center gap-2 rounded-3 px-3 py-2" role="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const dropdown = e.target.closest('.dropdown');
                                    dropdown.classList.toggle('show');
                                    dropdown.querySelector('.dropdown-menu').classList.toggle('show');
                                }}
                            >
                                <i className="bi bi-person-circle text-success"></i> Usuario
                            </Nav.Link>
                            
                            <div className="dropdown-menu bg-success-subtle border-0 shadow-sm mt-1 ms-3">
                                <Nav.Link as={NavLink} to="/perfil" onClick={handleClose} className="dropdown-item text-success-emphasis rounded-2 d-flex gap-2 align-items-center px-3 py-2">
                                    <i className="bi bi-person"></i> Perfil
                                </Nav.Link>
                                
                                <Nav.Link as={NavLink} to="/crearPublicacion" onClick={handleClose} className="dropdown-item text-success-emphasis rounded-2 d-flex gap-2 align-items-center px-3 py-2">
                                    <i className="bi bi-plus-square"></i> Crear Publicación
                                </Nav.Link>
                                
                                <div className="dropdown-divider my-2"></div>
                                
                                <Nav.Link as={NavLink} to="/" onClick={handleClose} className="dropdown-item text-success-emphasis rounded-2 d-flex gap-2 align-items-center px-3 py-2">
                                    <i className="bi bi-box-arrow-right"></i> Logout
                                </Nav.Link>
                            </div>
                        </div>
                        
                        {/* Home */}
                        <Nav.Link as={NavLink} to="/" onClick={handleClose} className="text-success-emphasis fw-medium d-flex align-items-center gap-2 rounded-3 px-3 py-2">
                            <i className="bi bi-house"></i> Home
                        </Nav.Link>
                        
                        {/* Login */}
                        <Nav.Link as={NavLink} to="/login" onClick={handleClose} className="text-success-emphasis fw-medium d-flex align-items-center gap-2 rounded-3 px-3 py-2">
                            <i className="bi bi-box-arrow-in-right"></i> Login
                        </Nav.Link>
                        
                        {/* Registro */}
                        <Nav.Link as={NavLink} to="/registro" onClick={handleClose} className="text-success-emphasis fw-medium d-flex align-items-center gap-2 rounded-3 px-3 py-2">
                            <i className="bi bi-person-plus"></i> Registro
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Navbar;