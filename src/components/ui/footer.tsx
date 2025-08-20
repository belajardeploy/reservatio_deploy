"use client";

import Link from "next/link";
import BengkodLogo from "../logo/LogoOnlyWhite";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#1E3A8A] to-slate-900" />

      <div className="relative px-4 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="group">
                <BengkodLogo />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold bg-gradient-to-b from-blue-200 to-blue-400 bg-clip-text text-transparent">
                  Sistem Reservasi Bengkel Koding
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Platform reservasi tempat belajar yang memudahkan Anda untuk
                  memesan meja dan ruang belajar di Bengkel Koding dengan mudah
                  dan efisien.
                </p>
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-[#1E3A8A]/20 text-blue-300 rounded-full text-xs font-medium border border-[#1E3A8A]/30">
                📍 Semarang, Jawa Tengah
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-white font-semibold text-lg">
                Fitur Reservasi
              </h4>
              <div className="space-y-3">
                <div className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300 cursor-pointer">
                  Reservasi Meja
                </div>
                <div className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300 cursor-pointer">
                  Riwayat Reservasi
                </div>
                <div className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300 cursor-pointer">
                  Kelola Profil
                </div>
                <div className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300 cursor-pointer">
                  Lihat Jadwal Tersedia
                </div>
                <div className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300 cursor-pointer">
                  Panduan Reservasi
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-white font-semibold text-lg">Informasi</h4>
              <div className="space-y-3">
                <Link
                  href="/about"
                  className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300"
                >
                  Tentang Kami
                </Link>
                <Link
                  href="/#facilities"
                  className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300"
                >
                  Fasilitas Tersedia
                </Link>
                <Link
                  href="/#rules"
                  className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300"
                >
                  Peraturan Reservasi
                </Link>
                <Link
                  href="/#tutorial"
                  className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300"
                >
                  Panduan Tutorial
                </Link>
                <Link
                  href="/#faq"
                  className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300"
                >
                  FAQ
                </Link>
                <Link
                  href="/user/hubungi_kami"
                  className="block text-sm text-gray-300 md:hover:text-white transition-colors duration-300"
                >
                  Hubungi Kami
                </Link>
              </div>
            </motion.div>

            {/* Contact & Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-white font-semibold text-lg">
                Kontak & Sosial
              </h4>
              <div className="space-y-3">
                <div className="text-sm text-gray-300">
                  <p className="font-medium text-white mb-1">Alamat:</p>
                  <p>Gedung H Lt.6, UDINUS</p>
                  <p>Jl. Imam Bonjol No.207</p>
                  <p>Semarang Tengah 50131</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-white">Ikuti Kami:</p>
                <div className="flex gap-3">
                  <Link
                    href="https://www.instagram.com/bengkelkoding.official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 md:hover:bg-white/20 transition-all duration-300"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="fill-gray-300 md:group-hover:fill-white transition-colors duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.002 21.041C9.54195 21.041 9.25195 21.028 8.29195 20.986C7.54332 20.9614 6.80439 20.8092 6.10695 20.536C4.90026 20.0664 3.94609 19.1119 3.47695 17.905C3.21426 17.205 3.07257 16.4655 3.05795 15.718C3.00195 14.76 3.00195 14.446 3.00195 12.005C3.00195 9.538 3.01495 9.25 3.05795 8.295C3.07289 7.54853 3.21457 6.81001 3.47695 6.111C3.94558 4.90253 4.9013 3.94718 6.10995 3.479C6.8086 3.21521 7.5473 3.07315 8.29395 3.059C9.24895 3.005 9.56295 3.005 12.002 3.005C14.482 3.005 14.767 3.018 15.712 3.059C16.4605 3.07327 17.2012 3.21531 17.902 3.479C19.1103 3.94771 20.0658 4.90288 20.535 6.111C20.8021 6.8202 20.9445 7.57026 20.956 8.328C21.012 9.28601 21.012 9.59901 21.012 12.039C21.012 14.479 20.998 14.799 20.956 15.746C20.9411 16.4942 20.799 17.2344 20.536 17.935C20.0656 19.1427 19.11 20.0976 17.902 20.567C17.2022 20.8292 16.4631 20.9709 15.716 20.986C14.761 21.041 14.448 21.041 12.002 21.041ZM11.968 4.588C9.52195 4.588 9.26795 4.6 8.31295 4.643C7.74294 4.65056 7.17843 4.75575 6.64395 4.954C5.85471 5.25601 5.23018 5.878 4.92495 6.666C4.72517 7.2063 4.61996 7.77698 4.61395 8.353C4.56095 9.322 4.56095 9.576 4.56095 12.005C4.56095 14.405 4.56995 14.696 4.61395 15.659C4.62291 16.2292 4.72805 16.7938 4.92495 17.329C5.23063 18.1165 5.85505 18.738 6.64395 19.04C7.17807 19.2396 7.7428 19.3448 8.31295 19.351C9.28095 19.407 9.53595 19.407 11.968 19.407C14.421 19.407 14.675 19.395 15.622 19.351C16.1924 19.3441 16.7573 19.2389 17.292 19.04C18.0764 18.7354 18.6969 18.1153 19.002 17.331C19.2014 16.7903 19.3065 16.2193 19.313 15.643H19.324C19.367 14.687 19.367 14.432 19.367 11.989C19.367 9.54601 19.356 9.289 19.313 8.334C19.304 7.76446 19.1988 7.20052 19.002 6.666C18.6976 5.88058 18.077 5.2593 17.292 4.954C16.7574 4.75475 16.1924 4.64953 15.622 4.643C14.655 4.588 14.402 4.588 11.968 4.588ZM12.002 16.624C10.1319 16.6252 8.44537 15.4997 7.72882 13.7725C7.01226 12.0452 7.40686 10.0563 8.72858 8.73347C10.0503 7.4106 12.0388 7.01428 13.7667 7.72934C15.4946 8.4444 16.6215 10.13 16.622 12C16.6192 14.5511 14.553 16.619 12.002 16.624ZM12.002 8.998C10.3451 8.998 9.00195 10.3412 9.00195 11.998C9.00195 13.6549 10.3451 14.998 12.002 14.998C13.6588 14.998 15.002 13.6549 15.002 11.998C14.9981 10.3427 13.6572 9.00185 12.002 8.998ZM16.802 8.28501C16.2074 8.2828 15.7269 7.79959 15.728 7.20501C15.7291 6.61043 16.2114 6.12901 16.806 6.12901C17.4005 6.12901 17.8828 6.61042 17.884 7.205C17.8842 7.49187 17.7702 7.76703 17.5672 7.96968C17.3642 8.17234 17.0888 8.2858 16.802 8.28501Z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.youtube.com/@BengkelKodingOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 md:hover:bg-white/20 transition-all duration-300"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="fill-gray-300 md:group-hover:fill-white transition-colors duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </Link>
                  <Link
                    href="mailto:bengkelkodingreservation@gmail.com"
                    className="group p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 md:hover:bg-white/20 transition-all duration-300"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="fill-gray-300 md:group-hover:fill-white transition-colors duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-6"></div>

          {/* Bottom Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-b from-blue-400 to-[#1E3A8A] rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-400">
                © 2024 Bengkel Koding. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                className="text-sm text-gray-400 md:hover:text-white transition-colors duration-300 relative group"
                href="/terms"
              >
                Syarat & Ketentuan
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-b from-blue-400 to-[#1E3A8A] md:group-hover:w-full transition-all duration-300"></div>
              </Link>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <Link
                className="text-sm text-gray-400 md:hover:text-white transition-colors duration-300 relative group"
                href="/privacy"
              >
                Kebijakan Privasi
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-b from-blue-400 to-[#1E3A8A] md:group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
