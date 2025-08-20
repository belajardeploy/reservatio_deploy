export const ContentFaq = [
  {
    id: "faq-1",
    title: (
      <div className="font-bold lg:text-sm text-xs text-primary-1 flex items-center w-full">
        <h1>
          Apakah saya bisa membatalkan atau mengubah jadwal reservasi
          (reschedule)?
        </h1>
      </div>
    ),
    content: (
      <div className="lg:text-sm text-xs/5 space-y-1 ">
        <p>
          Reservasi dapat dibatalkan atau dijadwalkan ulang (reschedule) dengan
          ketentuan berikut:
        </p>
        <ol className="list-disc lg:text-sm/6 text-xs/5 pl-4">
          <li>
            <span className="font-semibold">
              Pembatalan atau reschedule hanya dapat dilakukan pada hari
              reservasi
            </span>{" "}
            (hari H) dengan datang langsung{" "}
            <span className="font-semibold">ke operator H6.</span>
          </li>
          <li>
            Jika Anda ingin menjadwalkan ulang untuk hari lain, silakan minta
            operator untuk membatalkan reservasi, lalu Anda dapat melakukan
            pemesanan ulang secara mandiri melalui akun Anda.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "faq-2",
    title: (
      <div className="font-bold lg:text-sm text-xs text-primary-1 flex items-center w-full">
        <h1>
          Apa yang terjadi jika saya tidak hadir atau terlambat saat jadwal
          reservasi? Apakah akun saya bisa diblokir?
        </h1>
      </div>
    ),
    content: (
      <div className="lg:text-sm text-xs/5 space-y-1 ">
        <p>Akun Anda akan diblokir jika melanggar ketentuan, seperti:</p>
        <ol className="list-disc lg:text-sm/6 text-xs/5 pl-4">
          <li>
            Telat konfirmasi (melakukan check-in di operator H6) lebih dari 1
            jam setelah jam reservasi
          </li>
          <li>Merusak fasilitas H6</li>
          <li>Melanggar peraturan H6</li>
        </ol>
        <p>
          <span className="font-semibold">
            Jika melanggar ketentuan sebanyak 3 kali
          </span>
          , maka akun Anda akan{" "}
          <span className="font-semibold">terblokir secara otomatis</span> dan{" "}
          <span className="font-semibold">tidak dapat melakukan reservasi</span>{" "}
          selama masa blokir.
        </p>
      </div>
    ),
  },
  {
    id: "faq-3",
    title: (
      <div className="font-bold lg:text-sm text-xs text-primary-1 flex items-center w-full">
        <h1>
          Bagaimana sistem pemesanan berdasarkan tipe meja dan jumlah anggota?
        </h1>
      </div>
    ),
    content: (
      <div className="lg:text-sm text-xs/5 space-y-1 ">
        <p>Terdapat tiga tipe meja di H-6:</p>
        <ol className="list-decimal lg:text-sm/6 text-xs/5 pl-4">
          <li>
            <p className="font-semibold">Meja Individu (Meja-Ixx)</p>
            <p className="">
              Diperuntukkan khusus bagi{" "}
              <span className="font-semibold">pengguna individu.</span> Meja ini
              dapat memiliki beberapa kursi (misalnya 3 atau 6), namun hanya
              dapat digunakan untuk pemesanan satu orang per reservasi.
            </p>
          </li>
          <li>
            <p className="font-semibold">Meja Kelompok (Meja-Kxx)</p>
            <p className="">
              Dapat digunakan untuk pemesanan oleh lebih dari satu orang.
            </p>
            <ol className="list-disc lg:pl-4 pl-2">
              <li>
                Umumnya, satu meja kelompok dapat diisi oleh{" "}
                <span className="font-semibold">beberapa kelompok</span> berbeda
                selama jumlah kursi masih tersedia dan sesuai dengan jumlah
                anggota masing-masing kelompok.
              </li>
              <li>
                Namun, terdapat beberapa meja khusus yang{" "}
                <span className="font-semibold">
                  hanya dapat dipesan oleh satu kelompok
                </span>{" "}
                dengan jumlah anggota yang{" "}
                <span className="font-semibold">
                  harus sesuai dengan jumlah kursi
                </span>{" "}
                di meja tersebut.
              </li>
            </ol>
          </li>
          <li>
            <p className="font-semibold">Meja Bersama (Meja-Bxx)</p>
            <p className="">
              Bersifat fleksibel dan{" "}
              <span className="font-semibold">
                dapat digunakan oleh pemesanan individu maupun kelompok
              </span>
              . Meja ini memungkinkan pemesanan dari berbagai jenis pengguna
              selama kapasitas kursi masih tersedia.
            </p>
          </li>
        </ol>
        <p>
          <span className="font-semibold">
            Jika melanggar ketentuan sebanyak 3 kali
          </span>
          , maka akun Anda akan{" "}
          <span className="font-semibold">terblokir secara otomatis</span> dan{" "}
          <span className="font-semibold">tidak dapat melakukan reservasi</span>{" "}
          selama masa blokir.
        </p>
      </div>
    ),
  },
  {
    id: "faq-4",
    title: (
      <div className="font-bold lg:text-sm text-xs text-primary-1 flex items-center w-full">
        <h1>
          Apa yang harus saya lakukan jika ingin memesan untuk banyak orang
          (lebih dari 6 orang)?
        </h1>
      </div>
    ),
    content: (
      <div className="lg:text-sm text-xs/5 space-y-1 ">
        <p>
          Jika Anda ingin melakukan reservasi untuk pemesanan lebih dari 6
          orang, terdapat dua alternatif:
        </p>
        <ol className="list-disc lg:text-sm/6 text-xs/5 pl-4">
          <li>
            Seluruh anggota melakukan
            <span className="font-semibold">reservasi secara individu</span> di
            meja dengan tipe ‘Bersama’ (Meja-Bxx).
          </li>
          <li>
            Bagi anggota menjadi beberapa kelompok, lalu lakukan{" "}
            <span className="font-semibold">beberapa reservasi kelompok</span>{" "}
            di meja ‘Bersama’ (Meja-Bxx) atau meja ‘Kelompok’ (Meja-Kxx) yang
            jumlah kursinya mencukupi.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "faq-5",
    title: (
      <div className="font-bold lg:text-sm text-xs text-primary-1 flex items-center w-full">
        <h1>
          Apakah saya bisa memperpanjang waktu penggunaan meja saat sedang
          melakukan reservasi?
        </h1>
      </div>
    ),
    content: (
      <div className="lg:text-sm text-xs/5 space-y-1 ">
        <p>
          Sistem tidak menyediakan fitur untuk memperpanjang durasi reservasi
          yang sedang berlangsung. Namun, Anda dapat{" "}
          <span className="font-semibold">
            melakukan reservasi baru untuk sesi berikutnya
          </span>{" "}
          jika masih tersedia, dengan ketentuan berikut:
        </p>
        <ol className="list-disc lg:text-sm/6 text-xs/5 pl-4">
          <li>
            Anda
            <span className="font-semibold">
              belum melakukan pemesanan di hari yang sama
            </span>{" "}
            (karena setiap akun hanya bisa melakukan 1 kali pemesanan per hari).
          </li>
          <li>
            Masih
            <span className="font-semibold">
              tersedia slot kosong di sesi berikutnya
            </span>{" "}
            pada meja yang ingin Anda gunakan.
          </li>
        </ol>
        <p>
          Reservasi dapat dilakukan{" "}
          <span className="font-semibold">melalui akun Anda</span> atau dengan
          bantuan <span className="font-semibold">operator</span>.
        </p>
      </div>
    ),
  },
  {
    id: "faq-6",
    title: (
      <div className="font-bold lg:text-sm text-xs text-primary-1 flex items-center w-full">
        <h1>
          Apakah saya hanya bisa melakukan reservasi untuk minggu ini saja?
          Mengapa tidak bisa reservasi untuk akhir pekan atau hari libur?
        </h1>
      </div>
    ),
    content: (
      <div className="lg:text-sm text-xs/5 space-y-1 ">
        <p>
          Reservasi{" "}
          <span className="font-semibold">
            hanya dapat dilakukan pada hari kerja (Senin - Jumat) dan di minggu
            yang sedang berjalan.
          </span>
        </p>
        <p>
          {" "}
          Misalnya, jika hari ini hari Senin tanggal 1, maka Anda hanya bisa
          melakukan reservasi untuk hari-hari dalam rentang tanggal 1–5
          (Senin–Jumat).
        </p>
        <p>
          Reservasi{" "}
          <span className="font-semibold">
            tidak tersedia pada akhir pekan atau hari libur
          </span>
          , karena H6 tidak beroperasi pada hari-hari tersebut.
        </p>
      </div>
    ),
  },
];