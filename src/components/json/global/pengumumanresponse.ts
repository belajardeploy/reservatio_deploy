export interface pengumumanUserresponse {
  id: number;
  title: string;
  content: string;
  type: "Informasi" | "Pemberitahuan" | "Pengingat";
  sender: string;
  category?: "Blokir" | "Pelanggaran" | "Umum" | "Pembatalan" | null;
  created_at: string;
}