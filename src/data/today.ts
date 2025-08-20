export const now = new Date(); // Waktu sekarang


const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, '0'); // Bulan ditambahkan 1 karena dimulai dari 0
const ddnow = String(now.getDate()).padStart(2, '0');

const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
// const seconds = now.getSeconds().toString().padStart(2, '0');

export const formattedtoday = `${yyyy}-${mm}-${ddnow}`;

export const currentTime = now.getHours() * 60 + now.getMinutes();
export const displaytime = `${hours}:${minutes}`