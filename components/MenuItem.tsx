"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface MenuItemProps {
  name: string;
  price: number;
  description: string;
  imgUrl: string;
  category: "classics" | "specials" | "choriperros";
  onOrderClick: (name: string) => void;
}

export default function MenuItem({ 
  name, 
  price, 
  description, 
  imgUrl, 
  category, 
  onOrderClick 
}: MenuItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [shadowStyle, setShadowStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    
    // Mouse relative to card center
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    // Maximum 12 degrees of tilt
    const rotateX = -y / (box.height / 2) * 12;
    const rotateY = x / (box.width / 2) * 12;

    // Interactive shadow shifting based on mouse position
    const shadowX = -x / 10;
    const shadowY = -y / 10;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    setShadowStyle(`${shadowX}px ${shadowY}px 25px rgba(10, 51, 29, 0.15), 0 5px 15px rgba(0, 0, 0, 0.08)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setShadowStyle("");
  };

  return (
    <div
      ref={cardRef}
      className="menu-card-tilt"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: transformStyle,
        boxShadow: shadowStyle
      }}
    >
      {/* Category Tag */}
      <span className="card-badge">
        {category === "classics" ? "Clásica" : category === "specials" ? "Especial" : "Choriperro"}
      </span>

      {/* Product Image Container */}
      <div className="card-image-container">
        <Image 
          src={imgUrl} 
          alt={name} 
          width={280} 
          height={200}
          className="card-image"
          priority={false}
        />
      </div>

      {/* Card Body */}
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
        
        <div className="card-footer">
          <span className="card-price">${price.toLocaleString("es-CO")}</span>
          <button 
            className="card-order-btn"
            onClick={() => onOrderClick(name)}
          >
            Pedir
          </button>
        </div>
      </div>
    </div>
  );
}
