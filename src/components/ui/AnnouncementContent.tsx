import React from "react";
import { pengumumanUserresponse } from "@/components/json/global/pengumumanresponse";

interface AnnouncementContentProps {
  data: pengumumanUserresponse;
}

export default function AnnouncementContent({
  data,
}: AnnouncementContentProps) {
  const baseClass =
    "lg:text-xs/6 break-words whitespace-normal text-justify text-[10px]/4";
  switch (data.type) {
    case "Informasi":
      return (
        <div className="space-y-1.5">
          <p className={baseClass}>
            Hai, Sobat Reservasi! Berikut informasi terbaru untuk kamu.
          </p>
          <p className={baseClass}>{data.content}</p>
          <p className={baseClass}>
            Pastikan kamu tetap update agar tidak ketinggalan informasi, ya!
          </p>
        </div>
      );
    case "Pemberitahuan":
      switch (data.category) {
        case "Blokir":
          return (
            <div className="space-y-1.5">
              <p className={baseClass}>
                Halo, kami informasikan bahwa akun kamu telah diblokir sementara
                karena melakukan pelanggaran lebih dari 3 kali.
              </p>
              <p className={`${baseClass} bg-neutral-4/50 p-2 rounded-lg`}>
                Mohon diperhatikan bahwa selama masa pemblokiran, kamu tidak
                dapat melakukan reservasi.
              </p>
              <p className={baseClass}>
                Terima kasih telah menggunakan layanan reservasi.
              </p>
            </div>
          );
        case "Pelanggaran":
          return (
            <div className="space-y-1.5">
              <p className={baseClass}>
                Halo, kami informasikan bahwa akun kamu telah melakukan
                pelanggaran:
              </p>
              <div className="w-full bg-neutral-4/50 p-2 rounded-lg ">
                <p className={`${baseClass}`}>{data.content}</p>
              </div>
              <p className={`${baseClass} text-red-600 font-semibold`}>
                Mohon untuk lebih memperhatikan peraturan yang berlaku.
              </p>
            </div>
          );
        case "Pembatalan":
        case "Umum":
          return (
            <div className="space-y-1.5">
              <p className={baseClass}>
                Halo, reservasi kamu terpaksa kami batalkan karena alasan
                berikut:
              </p>
              <p
                className={`${baseClass} bg-neutral-4/50 p-2 rounded-lg`}
              >
                {data.content}
              </p>
            </div>
          );
        default:
          return (
            <p className="text-[10px] line-clamp-3 mt-2 break-all">
              {data.content}
            </p>
          );
      }
    case "Pengingat":
      return (
        <div className="space-y-1.5">
          <p className={baseClass}>{data.content}</p>
          <p className={baseClass}>
            Pastikan kamu tetap update agar tidak ketinggalan informasi, ya!
          </p>
        </div>
      );
    default:
      return null;
  }
}
