// import ClockCheckedSvg from "@/components/svg/ClockCheckedSvg";
// import KeepCleanSvg from "@/components/svg/KeepCleanSvg";
// import LoudSvg from "@/components/svg/LoudSvg";
// import NoFoodSvg from "@/components/svg/NoFoodSvg";
import ClockCheckedSvg from "../svg/ClockChecked";
import KeepCleanSvg from "../svg/KeepCleanSvg";
import LoudSvg from "../svg/LoudSvg";
import NoFoodSvg from "../svg/NoFoodSvg";

export const ContentRegulations = [
  {
    id: 1,
    icon: <ClockCheckedSvg fill="#1e3a8a" className="lg:size-12 size-8" />,
    title: "Waktu Penggunaan",
    content:
      "Gunakan ruangan sesuai jam operasional yang telah ditetapkan untuk kenyamanan bersama.",
  },
  {
    id: 2,
    icon: <LoudSvg fill="#ea580c" className="lg:size-12 size-8" />,
    title: "Kenyamanan & Ketenangan",
    content:
      "Jaga suasana tenang. Hindari suara berisik yang mengganggu pengguna lain.",
  },
  {
    id: 3,
    icon: <NoFoodSvg fill="#0f766e" className="lg:size-12 size-8" />,
    title: "Makanan & Minuman",
    content:
      "Dilarang membawa makanan & minuman berat yang berbau menyengat di dalam ruangan.",
  },
  {
    id: 4,
    icon: <KeepCleanSvg fill="#7c3aed" className="lg:size-12 size-8" />,
    title: "Menjaga Kebersihan",
    content: "Jaga kebersihan lingkungan sekitar. Buang sampah pada tempatnya.",
  },
];
