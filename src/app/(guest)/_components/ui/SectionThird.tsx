"use client";

import { ContentRegulations } from "@/components/content/ContentRegulations";
import { motion } from "framer-motion";
import RegulationCard from "../RegulationCard";

const SectionThird = () => {
  return (
    <section
      className="relative min-h-screen py-20 px-4 overflow-hidden"
      id="rules"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-slate-100" />
      <div className="absolute inset-0 bg-[url('/Image/bg-section_third.png')] md:bg-[url('/Image/bg-section_third.png')] bg-[url('/Image/bg-section_third_mobile.png')] bg-cover bg-no-repeat bg-center opacity-10" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
            Peraturan{" "}
            <span className="bg-gradient-to-b from-blue-600 to-[#1E3A8A] bg-clip-text text-transparent">
              Kami
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hai Dinusian! Harap memperhatikan beberapa peraturan di bawah ini
            untuk kenyamanan bersama saat menggunakan fasilitas bersama.
          </p>
        </motion.div>

        {/* ContentRegulations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {ContentRegulations.map((reg, index) => (
            <motion.div
              key={reg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="h-full"
            >
              <RegulationCard
                icon={reg.icon}
                title={reg.title}
                content={reg.content}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-600 rounded-full text-sm font-medium border border-gray-200 shadow-sm">
            💡 Ikuti peraturan untuk pengalaman yang lebih baik
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionThird;
