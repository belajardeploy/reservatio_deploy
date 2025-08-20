"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RegulationCardProps {
  icon: ReactNode;
  title: string;
  content: string;
  index: number;
}

const RegulationCard = ({
  icon,
  title,
  content,
  index,
}: RegulationCardProps) => {
  const cardStyles = [
    {
      bg: "bg-gradient-to-br from-blue-100 to-blue-200",
      iconBg: "bg-white/80",
      textColor: "text-blue-900",
      contentColor: "text-blue-700",
    },
    {
      bg: "bg-gradient-to-br from-orange-100 to-orange-200",
      iconBg: "bg-white/80",
      textColor: "text-orange-900",
      contentColor: "text-orange-700",
    },
    {
      bg: "bg-gradient-to-br from-teal-100 to-teal-200",
      iconBg: "bg-white/80",
      textColor: "text-teal-900",
      contentColor: "text-teal-700",
    },
    {
      bg: "bg-gradient-to-br from-purple-100 to-purple-200",
      iconBg: "bg-white/80",
      textColor: "text-purple-900",
      contentColor: "text-purple-700",
    },
  ];

  const style = cardStyles[index % cardStyles.length];

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group relative h-full"
    >
      <div
        className={`relative ${style.bg} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-white/50 h-full flex flex-col min-h-[280px]`}
      >
        {/* Decorative background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

        {/* Icon container */}
        <div className="relative mb-4 flex-shrink-0">
          <div
            className={`inline-flex items-center justify-center w-14 h-14 ${style.iconBg} rounded-2xl shadow-md backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300`}
          >
            <div className="text-gray-700 text-lg">{icon}</div>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-grow flex flex-col">
          <h3
            className={`text-lg font-bold ${style.textColor} mb-3 leading-tight group-hover:scale-105 transition-transform duration-300 origin-left flex-shrink-0`}
          >
            {title}
          </h3>
          <p
            className={`${style.contentColor} leading-relaxed text-sm font-medium flex-grow`}
          >
            {content}
          </p>
        </div>

        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>
    </motion.div>
  );
};

export default RegulationCard;
