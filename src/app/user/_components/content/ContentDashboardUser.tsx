import { Info, SquarePen } from "lucide-react";

export const ContentPeraturanReservasi = [
  {
    id: "faq-4",
    title: (
      <div className="flex gap-x-2.5 text-xs font-semibold items-center">
        <SquarePen size={24} />
        <h1>Peraturan reservasi</h1>
      </div>
    ),
    content: (
      <div className="space-y-2 text-[10px]">
        <ol className="list-decimal text-[10px]/5 pl-2.5">
          <li>Hanya dapat meminjam meja <span className="font-semibold">1 kali</span> dalam <span className="font-semibold">1 hari</span> dan maksimal untuk <span className="font-semibold">5 hari</span> ke depan.</li>
          <li><span className="font-semibold">Dilarang</span> membawa <span className="font-semibold"> makanan & minuman berbau menyengat</span>  yang mengganggu orang lain.</li>
          <li>Jumlah orang, waktu, dan tanggal reservasi <span className="font-semibold">tidak dapat diubah</span> setelah reservasi berhasil dilakukan.</li>
        </ol>
      </div>
    ),
  },
]

export const ContentPenaltyInfo = [
  {
    id: "faq-4",
    title: (
      <div className="flex gap-x-2.5 text-xs font-semibold items-center">
        <Info size={24} />
        <h1>Peringatan Penalti</h1>
      </div>
    ),
    content: (
      <div className="space-y-2 text-[10px]">
        <ol className="list-decimal text-[10px]/5 pl-2.5">
          <li>Jika total penalti mencapai <span className="font-semibold">3 kali</span> anda akan <span className="font-semibold">diblokir</span> dan tidak dapat melakukan reservasi.</li>
          <li>Jika tidak konfirmasi dalam <span className="font-semibold">1 jam</span> maka reservasi akan hangus dan terkena <span className="font-semibold"> penalti</span>.</li>
          <li>Pengguna yang <span className="font-semibold"> tidak menaati aturan </span> akan dikenakan penalti baik dari sistem atau operator selama <span className="font-semibold">1 minggu</span>.</li>
        </ol>
      </div>
    ),
  },
]