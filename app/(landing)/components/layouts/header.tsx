"use client";

import { useCartStore } from "@/app/hooks/use-cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import CartPopup from "../ui/cart-popup";
import { usePathname } from "next/navigation";

export default function Header() {
  const { items } = useCartStore();
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");
  const pathname = usePathname();

  useEffect(() => {
    setActiveSection("home");

    if (pathname !== "/") return;
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // 50% section visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  const navLinks = [
    { href: "#hero-section", id: "hero-section", label: "Home" },
    { href: "#category-section", id: "category-section", label: "Category" },
    {
      href: "#products-section",
      id: "products-section",
      label: "Explore Products",
    },
  ];

  const baseStyle = `
  relative 
  after:content-[''] 
  after:block 
  after:bg-primary 
  after:rounded-full 
  after:h-[3px] 
  after:absolute 
  after:left-1/2 
  after:-translate-x-1/2 
  after:translate-y-1
  after:transition-all
  after:duration-300
  after:ease-in-out
`;

  return (
    <header className="sticky top-0 w-full z-20 backdrop-blur-xl bg-white/50">
      <div className="flex justify-between gap-10 container mx-auto py-7">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="sporton logo"
            width={127}
            height={30}
          />
        </Link>
        <nav className="flex gap-24 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`
          ${baseStyle}
          ${
            activeSection === link.id
              ? "after:w-1/2 after:opacity-100"
              : "after:w-0 after:opacity-0"
          }
        `}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="relative flex gap-10">
          <FiSearch size={24} />
          <button
            className="relative cursor-pointer"
            onClick={() => setIsCartPopupOpen(!isCartPopupOpen)}
          >
            <FiShoppingBag size={24} />
            {items.length ? (
              <div className="bg-primary rounded-full w-3.5 h-3.5 absolute -top-1 -right-1 text-[10px] text-white text-center">
                {items.length}
              </div>
            ) : (
              <></>
            )}
          </button>
          {isCartPopupOpen && <CartPopup />}
        </div>
      </div>
    </header>
  );
}
