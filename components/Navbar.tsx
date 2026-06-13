"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#hero" className="navbar-logo">
          <span className="logo-text script-font">Bocadillo</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-desktop-nav">
          <a href="#about" className="nav-link">Nosotros</a>
          <a href="#menu" className="nav-link">Menú</a>
          <a href="#schedule" className="nav-link">Horarios</a>
          <a href="#location" className="nav-link">Contacto</a>
        </nav>

        {/* CTA Button */}
        <div className="navbar-cta-wrapper">
          <a 
            href="https://wa.me/573116895379?text=%C2%A1Hola%20Bocadillo%21%20Me%20gustar%C3%ADa%20pedir%20un%20producto%20de%20su%20men%C3%BA." 
            target="_blank" 
            rel="noopener noreferrer"
            className="navbar-cta-btn"
          >
            Pedir Domicilio
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className={`navbar-toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`navbar-mobile-drawer ${isOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          <a href="#about" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Nosotros</a>
          <a href="#menu" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Menú</a>
          <a href="#schedule" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Horarios</a>
          <a href="#location" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contacto</a>
          <a 
            href="https://wa.me/573116895379?text=%C2%A1Hola%20Bocadillo%21%20Me%20gustar%C3%ADa%20pedir%20un%20producto%20de%20su%20men%C3%BA." 
            target="_blank" 
            rel="noopener noreferrer"
            className="mobile-cta-btn"
            onClick={() => setIsOpen(false)}
          >
            Pedir Domicilio
          </a>
        </nav>
      </div>
    </header>
  );
}
