import dayjs from "dayjs";

export function getDisabledWeekends() {
  const today = dayjs();
  const startOfWeek = today.startOf("week"); // asumsi minggu dimulai dari Minggu
  const disabled = [];

  for (let i = 0; i < 7; i++) {
    const current = startOfWeek.add(i, "day");
    const day = current.day(); // 0 = Minggu, 6 = Sabtu
    if (day === 0 || day === 6) {
      disabled.push(current.format("YYYY-MM-DD"));
    }
  }

  return disabled;
}

export const getInitialValidDate = (currentDate: Date): Date => {
    const day = currentDate.getDay(); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
    const initialDate = new Date(currentDate); // Buat salinan agar tidak mengubah 'today'

    if (day === 6) { // Jika hari ini Sabtu
      initialDate.setDate(initialDate.getDate() + 2); // Lompat ke Senin
    } else if (day === 0) { // Jika hari ini Minggu
      initialDate.setDate(initialDate.getDate() + 1); // Lompat ke Senin
    }
    // Jika bukan Sabtu atau Minggu, tanggal awal tetap hari ini
    // console.log("Initial valid date:", initialDate);
    return initialDate;
  };