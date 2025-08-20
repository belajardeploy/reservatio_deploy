"use client";

import { useState } from "react";
import IndividuCarousel from "./IndividuCarousel";
import KelompokCarousel from "./KelompokCarousel";
import { motion } from "framer-motion";
import Link from "next/link";

const SectionFourth = () => {
  const [route, setRoute] = useState<number>(0);

  return (
    <section
      className="relative min-h-screen py-20 px-4 overflow-hidden"
      id="tutorial"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-white" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
            Tutorial{" "}
            <span className="bg-gradient-to-b from-blue-600 to-[#1E3A8A] bg-clip-text text-transparent">
              Reservasi
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hai Dinusian! Ikuti panduan langkah demi langkah untuk melakukan
            reservasi ruang belajar dengan mudah dan cepat.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-1 shadow-lg">
            <div className="flex gap-1">
              <motion.button
                className={`relative px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  route === 0
                    ? "bg-gradient-to-b from-blue-600 to-[#1E3A8A] text-white shadow-lg"
                    : "text-gray-600 md:hover:text-gray-800 md:hover:bg-white/50"
                }`}
                onClick={() => setRoute(0)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Individu
                </span>
                {route === 0 && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-[#1E3A8A]/20 rounded-lg blur-lg"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>

              <motion.button
                className={`relative px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  route === 1
                    ? "bg-gradient-to-b from-blue-600 to-[#1E3A8A] text-white shadow-lg"
                    : "text-gray-600 md:hover:text-gray-800 md:hover:bg-white/50"
                }`}
                onClick={() => setRoute(1)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Kelompok
                </span>
                {route === 1 && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-[#1E3A8A]/20 rounded-lg blur-lg"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-8">
            <motion.div
              key={route}
              initial={{ opacity: 0, x: route === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: route === 0 ? 20 : -20 }}
              transition={{ duration: 0.5 }}
            >
              {route === 0 && <IndividuCarousel />}
              {route === 1 && <KelompokCarousel />}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/user/buat_reservasi">
            <motion.div
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-b from-blue-600 to-[#1E3A8A] text-white rounded-full font-medium md:hover:shadow-lg md:hover:scale-105 transition-all duration-300 cursor-pointer text-sm shadow-xl backdrop-blur-sm"
              whileTap={{ scale: 0.98 }}
            >
              <span>Mulai Reservasi Sekarang</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionFourth;
