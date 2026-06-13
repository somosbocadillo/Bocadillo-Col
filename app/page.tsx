"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuSection from "@/components/MenuSection";
import CustomCursor from "@/components/CustomCursor";
import ScrollAnimations from "@/components/ScrollAnimations";

// Dynamically load R3F Canvas to prevent Server-Side Rendering (SSR) errors
const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => <div className="hero-3d-loading">Cargando 3D...</div>,
});

export default function Home() {
  return (
    <>
      {/* Scroll-driven reveals controller */}
      <ScrollAnimations />

      {/* Custom interactive cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Container */}
      <main>
        
        {/* HERO SECTION */}
        <section id="hero" className="hero-section">
          <div className="container">
            <div className="hero-content-wrapper">
              <span className="hero-welcome-tag script-font">Bienvenidos a</span>
              <h1 className="hero-title">
                Bocadillo
              </h1>
              <p className="hero-description">
                Pensaste en dulce. Terminaste antojado de las mejores hamburguesas y choriperros artesanales de Palmira.
              </p>
              <div className="hero-cta-group">
                <a href="#menu" className="navbar-cta-btn">
                  Ver Carta
                </a>
                <a href="#about" className="hero-cta-secondary">
                  Conócenos
                </a>
              </div>
            </div>
          </div>
          {/* Interactive R3F floating burger ingredients background */}
          <Hero3D />
        </section>

        {/* Checkerboard separator divider */}
        <div className="checkerboard"></div>

        {/* PRESENTATION / ABOUT SECTION */}
        <section id="about" className="about-section">
          <div className="container">
            <div className="about-grid">
              
              {/* Left Column: Storefront / Wrap Photo */}
              <div className="about-photo-wrapper">
                <Image 
                  src="/img/FOTO 1.png" 
                  alt="Bocadillo wrapping and product presentation" 
                  width={600} 
                  height={450} 
                  className="about-photo"
                />
              </div>

              {/* Right Column: Copywriting content */}
              <div className="about-content">
                <span className="about-subtitle script-font">Nuestra Esencia</span>
                <h2 className="about-title">El Antojo Perfecto</h2>
                <p className="about-text">
                  Todo empezó con una idea sencilla: Hacer hamburguesas que valieran la pena recomendar.
                  En Bocadillo no tomamos atajos. Seleccionamos carne Angus jugosa de 170 g, pan artesanal brioche dorado y salsas únicas elaboradas en casa para cada combinación.
                </p>
                <p className="about-text">
                  Nuestro nombre es un guiño de complicidad a la cultura colombiana. Pensaste en dulce, pero terminaste conquistado por el sabor salado, ahumado y crocante de nuestras hamburguesas y choriperros especiales.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Checkerboard separator divider */}
        <div className="checkerboard"></div>

        {/* MENU SECTION (Hamburguesas, Choriperros, Bebidas, Combo Switcher) */}
        <MenuSection />

        {/* Checkerboard separator divider */}
        <div className="checkerboard"></div>

        {/* SCHEDULE / HORARIOS SECTION */}
        <section id="schedule" className="schedule-section">
          <div className="container">
            <div className="schedule-grid">
              
              {/* Left Column: Hours details */}
              <div className="schedule-content">
                <span className="section-subtitle script-font">¿Cuándo visitarnos?</span>
                <h2>Horarios de Atención</h2>
                <p className="schedule-desc">
                  Te esperamos todas las tardes y noches para calmar tu antojo. Ya sea en nuestro acogedor local en el barrio Altamira o directamente en la puerta de tu casa a través de nuestro servicio de domicilio veloz.
                </p>
                <div className="schedule-cards">
                  <div className="schedule-card">
                    <span className="schedule-days">Lunes a Jueves</span>
                    <span className="schedule-hours">5:00 p.m. – 11:00 p.m.</span>
                  </div>
                  <div className="schedule-card">
                    <span className="schedule-days">Viernes a Domingo</span>
                    <span className="schedule-hours">5:00 p.m. – 12:00 a.m.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Decorative wrap visual / logo */}
              <div className="about-photo-wrapper">
                <Image 
                  src="/img/editada 3.png" 
                  alt="Delicious Double Patty burger with melted cheese and wrapping" 
                  width={600} 
                  height={450} 
                  className="about-photo"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Checkerboard separator divider */}
        <div className="checkerboard"></div>

        {/* LOCATION & CONTACT SECTION */}
        <section id="location" className="location-section">
          <div className="container">
            <div className="location-grid">
              
              {/* Left Column: Interactive Map Mockup */}
              <div className="location-map-wrapper">
                <div className="location-map-placeholder">
                  <h3 className="map-placeholder-title script-font">Bocadillo Altamira</h3>
                  <p>Estamos ubicados en una zona central de Palmira, listos para recibirte.</p>
                  <p className="highlight-orange" style={{ fontWeight: 700, marginTop: "8px" }}>
                    Cra 22 # 47 - 46, Altamira
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Carrera+22+%23+47-46,+Palmira,+Valle+del+Cauca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-placeholder-btn"
                  >
                    📍 Abrir en Google Maps
                  </a>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="location-content">
                <span className="section-subtitle script-font">Encuéntranos</span>
                <h2>Ubicación y Pedidos</h2>
                <p className="schedule-desc" style={{ marginBottom: "30px" }}>
                  ¿Tienes dudas de cómo llegar o quieres coordinar un pedido especial para eventos? Escríbenos o visítanos. Contamos con una cocina dedicada y el mejor ambiente para ver tus eventos favoritos.
                </p>
                <div className="location-details">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <div className="detail-text">
                      <strong>Dirección</strong>
                      Cra 22 # 47 - 46, Barrio Altamira, Palmira, Colombia.
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <div className="detail-text">
                      <strong>Pedidos / Domicilios</strong>
                      <a href="tel:573116895379" className="highlight-orange" style={{ fontWeight: 700 }}>
                        311 689 5379
                      </a>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📱</span>
                    <div className="detail-text">
                      <strong>Instagram</strong>
                      <a href="https://www.instagram.com/bocadillo.col/" target="_blank" rel="noopener noreferrer">
                        @Bocadillo.col
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
