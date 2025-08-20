import { JSX } from "react";
import { defaultMsg } from "@/app/user/_components/content/ContentDefaultErrorReservation";

export function ErrorReservation(
  status: string,
  data: any,
  setErrorTitle: (val: string) => void,
  setErrorMsg: (val: JSX.Element) => void,
  setIconClass: (val: "stroke-primary-1" | "stroke-red-2") => void,
  setErrorValidation: (val: any) => void,
) {
  switch (status) {
    case "member_same_time_reservation":
      setErrorTitle("Salah satu anggota memiliki reservasi di waktu yang sama.");
      setErrorMsg(
        <p>
          Mohon cek kembali jadwal masing-masing anggota atau ganti waktu
          reservasi untuk melanjutkan.
        </p>
      );
      setIconClass("stroke-primary-1");
      break;

    case "member_banned":
      setErrorTitle("Salah satu anggota memiliki akun yang sedang diblokir.");
      setIconClass("stroke-red-2");
      setErrorMsg(
        <p>
          Akun Anda sedang <span className="font-semibold">diblokir</span>{" "}
          dan tidak dapat melakukan reservasi{" "}
          <span className="font-semibold">
            hingga {data?.ban_until}
          </span>{" "}
          karena telah mencapai batas penalti.
        </p>
      );
      break;

    case "member_already_reserved":
      setErrorTitle("Salah satu anggota sudah melakukan reservasi hari ini.");
      setIconClass("stroke-primary-1");
      setErrorMsg(
        <p>
          Setiap pengguna hanya dapat melakukan{" "}
          <span className="font-semibold">1 kali reservasi per hari</span>
          . Silakan lakukan reservasi kembali di hari berikutnya.
        </p>
      );
      break;

    case "same_time_reservation":
      setErrorTitle("Anda telah memiliki reservasi di hari dan waktu yang sama!");
      setIconClass("stroke-primary-1");
      setErrorMsg(
        <p>
          Silakan cek tiket reservasi Anda di menu{" "}
          <span className="font-semibold">
            &apos;Reservasi & Riwayat&apos;
          </span>{" "}
          atau ubah jadwal reservasi Anda.
        </p>
      );
      break;

    case "already_reserved":
      setErrorTitle("Anda telah melakukan reservasi hari ini!");
      setIconClass("stroke-primary-1");
      setErrorMsg(
        <p>
          Setiap pengguna hanya dapat melakukan{" "}
          <span className="font-semibold">1 kali reservasi per hari</span>
          . Silakan lakukan reservasi kembali di hari berikutnya.
        </p>
      );
      break;

    case "banned":
      setErrorTitle("Reservasi tidak dapat dilakukan!");
      setIconClass("stroke-red-2");
      setErrorMsg(
        <p>
          Akun Anda sedang <span className="font-semibold">diblokir</span> dan tidak dapat melakukan reservasi hingga <span className="font-semibold">{data?.ban_until}</span> karena telah mencapai batas penalti.
        </p>
      );
      break;

    case "validation_error":
      setErrorTitle("Reservasi tidak dapat dilakukan!");
      setIconClass("stroke-red-2");
      setErrorMsg(defaultMsg);
      setErrorValidation(data?.errors);
      break;

    case "duplicate_email":
      setErrorTitle("Email duplikat ditemukan!");
      setIconClass("stroke-primary-1");
      setErrorMsg(
        <p>
          Silakan periksa kembali dan pastikan tidak ada email yang diinput lebih dari satu kali.
        </p>
      );
      break;

    default:
      setErrorTitle("Kesalahan saat reservasi");
      setIconClass("stroke-primary-1");
      setErrorMsg(defaultMsg);
      break;
  }
}