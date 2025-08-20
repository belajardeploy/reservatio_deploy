"use client";

import { motion } from "framer-motion";

interface DotsProps {
  onClick?: () => void;
  active?: boolean;
}

const PrimaryDots = ({ onClick, active }: DotsProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative mx-2 transition-all duration-300 ${
        active
          ? "w-10 h-3 bg-gradient-to-r from-[#1E3A8A] to-blue-700 rounded-full shadow-lg"
          : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400"
      }`}
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {active && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/30 to-blue-700/30 rounded-full blur-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] to-blue-700 rounded-full opacity-90" />
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            animate={{ x: [-8, 8, -8] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </motion.button>
  );
};

export default PrimaryDots;
