"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "beranda", label: "Beranda" },
  { id: "facilities", label: "Fasilitas" },
  { id: "rules", label: "Peraturan" },
  { id: "tutorial", label: "Panduan" },
  { id: "faq", label: "FAQ" },
];

interface GuestRouteProps {
  className?: string;
  onLinkClick?: () => void;
}

const GuestRoute = ({ className, onLinkClick }: GuestRouteProps) => {
  const [activeSection, setActiveSection] = useState<string>("beranda");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname.includes("/about") ||
      pathname.includes("/term") ||
      pathname.includes("/privacy")
    ) {
      setActiveSection("");
      return;
    }

    if (pathname !== "/") return;

    const sections = ["beranda", "facilities", "rules", "tutorial", "faq"];
    const options = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [pathname]);

  const scrollToSection = (id: string) => {
    if (pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        const headerHeight = 80;
        const elementPosition = section.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });

        if (onLinkClick) onLinkClick();
      }
    } else {
      router.push(`/#${id}`);
      if (onLinkClick) onLinkClick();
    }
  };

  return (
    <>
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer ${
            activeSection === item.id
              ? "text-[#1E3A8A] font-semibold"
              : "text-gray-600 hover:text-gray-900"
          } ${className}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Scroll to ${item.label}`}
        >
          <span className="relative z-10">{item.label}</span>

          {/* Active indicator */}
          {activeSection === item.id && (
            <motion.div
              layoutId="activeSection"
              className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/10 to-blue-100 rounded-lg"
              initial={false}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          )}

          {/* Hover effect */}
          <motion.div
            className="absolute inset-0 bg-gray-100 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200"
            initial={false}
          />
        </motion.button>
      ))}
    </>
  );
};

export default GuestRoute;
