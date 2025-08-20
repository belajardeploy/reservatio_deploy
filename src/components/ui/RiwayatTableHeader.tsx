import React from "react";

export default function RiwayatTableHeader() {
  const cols = [
    "Tanggal",
    "Jumlah Orang",
    "Nomor Meja",
    "Waktu",
    "Keperluan",
    "Kode tiket",
    "Status",
  ];

  return (
    <>
      {cols.map((label) => (
        <div
          key={label}
          className="py-2 text-black font-semibold text-sm border-b border-gray-200"
        >
          {label}
        </div>
      ))}
    </>
  );
}