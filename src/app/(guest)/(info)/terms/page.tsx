"use client";

import { motion } from "framer-motion";

export default function TermPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-20 lg:pt-32 pb-3 md:pb-4 lg:pb-6 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-4 md:mb-6 lg:mb-8"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight px-2">
                Aturan dan Syarat{" "}
                <span className="bg-gradient-to-b from-blue-600 to-[#1E3A8A] bg-clip-text text-transparent">
                  Penggunaan
                </span>
              </h1>
              <p className="text-base md:text-lg font-medium text-[#1E3A8A] mb-2 px-2">
                Sistem Reservasi Coworking Space H6
              </p>
              <p className="text-sm md:text-base text-gray-600 mx-auto leading-relaxed text-justify md:text-center px-4 md:px-0">
                Selamat datang di halaman Syarat dan Ketentuan layanan reservasi
                online Bengkel Koding. Sebelum menggunakan layanan reservasi
                online kami, mohon untuk membaca dan memahami seluruh ketentuan
                yang berlaku dalam dokumen ini. Jika Anda tidak menyetujui
                seluruh syarat dan ketentuan ini, harap untuk tidak menggunakan
                layanan kami.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative pb-12 md:pb-16 lg:pb-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12"
            >
              {/* Definisi */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Definisi
                </h2>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      <span className="font-medium text-gray-900">
                        Sistem Reservasi Bengkel Koding:
                      </span>{" "}
                      Aplikasi berbasis web yang dikembangkan dan dikelola oleh
                      Bengkel Koding untuk menyediakan layanan reservasi meja
                      belajar di area coworking space gedung H lantai 6
                      Universitas Dian Nuswantoro.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      <span className="font-medium text-gray-900">
                        Coworking Space H6:
                      </span>{" "}
                      Area ruang belajar bersama yang berlokasi di gedung H
                      lantai 6 Universitas Dian Nuswantoro, dikelola oleh
                      Bengkel Koding untuk mendukung aktivitas akademik dan
                      kolaborasi mahasiswa.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      <span className="font-medium text-gray-900">
                        Pengguna:
                      </span>{" "}
                      Mahasiswa aktif Universitas Dian Nuswantoro, operator
                      sistem, atau administrator yang memiliki akses resmi ke
                      sistem reservasi ini.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      <span className="font-medium text-gray-900">
                        Reservasi:
                      </span>{" "}
                      Proses pemesanan dan penggunaan meja belajar di coworking
                      space H6 melalui sistem online berdasarkan jadwal waktu
                      yang telah ditentukan.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Ketentuan Penggunaan */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Ketentuan Penggunaan
                </h2>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Pengguna wajib login menggunakan akun masing-masing dan
                      bertanggung jawab atas keamanan akun.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Satu akun hanya boleh digunakan oleh satu individu, tidak
                      diperbolehkan untuk dipinjamkan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Kehadiran pengguna wajib diverifikasi melalui pemindaian
                      QR Code yang diberikan setelah reservasi.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Pengguna wajib hadir tepat waktu sesuai jadwal yang telah
                      dipesan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Satu hari hanya diperbolehkan membuat satu pesanan per
                      pengguna.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Reservasi harus dilakukan sebelum waktu pemakaian dimulai.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Jika tidak hadir tanpa pembatalan atau konfirmasi,
                      pengguna dapat menerima penalti berupa pembatasan akses ke
                      sistem untuk sementara waktu.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Pembatalan dan Keterlambatan */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Pembatalan dan Keterlambatan
                </h2>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Pembatalan hanya dapat dilakukan secara langsung di Lobby
                      H6 melalui operator.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Reservasi yang tidak digunakan dan tidak dibatalkan akan
                      dianggap mangkir.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Jika pengguna terlambat lebih dari 1 jam, reservasi akan
                      otomatis dibatalkan dan tercatat penalti.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Pengguna yang mendapatkan 3 penalti akan diblokir secara
                      otomatis dari sistem.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Larangan */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Larangan
                </h2>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Dilarang menggunakan akun orang lain atau membuat
                      reservasi untuk orang lain.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Dilarang melakukan reservasi dobel untuk satu hari.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Dilarang menggunakan tempat tanpa reservasi yang valid.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Tanggung Jawab Pengguna */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Tanggung Jawab Pengguna
                </h2>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Menjaga kebersihan dan ketertiban ruang setelah digunakan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Menggunakan fasilitas sesuai dengan peraturan kampus.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Melaporkan gangguan atau kerusakan fasilitas kepada
                      operator.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Hak Pengelola */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Hak Pengelola
                </h2>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Operator berhak membatalkan reservasi jika ditemukan
                      pelanggaran aturan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Admin berhak melakukan pembatasan akses jika pengguna
                      melakukan penyalahgunaan sistem.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Batasan Tanggung Jawab */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Batasan Tanggung Jawab
                </h2>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Pengelola sistem tidak bertanggung jawab atas kehilangan
                      barang, gangguan koneksi internet, atau kegagalan teknis
                      di luar kendali sistem.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Pengelola tidak menjamin ketersediaan ruang jika pengguna
                      datang di luar waktu reservasi atau tanpa reservasi aktif.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Setiap kerusakan atau penyalahgunaan fasilitas menjadi
                      tanggung jawab pengguna.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Perubahan pada Ketentuan */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Perubahan pada Ketentuan
                </h2>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Bengkel Koding berhak mengubah syarat dan ketentuan ini
                      sewaktu-waktu untuk menyesuaikan dengan kebutuhan
                      operasional atau peraturan kampus.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Perubahan akan diinformasikan melalui sistem atau media
                      resmi, dan pengguna dianggap menyetujui perubahan jika
                      tetap menggunakan layanan setelah pembaruan.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Hukum yang Berlaku */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Hukum yang Berlaku
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Ketentuan ini tunduk pada hukum yang berlaku di Republik
                  Indonesia dan peraturan internal Universitas Dian Nuswantoro.
                </p>
              </div>

              {/* Kontak */}
              <div className="mb-0">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                  Kontak
                </h2>
                <p className="text-sm md:text-base text-gray-700 mb-3 leading-relaxed">
                  Untuk pertanyaan atau pengajuan terkait privasi data, silakan
                  hubungi:
                </p>
                <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-100">
                  <p className="text-sm md:text-base text-[#1E3A8A] font-medium flex items-center gap-2">
                    <span className="text-lg">📧</span>
                    <span className="break-all text-xs md:text-sm">
                      bengkelkodingreservation@gmail.com
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
