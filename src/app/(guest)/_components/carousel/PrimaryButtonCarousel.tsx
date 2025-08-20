"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArrowProps {
  onClick?: () => void;
}

export const PrimaryLeftArrow = ({ onClick }: ArrowProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ scale: 1.1, x: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <ChevronLeft className="w-5 h-5 text-[#1E3A8A] group-hover:text-blue-700 transition-colors duration-300" />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/20 to-blue-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full border-2 border-[#1E3A8A]/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </motion.button>
  );
};

export const PrimaryRightArrow = ({ onClick }: ArrowProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ scale: 1.1, x: 4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <ChevronRight className="w-5 h-5 text-[#1E3A8A] group-hover:text-blue-700 transition-colors duration-300" />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/20 to-blue-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full border-2 border-[#1E3A8A]/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </motion.button>
  );
};
