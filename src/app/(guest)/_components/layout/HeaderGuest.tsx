"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import CustomLink from "@/components/link/CustomLink";
import BengkodLogo from "@/components/logo/Logo";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import GuestRoute from "../GuestRoute";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  className?: string;
}

const HeaderGuest = ({ className }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnTop, setIsOnTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const role = session?.user.role;
  const link =
    role === "admin"
      ? "/admin/dashboard"
      : role === "operator"
      ? "/operator/dashboard"
      : "/user/dashboard";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setIsOnTop(scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleDashboardClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`transition-all duration-300 ease-in-out top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md ${
          isOnTop
            ? "absolute shadow-none"
            : isScrolled
            ? "fixed translate-y-0 shadow-lg border-b border-gray-100"
            : "fixed -translate-y-full shadow-lg"
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="md:hover:scale-105 hover:scale-100"
            >
              <BengkodLogo className="relative z-10" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <GuestRoute className="relative" />
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              {session ? (
                <CustomLink href={link}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="md:hover:scale-105 hover:scale-100"
                  >
                    <PrimaryButton
                      isLoading={false}
                      className="bg-gradient-to-b from-blue-800 to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-blue-800 hover:shadow-xl text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 text-sm border border-transparent hover:border-blue-700"
                    >
                      Dashboard
                    </PrimaryButton>
                  </motion.div>
                </CustomLink>
              ) : (
                <CustomLink href="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="md:hover:scale-105 hover:scale-100"
                  >
                    <PrimaryButton
                      isLoading={false}
                      className="bg-gradient-to-b from-blue-800 to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-blue-800 hover:shadow-xl text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 text-sm border border-transparent hover:border-blue-700"
                    >
                      Masuk
                    </PrimaryButton>
                  </motion.div>
                </CustomLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-50 p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-[#1E3A8A]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-[#1E3A8A]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-200"
            >
              {/* Header Space */}
              <div className="h-16 lg:h-20 flex items-center justify-between px-4 lg:px-8 border-b border-gray-100">
                <BengkodLogo />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-[#1E3A8A]" />
                </motion.button>
              </div>

              {/* Navigation Content */}
              <div className="px-4 lg:px-8 py-6 space-y-6">
                {/* Navigation Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Navigasi
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="#beranda"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 rounded-xl hover:bg-[#1E3A8A]/10 transition-colors duration-200 text-base font-medium"
                    >
                      Beranda
                    </a>
                    <a
                      href="#facilities"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 rounded-xl hover:bg-[#1E3A8A]/10 transition-colors duration-200 text-base font-medium"
                    >
                      Fasilitas
                    </a>
                    <a
                      href="#rules"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 rounded-xl hover:bg-[#1E3A8A]/10 transition-colors duration-200 text-base font-medium"
                    >
                      Peraturan
                    </a>
                    <a
                      href="#tutorial"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 rounded-xl hover:bg-[#1E3A8A]/10 transition-colors duration-200 text-base font-medium"
                    >
                      Tutorial
                    </a>
                    <a
                      href="#faq"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 rounded-xl hover:bg-[#1E3A8A]/10 transition-colors duration-200 text-base font-medium"
                    >
                      FAQ
                    </a>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Aksi Cepat
                  </h3>
                  {session ? (
                    <Link href={link}>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDashboardClick}
                        className="w-full bg-gradient-to-b from-blue-800 to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-blue-800 text-white text-center py-4 rounded-xl font-semibold shadow-lg text-base transition-all duration-300 border border-[#1E3A8A] hover:border-blue-700 hover:shadow-xl"
                      >
                        <div className="flex items-center justify-center gap-2">
                          Dashboard
                        </div>
                      </motion.button>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLoginClick}
                        className="w-full bg-gradient-to-b from-blue-800 to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-blue-800 text-white text-center py-4 rounded-xl font-semibold shadow-lg text-base transition-all duration-300 border border-[#1E3A8A] hover:border-blue-700 hover:shadow-xl"
                      >
                        <div className="flex items-center justify-center gap-2">
                          Masuk
                        </div>
                      </motion.button>
                    </Link>
                  )}
                </motion.div>

                {/* Footer Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="pt-4 border-t border-gray-200"
                >
                  <div className="text-center space-y-2">
                    <p className="text-xs text-gray-500">
                      Bengkel Koding Coworking Space
                    </p>
                    <p className="text-xs text-gray-400">
                      Universitas Dian Nuswantoro
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderGuest;
