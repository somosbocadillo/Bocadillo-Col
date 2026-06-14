export default function Footer() {
  return (
    <footer className="brand-footer">
      {/* Pattern separator */}
      <div className="checkerboard cream-dark"></div>

      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-info">
            <h2 className="footer-logo script-font">Bocadillo</h2>
            <p className="footer-slogan">
              Pensaste en dulce. Terminaste antojado de hamburguesas y choriperros.
            </p>
          </div>

          {/* Contact and Orders */}
          <div className="footer-contact">
            <h3>Pedidos y Domicilios</h3>
            <p className="footer-phone">
              <a href="tel:573116895379" className="highlight-orange">
                311 689 5379
              </a>
            </p>
            <p className="footer-address">
              📍 Cra 22 # 47 - 46, Barrio Altamira, Palmira
            </p>
          </div>

          {/* Social and Links */}
          <div className="footer-social">
            <h3>Síguenos</h3>
            <p className="footer-instagram">
              <a 
                href="https://www.instagram.com/bocadillo.col/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="instagram-link"
              >
                @Bocadillo.col
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Bocadillo. Todos los derechos reservados.</p>
          <p className="footer-author">
            Desarrollado por{" "}
            <a 
              href="https://scibaru-ai.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Scibaru AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
