import { CalendarPlus, Headset, House, Megaphone, MessageCircleQuestion, Tickets, UserRound } from "lucide-react";

export const ContentMainLinks = [
  {
    href: "/user/dashboard",
    icon: <House />,
    label: "Dashboard"
  },
  {
    href: "/user/buat_reservasi",
    icon: <CalendarPlus />,
    label: "Buat Reservasi"
  },
  {
    href: "/user/reservasi_&_riwayat",
    icon: <Tickets />,
    label: "Reservasi & Riwayat"
  },
  {
    href: "/user/pengumuman",
    icon: <Megaphone />,
    label: "Pengumuman"
  }
];

export const ContentOtherLinks = [
  {
    href: "/user/profil",
    icon: <UserRound />,
    label: "Profil"
  },
  {
    href: "/user/hubungi_kami",
    icon: <Headset />,
    label: "Hubungi Kami"
  },
  {
    href: "/user/FAQ",
    icon: <MessageCircleQuestion />,
    label: "FAQ"
  },
]