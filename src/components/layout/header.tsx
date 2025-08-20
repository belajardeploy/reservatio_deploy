"use client";
import BengkodLogo from "@/components/logo/Logo";
import { Menu, UserRound, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SideLink from "@/components/link/SideLink";
import BreadCrumb from "@/components/BreadCrumb";
import DangerAltButton from "@/components/button/DangerAltButton";
import { ContentMainLinks, ContentOtherLinks } from "@/app/user/_components/content/ContentLink";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface headeruserprops {
  sessiondata: any;
  className?: string;
}

const HeaderUser = ({ sessiondata, className }: headeruserprops) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`sticky top-0 self-start z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 transition-all duration-300 ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* BREADCRUMB JUMP FIRST ROUTE */}
            <div className="my-auto lg:block hidden flex-1">
              <BreadCrumb separator=">" />
            </div>

            {/* Logo for mobile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <BengkodLogo className="relative z-10" />
            </motion.div>

            {/* Desktop Profile DropdownInput - Simplified */}
            <div className="dropdown ml-auto mr-4 lg:block hidden">
              <div
                tabIndex={0}
                className="flex items-center border-0 bg-transparent cursor-pointer"
              >
                <Image
                  src={sessiondata?.photo || "/placeholder.svg"}
                  width={56}
                  height={56}
                  className="rounded-full ml-2 h-[56px] w-[56px] object-cover"
                  alt="profile photo"
                  unoptimized
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-lg z-1 min-w-[300px] p-4 shadow-md border-neutral-4 border-[1px] -right-8"
              >
                <div className="flex flex-col gap-y-2">
                  <div className="px-2 border-b-2 border-b-neutral-4 pb-2">
                    <p className="text-primary-1 text-xs font-light">
                      {sessiondata?.email_mhs}
                    </p>
                    <p className="text-black text-sm font-semibold mt-1">
                      {sessiondata?.name}
                    </p>
                  </div>
                  <Link
                    href="/user/profil"
                    className="flex gap-x-2 items-center hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => {
                      // Close dropdown by removing focus
                      const dropdown = document.activeElement as HTMLElement;
                      if (dropdown) dropdown.blur();
                    }}
                  >
                    <UserRound size={16} strokeWidth={1} className="" />
                    <p className="text-xs">Profile</p>
                  </Link>
                  <DangerAltButton
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </DangerAltButton>
                </div>
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg"
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

      {/* Mobile Menu Overlay - Top to Bottom */}
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

            {/* Menu Content - DropdownInput from top */}
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
                {/* Main Navigation Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="space-y-2"
                >
                  {ContentMainLinks.map((data, index) => (
                    <SideLink
                      key={index}
                      href={data.href}
                      className="block py-3 px-4 rounded-xl hover:bg-[#1E3A8A]/10 transition-colors duration-200 text-base font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {data.label}
                    </SideLink>
                  ))}
                </motion.div>
                {/* Divider */}
                <div className="border-t border-gray-200" />
                {/* Other Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="space-y-2"
                >
                  {ContentOtherLinks.map((data, index) => (
                    <SideLink
                      key={index}
                      href={data.href}
                      className="block py-3 px-4 rounded-xl hover:bg-[#1E3A8A]/10 transition-colors duration-200 text-base font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {data.label}
                    </SideLink>
                  ))}
                </motion.div>
                {/* Logout Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="space-y-4"
                >
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 text-center py-4 rounded-xl font-semibold shadow-lg text-base transition-all duration-300 border border-red-200 hover:border-red-300 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center gap-2">
                      Logout
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderUser;
