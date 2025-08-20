"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  PrimaryLeftArrow,
  PrimaryRightArrow,
} from "../carousel/PrimaryButtonCarousel";
import PrimaryDots from "../carousel/PrimaryDots";
import Image from "next/image";
import { responsive } from "../../data/responsive";
import { BodyCard, CardCarousel, HeadCard } from "./CardCarousel";
import { motion } from "framer-motion";

const IndividuCarousel = () => {
  const carouselItems = [
    {
      title: "Tentukan Jumlah Orang",
      src: "/Image/Tutor_1_global.webp",
      content:
        "Masukkan jumlah orang agar sistem dapat menyaring ketersediaan meja berdasarkan jumlah orang.",
      icon: "👥",
    },
    {
      title: "Pilih Tanggal Reservasi",
      src: "/Image/Tutor_2_global.webp",
      content:
        "Tanggal default adalah hari ini, tapi kamu bisa memilih tanggal hingga 5 hari ke depan.",
      icon: "📅",
    },
    {
      title: "Pilih Waktu Reservasi",
      src: "/Image/Tutor_3_global.webp",
      content:
        "Pilih waktu yang tersedia. Jika tidak bisa diklik (disabled), berarti waktu sudah lewat atau meja sudah penuh.",
      icon: "⏰",
    },
    {
      title: "Pilih Meja melalui Denah",
      src: "/Image/Tutor_4_global.webp",
      content:
        "Denah meja akan memfilter meja yang tersedia. Klik langsung dari peta untuk memilih meja yang diinginkan.",
      icon: "🗺️",
    },
    {
      title: "Ketersediaan Meja",
      src: "/Image/Tutor_5_global.webp",
      content:
        "Kamu juga bisa memilih meja di kolom Ketersediaan Meja. Kalau tidak bisa diklik, meja tidak tersedia.",
      icon: "📋",
    },
    {
      title: 'Klik Tombol "Reservasi Sekarang"',
      src: "/Image/Tutor_6_global.webp",
      content:
        'Jika semua sudah sesuai, klik tombol "Reservasi sekarang" untuk melanjutkan proses reservasi.',
      icon: "🎯",
    },
    {
      title: "Pilih Keperluan Reservasi",
      src: "/Image/Tutor_7_Individu.webp",
      content:
        "Lalu, popup akan muncul. pilih keperluan atau alasan dari reservasi yang kamu lakukan.",
      icon: "📝",
    },
    {
      title: 'Klik Tombol "Reservasi"',
      src: "/Image/Tutor_8_Individu.webp",
      content:
        'Pastikan semua detail pesanan sudah sesuai, lalu klik tombol "Reservasi" untuk menyelesaikan pemesanan.',
      icon: "✅",
    },
    {
      title: 'Klik Tombol "OK"',
      src: "/Image/Tutor_9_Individu.webp",
      content:
        "Jika semua anggota telah melakukan konfirmasi, popup 'Reservasi berhasil dibuat' akan muncul. Klik \"OK\"",
      icon: "👍",
    },
    {
      title: "Akses Tiket dan Cetak QR",
      src: "/Image/Tutor_10_Individu.webp",
      content:
        'Tiket akan tersedia di menu "Reservasi & Riwayat" dan klik tombol "Cetak QR" untuk memunculkan QR.',
      icon: "🎫",
    },
    {
      title: "Scan QR",
      src: "/Image/Tutor_last_global.webp",
      content:
        "Setelah QR muncul, tunjukkan kepada operator untuk dipindai dan kamu dapat langsung menggunakan meja.",
      icon: "📱",
    },
  ];

  return (
    <section className="relative">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-[#1E3A8A] rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
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
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Tutorial Reservasi Individu
          </h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Ikuti langkah-langkah berikut untuk melakukan reservasi meja secara
          individu dengan mudah dan cepat.
        </p>
      </div>

      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={[]}
        customDot={<PrimaryDots />}
        customLeftArrow={<PrimaryLeftArrow />}
        customRightArrow={<PrimaryRightArrow />}
        itemClass="px-3 mb-12"
        dotListClass="custom-dot-list-style"
      >
        {carouselItems.map((data, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <CardCarousel>
              <HeadCard>
                <motion.div
                  className="bg-gradient-to-r from-[#1E3A8A] to-blue-700 flex justify-center items-center w-8 h-8 text-sm rounded-full text-white shadow-lg font-bold"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {index + 1}
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-[#1E3A8A] text-sm font-bold leading-tight">
                    {data.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs">{data.icon}</span>
                    <span className="text-xs text-gray-500">
                      Langkah {index + 1} dari {carouselItems.length}
                    </span>
                  </div>
                </div>
              </HeadCard>

              <BodyCard>
                <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 p-2">
                  <Image
                    alt={`Tutorial step ${index + 1}: ${data.title}`}
                    src={data.src || "/placeholder.svg"}
                    width={430}
                    height={240}
                    className="w-full h-auto rounded-lg transform group-hover:scale-105 transition-transform duration-300 shadow-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </div>
              </BodyCard>

              <BodyCard>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {data.content}
                  </p>
                  <div className="flex justify-center">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#1E3A8A] to-blue-600 rounded-full" />
                  </div>
                </div>
              </BodyCard>
            </CardCarousel>
          </motion.div>
        ))}
      </Carousel>
    </section>
  );
};

export default IndividuCarousel;
