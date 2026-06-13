"use client";

import { useState } from "react";
import MenuItem from "./MenuItem";

interface MenuData {
  id: string;
  name: string;
  price: number;
  description: string;
  imgUrl: string;
  category: "classics" | "specials" | "choriperros";
}

const menuItems: MenuData[] = [
  {
    id: "h1",
    name: "Bocadillo con Queso",
    price: 18000,
    description: "Carne Angus jugosa de 170 g, queso americano, tocineta crujiente, lechuga fresca y nuestras salsas de la casa.",
    imgUrl: "/img/editada 1.png",
    category: "classics"
  },
  {
    id: "h2",
    name: "Bocadillo Clásica",
    price: 20000,
    description: "Carne Angus jugosa de 170 g, queso americano, tocineta crujiente, cebolla caramelizada, lechuga fresca y nuestras salsas de la casa.",
    imgUrl: "/img/editada 1.png",
    category: "classics"
  },
  {
    id: "h3",
    name: "Bocadillo Doble",
    price: 28000,
    description: "Doble carne Angus de 170 g, doble queso americano, doble tocineta, cebolla caramelizada y nuestras salsas de la casa.",
    imgUrl: "/img/editada 2.png",
    category: "specials"
  },
  {
    id: "h4",
    name: "Bocadillo Quesudo",
    price: 32000,
    description: "Doble carne Angus de 170 g, queso americano, queso fundido, doble tocineta, cebolla caramelizada y nuestras salsas de la casa.",
    imgUrl: "/img/editada 2.png",
    category: "specials"
  },
  {
    id: "h5",
    name: "Bocadillo con To'",
    price: 30000,
    description: "Doble carne Angus de 170 g, queso americano, tocineta crujiente, cebolla caramelizada, papas a la francesa por dentro y nuestras salsas de la casa.",
    imgUrl: "/img/editada 3.png",
    category: "specials"
  },
  {
    id: "c1",
    name: "Chori Smash",
    price: 19000,
    description: "Chorizo de la casa, carne Angus estilo smash de 170 g, queso americano, tocineta crujiente, lechuga fresca y nuestras salsas de la casa.",
    imgUrl: "/img/editada 4.png",
    category: "choriperros"
  },
  {
    id: "c2",
    name: "Choriqueso",
    price: 15000,
    description: "Chorizo de la casa, queso americano, tocineta crujiente, lechuga fresca y nuestras salsas de la casa.",
    imgUrl: "/img/editada 4.png",
    category: "choriperros"
  }
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "classics" | "specials" | "choriperros">("all");
  const [isComboActive, setIsComboActive] = useState(false);

  const filteredItems = menuItems.filter(item => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const handleOrder = (name: string) => {
    const baseMessage = `¡Hola Bocadillo! Me gustaría pedir ${isComboActive ? "en combo" : ""} el producto: ${name}.`;
    const encodedMessage = encodeURIComponent(baseMessage);
    const whatsappUrl = `https://wa.me/573116895379?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-title-wrapper text-center">
          <span className="section-subtitle script-font">El Verdadero Sabor</span>
          <h2 className="section-title">Nuestra Carta</h2>
          <div className="checkerboard-tiny"></div>
        </div>

        {/* Menu Controllers (Filters & Combo Toggle) */}
        <div className="menu-controls">
          {/* Category Filters */}
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              Todo
            </button>
            <button 
              className={`filter-btn ${activeCategory === "classics" ? "active" : ""}`}
              onClick={() => setActiveCategory("classics")}
            >
              Clásicas
            </button>
            <button 
              className={`filter-btn ${activeCategory === "specials" ? "active" : ""}`}
              onClick={() => setActiveCategory("specials")}
            >
              Especiales
            </button>
            <button 
              className={`filter-btn ${activeCategory === "choriperros" ? "active" : ""}`}
              onClick={() => setActiveCategory("choriperros")}
            >
              Choriperros
            </button>
          </div>

          {/* Combo Switcher (Interactive Customizer) */}
          <div className="combo-switcher-container">
            <label className="combo-switch-label">
              <span className="combo-switch-text">
                Hazlo Combo <strong className="highlight-orange">(+$10.000)</strong>
              </span>
              <div className="switch-wrapper">
                <input 
                  type="checkbox" 
                  checked={isComboActive}
                  onChange={(e) => setIsComboActive(e.target.checked)}
                  className="switch-input"
                />
                <div className="switch-slider"></div>
              </div>
            </label>
            <span className="combo-badge-info">Incluye papas + bebida 🥤🍟</span>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="menu-grid">
          {filteredItems.map(item => (
            <MenuItem 
              key={item.id}
              name={item.name}
              price={item.price + (isComboActive ? 10000 : 0)}
              description={item.description}
              imgUrl={item.imgUrl}
              category={item.category}
              onOrderClick={handleOrder}
            />
          ))}
        </div>

        {/* Side Menu (Bebidas y Adicionales) */}
        <div className="side-menu-wrapper">
          <div className="side-menu-container">
            <h3 className="side-menu-title script-font">Bebidas y Adicionales</h3>
            <div className="side-menu-items">
              <div className="side-item">
                <span className="item-name">Papas a la francesa</span>
                <span className="item-dots"></span>
                <span className="item-price">$6.000</span>
              </div>
              <div className="side-item">
                <span className="item-name">Coca-Cola — 1.5 L</span>
                <span className="item-dots"></span>
                <span className="item-price">$9.500</span>
              </div>
              <div className="side-item">
                <span className="item-name">Coca-Cola — 400 ml</span>
                <span className="item-dots"></span>
                <span className="item-price">$5.000</span>
              </div>
              <div className="side-item">
                <span className="item-name">Coca-Cola — 250 ml</span>
                <span className="item-dots"></span>
                <span className="item-price">$3.000</span>
              </div>
              <div className="side-item">
                <span className="item-name">Agua Natural</span>
                <span className="item-dots"></span>
                <span className="item-price">$4.000</span>
              </div>
              <div className="side-item">
                <span className="item-name">Agua con Gas</span>
                <span className="item-dots"></span>
                <span className="item-price">$4.000</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
