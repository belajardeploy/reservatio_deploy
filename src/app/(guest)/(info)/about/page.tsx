"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, Instagram } from "lucide-react";

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Michael Surya Adi P.",
    role: "Frontend developer",
    image: "/Image/team/michael.webp",
    social: {
      instagram: "https://www.instagram.com/michael_surya_75/",
      linkedin: "https://www.linkedin.com/in/michael-surya-671a6a24a/",
      github: "https://github.com/ThisSurya",
    },
  },
  {
    id: 2,
    name: "M. Farhan Abdullah",
    role: "Backend developer",
    image: "/Image/team/farhan.webp",
    social: {
      instagram: "https://www.instagram.com/farhanabdullah3/",
      linkedin: "https://www.linkedin.com/in/mochamadfarhanabdullah/",
      github: "https://github.com/MochamadFarhanAbdullah",
    },
  },
  {
    id: 3,
    name: "Wibowo Mulyo",
    role: "Backend developer",
    image: "/Image/team/wibowo.webp",
    social: {
      instagram: "https://www.instagram.com/wibowomulyo_/",
      linkedin: "https://www.linkedin.com/in/wibowo-mulyo-a5b174326/",
      github: "https://github.com/WibowoMulyo",
    },
  },
  {
    id: 4,
    name: "Maulidya Ayu Ardiena",
    role: "UI/UX Designer",
    image: "/Image/team/maulidya.webp",
    social: {
      instagram: "https://www.instagram.com/neenaard/",
      linkedin: "https://www.linkedin.com/in/ardiena/",
      github: "https://github.com/MaulidyaAyu",
    },
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-900 via-[#1E3A8A] to-slate-900 text-white rounded-3xl md:rounded-4xl p-4 md:p-6 2xl:p-10 my-6 md:my-10 bg-no-repeat bg-cover shadow-2xl"
            style={{ backgroundImage: "url('/Image/bg-about-me.webp')" }}
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center md:justify-start"
              >
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl md:rounded-4xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center text-center min-w-[160px] md:min-w-[200px]">
                  <div className="mb-2">
                    <Image
                      src="/Image/logo-bengkod-polosan.webp"
                      alt="Bengkel Koding"
                      width={80}
                      height={80}
                      className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                    />
                  </div>
                  <div className="text-[#1E3A8A] font-bold text-sm md:text-lg">
                    Bengkel Koding
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm">
                    Coworking Space
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex-1 text-justify py-2 md:py-0 px-2 md:px-0"
              >
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 leading-tight text-center md:text-left">
                  Sistem Reservasi Coworking Space H6
                </h1>

                <p className="text-xs md:text-sm lg:text-base leading-relaxed text-blue-50 md:text-white">
                  Program ini adalah inisiatif dari{" "}
                  <i>
                    Program Studi Teknik Informatika Universitas Dian Nuswantoro
                  </i>{" "}
                  yang bertujuan untuk mendukung kenyamanan dan keteraturan
                  ruang belajar bersama mahasiswa. Sistem ini memudahkan proses
                  pemesanan meja secara real-time, dengan antarmuka yang ramah
                  pengguna dan fitur pendukung seperti QR Code verifikasi,
                  reservasi kelompok, hingga pemantauan penggunaan ruang. Kami
                  berkomitmen memberikan pengalaman reservasi yang efisien,
                  tertib, dan adil bagi seluruh civitas akademika.
                </p>
              </motion.div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Smooth transition divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/30 to-transparent" />

      {/* Team Section */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header - konsisten dengan landing page */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
              Tim{" "}
              <span className="bg-gradient-to-b from-blue-600 to-[#1E3A8A] bg-clip-text text-transparent">
                Developer
              </span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Sistem Reservasi Coworking Space H6 dikembangkan oleh tim
              mahasiswa unggulan 2022 dari Program Studi Teknik Informatika yang
              berdedikasi menciptakan solusi teknologi terbaik.
            </p>
            <div className="inline-flex items-center px-8 py-3 bg-gradient-to-b from-blue-800 to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg text-sm border border-transparent hover:border-blue-700 transition-all duration-300 hover:shadow-xl">
              Batch &apos;22
            </div>
          </motion.div>

          {/* Team Grid - kembali ke design asli */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group"
                >
                  <div className="relative w-full max-w-[280px] h-[400px] rounded-4xl overflow-hidden backdrop-blur-sm bg-white/20 border-7 border-white/70 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 mx-auto">
                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Blue Linear Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040A23] via-[#1E2A5E]/10 to-transparent" />

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-normal text-sm lg:text-base mb-1 leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-white/90 text-xs lg:text-sm mb-3 font-light">
                          {member.role}
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-2">
                          <Link
                            href={member.social.github}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 shadow-md"
                          >
                            <Github className="w-4 h-4 text-[#1E3A8A]" />
                          </Link>
                          <Link
                            href={member.social.linkedin}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 shadow-md"
                          >
                            <Linkedin className="w-4 h-4 text-[#1E3A8A]" />
                          </Link>
                          <Link
                            href={member.social.instagram}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 shadow-md"
                          >
                            <Instagram className="w-4 h-4 text-[#1E3A8A]" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
