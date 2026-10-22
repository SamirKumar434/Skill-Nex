"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut } from "lucide-react";

interface MenuItem {
  name: string;
  path: string;
  sectionId?: string;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile menu only
  const [activeItem, setActiveItem] = useState("Home");

  // Auth mock state (can be hooked to user state)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Lock to avoid immediate scrollspy override during programmatic smooth scroll
  const isManualClickRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Menu items - Problems and Visualize removed as requested
  const menuItems: MenuItem[] = [
    { name: "Home", path: "#hero", sectionId: "hero" },
    { name: "Roadmap", path: "#roadmap", sectionId: "roadmap" },
    { name: "Contact Us", path: "#faq", sectionId: "faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      if (isManualClickRef.current) return;

      // When near the bottom of page, activate last item (Contact Us)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollY + windowHeight >= documentHeight - 120) {
        setActiveItem("Contact Us");
        return;
      }

      // Check sections from bottom to top
      const sections = [
        { name: "Contact Us", id: "faq" },
        { name: "Roadmap", id: "roadmap" },
        { name: "Home", id: "hero" },
      ];

      // Offset from top of viewport to trigger active button change
      const offset = 220;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveItem(section.name);
            return;
          }
        }
      }

      // Default to Home if at top
      if (scrollY < 200) {
        setActiveItem("Home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on initial load

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  // Keyboard accessibility and window resize listener for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavClick = (name: string) => {
    setActiveItem(name);
    isManualClickRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 800);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 p-3 sm:p-4 transition-all duration-300 border-none outline-none ${
        isScrolled || isMenuOpen
          ? "bg-black/75 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Logo - smoothly slides out to the left and fades when scrolled */}
        <div
          className={`transition-all duration-500 transform ${
            isScrolled
              ? "lg:opacity-0 lg:-translate-x-10 lg:pointer-events-none"
              : "opacity-100 translate-x-0"
          }`}
        >
          <a
            href="#hero"
            onClick={() => handleNavClick("Home")}
            className="flex items-center gap-2 text-lg sm:text-2xl font-bold text-white group"
          >
            <span className="text-[#8B5CF6] font-mono tracking-tight group-hover:scale-105 transition-transform">
              {"<>"}
            </span>{" "}
            Skill<span className="text-[#A855F7]">Nex</span>
          </a>
        </div>

        {/* Navigation Pill (desktop only) - centers with mx-auto when scrolled */}
        <div
          className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border border-white/10 bg-[#12101B]/80 backdrop-blur-md transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${
            isScrolled ? "mx-auto" : ""
          }`}
        >
          {menuItems.map((item) => {
            const isActive = activeItem === item.name;

            return (
              <a
                key={item.name}
                href={item.path}
                onClick={() => handleNavClick(item.name)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right side: Auth UI + mobile hamburger - smoothly slides out to the right when scrolled */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Auth UI */}
          <div
            className={`transition-all duration-500 transform ${
              isScrolled
                ? "lg:opacity-0 lg:translate-x-10 lg:pointer-events-none"
                : "opacity-100 translate-x-0"
            }`}
          >
            {!isAuthenticated ? (
              <div className="flex items-center gap-1.5 sm:gap-3">
                <a
                  href="#faq"
                  className="text-white text-xs sm:text-sm font-medium px-2 sm:px-4 hover:text-[#A855F7] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] rounded-lg whitespace-nowrap"
                >
                  Login
                </a>
                <a
                  href="/dashboard"
                  className="h-8 sm:h-10 bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_0_20px_rgba(139,92,246,0.45)] text-white rounded-full px-3.5 sm:px-6 inline-flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] whitespace-nowrap"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((o) => !o)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-purple-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
                  aria-label="User profile menu"
                  aria-expanded={isDropdownOpen}
                >
                  S
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 p-2 bg-[#0D0B16] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl z-50">
                    <div className="px-3 py-2 border-b border-white/5 mb-2">
                      <div className="text-xs text-gray-400">Signed in as</div>
                      <div className="font-bold text-white text-sm">SkillNex User</div>
                    </div>
                    <a
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <User size={15} /> Dashboard
                    </a>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors mt-1"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger (mobile / tablet only) */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-[#151222]/80 text-white hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 p-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#090714]/95 backdrop-blur-xl shadow-2xl z-50">
            {menuItems.map((item) => {
              const isActive = activeItem === item.name;
              const baseClass =
                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all";
              const idleClass =
                "text-gray-400 hover:text-white hover:bg-white/5";

              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={() => {
                    handleNavClick(item.name);
                    setIsMenuOpen(false);
                  }}
                  className={`${baseClass} ${
                    isActive
                      ? "bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] font-semibold"
                      : idleClass
                  }`}
                >
                  {item.name}
                </a>
              );
            })}

            {/* Auth actions for mobile menu */}
            {!isAuthenticated ? (
              <div className="flex gap-2 pt-2 border-t border-white/5 mt-1">
                <a
                  href="#faq"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:text-[#A855F7] bg-white/5 transition-all"
                >
                  Login
                </a>
                <a
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5 mt-1">
                <div className="px-4 py-1 text-xs text-gray-400">
                  Signed in as <span className="text-white font-semibold">SkillNex User</span>
                </div>
                <a
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all"
                >
                  <User size={15} /> Dashboard
                </a>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}


