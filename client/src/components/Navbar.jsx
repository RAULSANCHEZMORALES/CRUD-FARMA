import React from "react";
import { Link } from "react-router-dom";
import LOGO2 from '../img/LOGO2.png';

function Navbar(){
    return (
        <div className="navbar">
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#243A60', width: '100%', padding: '20px' }}>
                <div className="container-fluid">
                    {/* Enlace de la imagen */}
                    <Link className="navbar-brand" to="/pagina-inicio" style={{ fontSize: '30px', display: 'flex', alignItems: 'center' }}>
                        <img src={LOGO2} style={{ width: '200px', marginRight: '10px', cursor: 'pointer' }} alt="Logo" />
                        
                    </Link>
                    {/* Resto de la barra de navegación */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" to="/registro-empleados" style={{ fontSize: '20px' }}>REGISTRO EMPLEADOS</Link>
                            <Link className="nav-link active" to="/registro-insumos" style={{ fontSize: '20px' }}>REGISTRO INSUMOS</Link>
                            <Link className="nav-link active" to="/registro-orden-fabricacion" style={{ fontSize: '20px' }}>NUEVA ORDEN DE FABRICACION</Link>
                            <Link className="nav-link active" to="/productos-terminados" style={{ fontSize: '20px' }}>PRODUCTOS TERMINADOS</Link>
                            <Link className="nav-link active" to="/registro-ventas" style={{ fontSize: '20px' }}>REGISTRO DE VENTAS</Link>
                            <Link className="nav-link active" to="/registro-insumos-clientes" style={{ fontSize: '20px' }}>REGISTRO INSUMOS CLIENTES</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
