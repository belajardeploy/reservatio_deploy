import { CalendarPlus, FileUser, History, House, Inbox, Megaphone, Settings2, UserRound } from "lucide-react";

export const mainlinksadmin = [
  {
    href: "/admin/dashboard",
    icon: <House />,
    label: "Dashboard"
  },
  {
    href: "/admin/kelola_meja",
    icon: <Settings2 />,
    label: "Kelola Meja"
  },
  {
    href: "/admin/reservasi_internal",
    icon: <CalendarPlus />,
    label: "Reservasi Internal"
  },
  {
    href: "/admin/pengumuman",
    icon: <Megaphone />,
    label: "Pengumuman"
  },
  {
    href: "/admin/laporan_pengguna",
    icon: <Inbox />,
    label: "Laporan Pengguna"
  },
  {
    href: "/admin/kelola_pengguna",
    icon: <FileUser />,
    label: "Kelola Pengguna"
  },
  {
    href: "/admin/kelola_reservasi",
    icon: <History />,
    label: "Kelola Reservasi"
  },
];

export const otherlinksadmin = [
  {
    href: "/admin/profil",
    icon: <UserRound />,
    label: "Profil"
  },
]