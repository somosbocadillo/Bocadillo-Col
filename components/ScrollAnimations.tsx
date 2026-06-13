"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollAnimations() {
  useEffect(() => {
    // Check for user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. HERO PAGE LOAD ANIMATIONS
    const heroTl = gsap.timeline();
    
    heroTl.fromTo(
      ".hero-welcome-tag",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    heroTl.fromTo(
      ".hero-title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    );

    heroTl.fromTo(
      ".hero-description",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    heroTl.fromTo(
      ".hero-cta-group",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    // 2. SCROLL REVEALS FOR ALL SECTIONS
    const sections = ["#about", "#menu", "#schedule", "#location"];

    sections.forEach((selector) => {
      const section = document.querySelector(selector);
      if (!section) return;

      const title = section.querySelector("h2");
      const subtitle = section.querySelector(".about-subtitle, .section-subtitle");
      
      // Select main inner elements for staggered reveal
      const revealItems = section.querySelectorAll(
        "p, .about-photo-wrapper, .menu-controls, .menu-card-tilt, .side-menu-wrapper, .schedule-card, .location-map-wrapper, .location-details"
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%", // Triggers when the top of the section hits 78% of the viewport height
          toggleActions: "play none none none",
        }
      });

      if (subtitle) {
        scrollTl.fromTo(
          subtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      }

      if (title) {
        scrollTl.fromTo(
          title,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (revealItems.length > 0) {
        scrollTl.fromTo(
          revealItems,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.15, // stagger entry of cards, map, details
            ease: "power3.out" 
          },
          "-=0.4"
        );
      }
    });

    // Cleanup triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
