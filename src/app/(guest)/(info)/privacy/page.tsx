"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
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
                Kebijakan{" "}
                <span className="bg-gradient-to-b from-blue-600 to-[#1E3A8A] bg-clip-text text-transparent">
                  Privasi
                </span>
              </h1>
              <p className="text-base md:text-lg font-medium text-[#1E3A8A] mb-2 px-2">
                Sistem Reservasi Coworking Space H6
              </p>
              <p className="text-sm md:text-base text-gray-600 mx-auto leading-relaxed text-justify md:text-center px-4 md:px-0">
                Kami di Bengkel Koding berkomitmen untuk menjaga privasi dan
                keamanan data pengguna dalam penggunaan sistem reservasi
                coworking space (Lobby H6). Kebijakan ini menjelaskan bagaimana
                data Anda dikumpulkan, digunakan, dan dilindungi saat Anda
                menggunakan layanan kami.
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
              {/* Data yang Dikumpulkan */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Data yang Dikumpulkan
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                  Kami dapat mengumpulkan dua jenis informasi:
                </p>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      <span className="font-medium text-gray-900">
                        Data Pribadi:
                      </span>{" "}
                      Nama, email mahasiswa, NIM, dan data lain yang Anda
                      berikan saat mendaftar atau melakukan reservasi.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      <span className="font-medium text-gray-900">
                        Data Non-Pribadi:
                      </span>{" "}
                      Informasi teknis seperti perangkat yang digunakan, waktu
                      akses, serta aktivitas interaksi di sistem.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Tujuan Penggunaan Data */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Tujuan Penggunaan Data
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                  Data yang dikumpulkan digunakan untuk:
                </p>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Memproses dan mengelola reservasi Anda secara efisien.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Menampilkan histori reservasi dan status kehadiran.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Memberikan notifikasi atau pengingat terkait pemesanan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Menyusun laporan operasional dan statistik penggunaan
                      ruang.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Menjaga keamanan sistem dan mencegah penyalahgunaan.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Keamanan dan Penyimpanan Data */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Keamanan dan Penyimpanan Data
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Data Anda disimpan di server internal yang dikelola oleh tim
                  Bengkel Koding. Kami menerapkan langkah keamanan teknis untuk
                  melindungi informasi dari akses tidak sah dan kebocoran.
                </p>
              </div>

              {/* Pembagian Informasi */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Pembagian Informasi
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                  Kami tidak akan membagikan data pribadi Anda kepada pihak
                  ketiga tanpa izin, kecuali:
                </p>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Diminta oleh pihak berwenang sesuai ketentuan hukum.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Diperlukan untuk investigasi atas pelanggaran sistem atau
                      penyalahgunaan fasilitas.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Penggunaan Cookies */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Penggunaan Cookies
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                  Sistem kami dapat menggunakan cookies untuk:
                </p>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Menyimpan preferensi pengguna secara lokal.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Mempercepat proses login atau tampilan halaman.
                    </div>
                  </li>
                </ul>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-3">
                  Pengguna dapat mengatur browser untuk menolak cookies, namun
                  beberapa fungsi mungkin tidak berjalan optimal.
                </p>
              </div>

              {/* Tautan ke Situs Eksternal */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Tautan ke Situs Eksternal
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Sistem ini tidak menyertakan tautan ke situs eksternal. Jika
                  di kemudian hari ditambahkan, kami tidak bertanggung jawab
                  atas kebijakan privasi situs pihak ketiga.
                </p>
              </div>

              {/* Hak Pengguna */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Hak Pengguna
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                  Anda berhak untuk:
                </p>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Melihat data reservasi yang tersimpan atas nama Anda.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Mengajukan koreksi jika terjadi kesalahan informasi.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="font-semibold text-blue-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <div className="leading-relaxed">
                      Meminta penghapusan akun, dengan catatan sesuai kebijakan
                      operasional.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Perubahan Kebijakan */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Perubahan Kebijakan
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Kebijakan privasi ini dapat diperbarui sewaktu-waktu.
                  Perubahan signifikan akan diumumkan melalui laman resmi sistem
                  reservasi.
                </p>
              </div>

              {/* Kontak */}
              <div className="mb-0">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
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
