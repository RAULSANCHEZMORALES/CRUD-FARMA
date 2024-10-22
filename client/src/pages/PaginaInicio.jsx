import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import INSUMOS from '../img/INSUMOS.png';
import INVESTIGACION from '../img/INVESTIGACION.png';
import PROCESOS from '../img/PROCESOS.png';
import SERVICIOS from '../img/SERVICIOS.png';
import LoadingScreen from '../components/LoadingScreen';

const Header = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '10px', marginTop: '0px' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <h1 style={{ marginLeft: '410px'}}>LABORATORIOS FORGAMA S.A DE C.V</h1>
      </div>
      {/* Otros elementos del encabezado, como el menú de navegación, pueden ir aquí */}
    </header>
  );
};

const Carousel = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" style={{ marginBottom: '20px' }}>
      <div className="carousel-indicators">
        {/* Indicators */}
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img1} className="d-block mx-auto img-fluid" style={{ maxWidth: '50%' }} alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>LABORATORIOS FORGAMALABS</h5>
            <p>LAB</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={img2} className="d-block mx-auto img-fluid" style={{ maxWidth: '50%' }} alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={img3} className="d-block mx-auto img-fluid" style={{ maxWidth: '50%' }} alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Body = () => {
  return (
    <main>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={PROCESOS} className="card-img-top" style={{ maxWidth: '30%',marginTop :'10px' }} alt="..." />
          </div>

            <div className="card-body">
           <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h5 className="card-title">PROCESOS</h5>
            </div>
              <p>- Maquila de suplementos       alimenticios y cosméticos
                  - Optimización de Procesos
                  - Asistencia Técnica a Planta
                  - Transferencia de Tecnología
                  - Escalamientos
              </p>
          </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={INVESTIGACION} className="card-img-top" style={{ maxWidth: '30%' ,marginTop :'10px'}} alt="..." />
          </div>
            <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h5 className="card-title">INVESTIGACION Y DESARROLLO</h5>
            </div>
              <p>- Desarrollo de Formulaciones para Genéricos Intercambiables
                - Apego a las Guías ICH
                - Métodos Analíticos
                - Pruebas de Permeabilidad 
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={SERVICIOS} className="card-img-top" style={{ maxWidth: '30%',marginTop :'10px' }} alt="..." />
          </div>
            <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h5 className="card-title">SERVICIOS</h5>
            </div>
              <p>- Estudios de Bioequivalencia
                  - Estudios de Perfiles de Disolución
                  - Almacenamiento para Estabilidad
                  -Tramites regulatorios (Revisión de marbetes, etiquetas, armado de dossier técnico, generación de avisos de funcionamiento y licencias sanitarias)
                  - Mantenimiento de Cromatógrafos
                  - Revisión de Patente y Traducciones Técnicas

              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={INSUMOS} className="card-img-top" style={{ maxWidth: '30%',marginTop :'10px' }} alt="..." />
          </div>
            <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h5 className="card-title">INSUMOS</h5>
            </div>
              <p>- Columnas de Cromatografía
                  - Acrodiscos
                  - Membranas para Filtración
                  - Material de Laboratorio
             </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#243A60', color: '#FFFFFF', width: '100%', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
      {/* Aquí puedes agregar el contenido del pie de página */}
      <p style={{ fontSize: '20px', margin: '0' }}>Derechos de Autor © {new Date().getFullYear()} LABORATORIOS FORGAMA S.A DE C.V. Todos los derechos reservados.</p>
      {/* Otros elementos del pie de página, como enlaces adicionales, pueden ir aquí */}
    </footer>
  );
};

const ClientePlantilla = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga (puedes ajustar este valor)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div style={{ backgroundColor: '#F2F2F2' }}>
      <Header />
      <Carousel />
      <Body/>
      <Footer />
    </div>
  );
};

export default ClientePlantilla;
