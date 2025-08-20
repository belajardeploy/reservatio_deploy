"use client";

import type React from "react";
import { motion } from "framer-motion";
import clsx from "clsx"

interface CardCarouselProps {
  children: React.ReactNode;
  className?: string;
}

interface HeadCardProps {
  children: React.ReactNode;
  className?: string;
}

interface BodyCardProps {
  children: React.ReactNode;
  className?: string;
}

export const CardCarousel = ({ children, className }: CardCarouselProps) => {
  return (
    <motion.div
      className={clsx(
        "relative bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-6 h-[420px] hover:shadow-xl transition-all duration-500 group overflow-hidden",
        className
      )}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4 h-full relative z-10">{children}</div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/5 via-purple-500/5 to-blue-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* Floating elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br from-[#1E3A8A] to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1E3A8A]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
};

export const HeadCard = ({ children, className }: HeadCardProps) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 pb-3 border-b border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BodyCard = ({ children, className }: BodyCardProps) => {
  return (
    <div className={clsx("flex-1 flex items-center justify-center", className)}>
      {children}
    </div>
  );
};
