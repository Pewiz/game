import './Footer.css';

// Componentes de iconos (simplificados para React)
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

function Footer() {
  return (
    <footer className="footer  w-full">
      <div className="container">
        <div className="row">
          <div className="col-md-4 line">
            <h4>Enlaces de Interés</h4>
            <ul>
              <li>
                <a href="https://www.ulagos.cl/dgac/" target="_blank" rel="noopener noreferrer">
                  Aseguramiento de la Calidad
                </a>
              </li>
              <li>
                <a href="https://pmi.ulagos.cl/" target="_blank" rel="noopener noreferrer">
                  PMI ULagos
                </a>
              </li>
              <li>
                <a href="https://use.ulagos.cl/" target="_blank" rel="noopener noreferrer">
                  Unidad Seguimiento Egresados
                </a>
              </li>
              <li>
                <a href="https://web.helen.cl/web_ulagos/" target="_blank" rel="noopener noreferrer">
                  Fondo Solidario Crédito Universitario
                </a>
              </li>
              <li>
                <a href="https://dai.ulagos.cl/" target="_blank" rel="noopener noreferrer">
                  Análisis Institucional
                </a>
              </li>
              <li>
                <a href="https://www.ulagos.cl/prevencionacoso/" target="_blank" rel="noopener noreferrer">
                  Prevención Acoso
                </a>
              </li>
              <li>
                <a href="https://direcciondegenero.ulagos.cl/" target="_blank" rel="noopener noreferrer">
                  Dirección de Igualdad de Género
                </a>
              </li>
              <li>
                <a href="http://icorporativa.ulagos.cl/" target="_blank" rel="noopener noreferrer">
                  Unidad de Imagen Corporativa
                </a>
              </li>
              <li>
                <a href="http://udedoc.ulagos.cl/" target="_blank" rel="noopener noreferrer">
                  Udedoc
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Empleos y Herramientas</h4>
            <ul>
              <li>
                <a href="http://portaltrabajos.ulagos.cl/" target="_blank" rel="noopener noreferrer">
                  Portal de empleos
                </a>
              </li>
              <li>
                <a href="https://www.ulagos.cl/concursos-publicos/" target="_blank" rel="noopener noreferrer">
                  Llamados a concurso
                </a>
              </li>
              <li>
                <a href="https://biblioteca.ulagos.cl/" target="_blank" rel="noopener noreferrer">
                  Biblioteca en línea
                </a>
              </li>
              <li>
                <a href="https://escritorio.acepta.com/portalboletas/buscarboletaindex.php" target="_blank" rel="noopener noreferrer">
                  Consulta Boleta Electrónica
                </a>
              </li>
              <li>
                <a href="https://admision.ulagos.cl/index.php/admision/carreras/ulagos.cl/sistema-delfos/" target="_blank" rel="noopener noreferrer">
                  Sistema Delfos
                </a>
              </li>
              <li>
                <a href="https://pagos.ulagos.cl/" target="_blank" rel="noopener noreferrer">
                  Pagos Online
                </a>
              </li>
              <li>
                <a href="https://www.ulagosvirtual.cl/login/index.php" target="_blank" rel="noopener noreferrer">
                  ULagosVirtual
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="containerMedio">
          <div className="col-md-4">
            <img
              className="imgFooter"
              src="https://res.cloudinary.com/doq82xcpd/image/upload/v1730388316/u6tzkfnfo6rutj9ljoqe.png"
              alt="Medios Ulagos"
            />
            <ul className="social-links">
              <li>
                <a
                  href="https://web.facebook.com/admision.ulagos?_rdc=1&_rdr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/admision.ulagos/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UC2iG8Kg8uOqa6sFMYH0jo1g"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YoutubeIcon />
                </a>
              </li>
            </ul>
            <div className="brand-data">
              <p className="casaCentral">Casa Central</p>
              <p>Lord Cochrane 1046</p>
              <p>Teléfono 56 642333000</p>
              <p>Osorno, Chile</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
