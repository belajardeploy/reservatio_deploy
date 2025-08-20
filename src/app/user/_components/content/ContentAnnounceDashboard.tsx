import { pengumumanUserresponse } from "@/components/json/global/pengumumanresponse";

interface RenderContentAnnounceProps {
  data: pengumumanUserresponse;
}

export const ContentAnnounceDashboard = ({
  data,
}: RenderContentAnnounceProps) => {
  switch (data.type) {
    case "Informasi":
    case "Pengingat":
      return (
        <p className="text-[10px] line-clamp-3 mt-2 break-all">
          {data.content}
        </p>
      );

    case "Pemberitahuan":
      switch (data.category) {
        case "Blokir":
          return (
            <div className="text-[10px] text-neutral-3 space-y-1">
              <p className="line-clamp-3 text-wrap">
                Halo, kami informasikan bahwa{" "}
                <span className="font-semibold">
                  akun Anda telah diblokir sementara
                </span>{" "}
                karena melakukan pelanggaran lebih dari 3 kali.
              </p>
              <p className="bg-neutral-4/50 p-2 rounded-lg line-clamp-2">
                Mohon diperhatikan bahwa selama masa pemblokiran,{" "}
                <span className="font-semibold">
                  Anda tidak dapat melakukan reservasi
                </span>
                .
              </p>
              <p className="line-clamp-3">
                Terima kasih telah menggunakan layanan reservasi.
              </p>
            </div>
          );

        case "Pelanggaran":
          return (
            <div className="text-[10px] text-neutral-3 space-y-1">
              <p className="line-clamp-3 text-wrap break-words">
                Halo, kami informasikan bahwa akun Anda telah melakukan
                pelanggaran:
              </p>
              <p className="bg-neutral-4/50 p-2 rounded-lg line-clamp-2 break-words">
                {data.content}
              </p>
              <p className="line-clamp-3 text-red-600 font-semibold">
                Mohon untuk lebih memperhatikan peraturan yang berlaku.
              </p>
            </div>
          );
        case "Pembatalan":
        case "Umum":
          return (
            <div className="text-[10px] text-neutral-3 space-y-1">
              <p className="line-clamp-3 text-wrap break-words">
                Halo, reservasi kamu terpaksa kami batalkan karena alasan
                berikut:
              </p>
              <p className="bg-neutral-4/50 p-2 rounded-lg line-clamp-2 break-words">
                {data.content}
              </p>
            </div>
          );

        default:
          // Default untuk kategori pemberitahuan lainnya (akun diblokir sementara)
          return (
            <p className="text-[10px] line-clamp-3 mt-2 break-all">
              {data.content}
            </p>
          );
      }

    default:
      // Fallback untuk type yang tidak dikenali
      return (
        <p className="text-[10px] line-clamp-3 mt-2 break-all">
          {data.content}
        </p>
      );
  }
};
