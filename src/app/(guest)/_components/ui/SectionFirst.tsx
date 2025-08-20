"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const SectionFirst = ({ className = "" }) => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-0"
      id="beranda"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[url('/Image/bg_landing_hero.webp')] bg-cover bg-no-repeat bg-center" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-[#1E3A8A]/20 to-blue-800/10" />

      <div
        className={`relative flex lg:flex-row flex-col-reverse lg:gap-x-12 gap-8 lg:items-center lg:justify-between justify-center max-w-7xl w-full px-4 z-10 ${className}`}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 lg:max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30 shadow-lg"
          >
            <span className="mr-2">✨</span>
            COWORKING SPACE H6
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl text-white font-bold drop-shadow-2xl leading-tight"
          >
            Ruang Belajar Privat dan Produktif,{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-b from-cyan-300 via-blue-200 to-indigo-200 inline-block text-transparent bg-clip-text font-extrabold">
                Hanya Sekali Klik
              </span>
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-cyan-200/20 via-blue-300/20 to-[#1E3A8A]/20 blur-lg rounded-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 font-normal text-sm md:text-base leading-relaxed max-w-xl"
          >
            Temukan ruang belajar yang sesuai dengan kebutuhanmu. Pesan sekarang
            dan dapatkan konfirmasi ketersediaan dalam 1 kali klik.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/user/buat_reservasi">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-white text-[#1E3A8A] font-semibold text-sm px-6 py-3 rounded-xl cursor-pointer shadow-xl hover:shadow-white/20 transition-all duration-300 border border-white/30 backdrop-blur-sm overflow-hidden md:hover:scale-105 md:hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Reservasi Sekarang
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative group"
        >
          <div className="relative">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Image
                className="lg:w-[550px] w-[320px] md:w-[420px] transform md:group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                src="/Image/mock_device.svg"
                width={1120}
                height={377}
                alt="Mock device showing the reservation interface"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - Elegant & Minimalist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="group cursor-pointer"
          onClick={() =>
            document
              .getElementById("facilities")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {/* Scroll dots indicator */}
          <div className="flex flex-col items-center space-y-2">
            <motion.div
              className="w-1 h-1 bg-white/40 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0,
              }}
            />
            <motion.div
              className="w-1 h-1 bg-white/60 rounded-full"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.3,
              }}
            />
            <motion.div
              className="w-1.5 h-1.5 bg-white/80 rounded-full"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.6,
              }}
            />
          </div>

          {/* Hover text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          >
            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <span className="text-xs font-medium text-white/90">
                Lihat Lebih Banyak
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SectionFirst;
