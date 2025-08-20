"use client";

import { AccordionFaq } from "@/app/user/_components/accordion/AccordionFAQ";
import { ContentFaq } from "@/components/content/ContentFaq";
import { motion } from "framer-motion";

export const SectionFifth = () => {
  return (
    <section
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-[url('/Image/bg-faq-landing.png')] bg-cover bg-no-repeat bg-center bg-fixed"
      id="faq"
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            <span className="bg-gradient-to-b from-blue-200 to-blue-600 bg-clip-text text-transparent">
              FAQ
            </span>
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-3xl mx-auto leading-relaxed">
            Hai Dinusian! Untuk memastikan kenyamanan bersama dalam menggunakan
            fasilitas ini, silakan simak beberapa pertanyaan yang sering
            diajukan seputar proses reservasi.
          </p>
        </motion.div>

        {/* FAQ Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl p-8 md:hover:shadow-3xl transition-all duration-500">
            <AccordionFaq items={ContentFaq} />
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-600 rounded-full text-sm font-medium border border-gray-200 shadow-sm">
            ❓ Masih Ada Pertanyaan?
          </div>
        </motion.div>
      </div>
    </section>
  );
};
