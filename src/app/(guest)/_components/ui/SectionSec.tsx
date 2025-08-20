"use client";

import { ContentFacility } from "@/components/content/ContentFacility";
import { motion } from "framer-motion";
import Image from "next/image";

const SectionSec = () => {
  return (
    <section
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50"
      id="facilities"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
            Fasilitas{" "}
            <span className="bg-gradient-to-b from-blue-600 to-[#1E3A8A] bg-clip-text text-transparent">
              Kami
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kami menyediakan fasilitas lengkap untuk membantu Kamu fokus dan
            mencapai hasil maksimal dengan suasana yang kondusif dan nyaman.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1 mb-12 lg:mb-0"
          >
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-white to-blue-100 p-2">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    className="w-full h-auto transform md:group-hover:scale-105 transition-transform duration-700"
                    src="/Image/meja.webp"
                    width={524}
                    height={377}
                    alt="Fasilitas ruang belajar modern dengan meja dan kursi yang nyaman"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 order-1 lg:order-2"
          >
            {/* Facilities List */}
            <div className="space-y-3">
              {ContentFacility.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.3,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  className="group relative md:hover:translate-x-2"
                >
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 md:hover:bg-white/80 md:hover:shadow-lg transition-all duration-300">
                    {/* Icon container */}
                    <div className="relative">
                      <div
                        className="rounded-xl p-3 shadow-lg transform md:group-hover:scale-110 md:group-hover:rotate-3 transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${item.bgColor}, ${item.bgColor}dd)`,
                        }}
                      >
                        <item.Icon
                          size={24}
                          className="stroke-white fill-none"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-gray-900 md:group-hover:text-gray-800 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed md:group-hover:text-gray-700 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-4 right-4 h-0.5 transform scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"
                    style={{ backgroundColor: item.bgColor }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionSec;
