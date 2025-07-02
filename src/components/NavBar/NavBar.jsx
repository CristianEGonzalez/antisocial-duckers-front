import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const cerrarSesion = async () => {
        await logout();
        navigate('/login'); 
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsUserDropdownOpen(false); // Cierra el dropdown de usuario para menú móvil
    };

    const toggleUserDropdown = (e) => {
        e.preventDefault();
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleNavLinkClick = () => {
        setIsMobileMenuOpen(false); // Cierra el menú móvil al hacer clic en un enlace
        setIsUserDropdownOpen(false); // Cierra el dropdown al hacer clic en un enlace
    };

    return (
        <header className="navbar-custom">
            <div className="navbar-content-wrapper">
                {/* Menú hamburguesa para móvil */}
                <button
                    onClick={toggleMobileMenu}
                    className="navbar-toggler-custom"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon-custom"></span> {/* Icono de hamburguesa */}
                </button>

                {/* Navegación principal - Se adapta para escritorio y móvil */}
                <nav className={`navbar-links-main ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <NavLink to="/" className="nav-link-custom" onClick={handleNavLinkClick}>
                        <i className="bi bi-house"></i> Home
                    </NavLink>
                    <NavLink to="/publicaciones" className="nav-link-custom" onClick={handleNavLinkClick}>
                        <i className="bi bi-house"></i> Publicaciones
                    </NavLink>

                    {/* Dropdown Usuario */}
                    <div className={`dropdown-custom ${isUserDropdownOpen ? 'show' : ''}`}>
                        <span
                            className="nav-link-custom"
                            role="button"
                            onClick={toggleUserDropdown}
                        >
                            <i className="bi bi-person-circle"></i>Usuario
                        </span>

                        <div className="dropdown-menu-custom">
                            {!usuario && (<>
                                <NavLink to="/login" className="dropdown-item-custom" onClick={handleNavLinkClick}>
                                    <i className="bi bi-plus-square"></i>Iniciar sesión
                                </NavLink>
                            </>)
                            }

                            {usuario && (<>
                                <NavLink to="/perfil" className="dropdown-item-custom" onClick={handleNavLinkClick}>
                                    <i className="bi bi-person"></i>Perfil
                                </NavLink>
                                <NavLink to="/crearPublicacion" className="dropdown-item-custom" onClick={handleNavLinkClick}>
                                    <i className="bi bi-plus-square"></i>Crear Publicación
                                </NavLink>
                            
                                <div className="dropdown-divider-custom"></div>
                                <NavLink to="/" className="dropdown-item-custom" onClick={() => { handleNavLinkClick(); cerrarSesion()}}>
                                    <i className="bi bi-box-arrow-right"></i>Logout
                                </NavLink>
                            </>)
                            }
                        </div>
                    </div>
                </nav>
            </div>

            {isMobileMenuOpen && <div className="mobile-overlay" onClick={toggleMobileMenu}></div>}
        </header>
    );
};

export default Navbar;