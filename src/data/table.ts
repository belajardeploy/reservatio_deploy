
export const mockTablesIndividu = [
  // Meja Huruf I
  {  id: 1, table_number: "I01"},
  {  id: 2, table_number: "I02"},
];

export const mockTablesKelompok = [
  // Meja Kelompok K
  ...Array.from({ length: 19 }, (_, i) => ({
    table_number: `K${(i + 1).toString().padStart(2, "0")}`,
    id: i + 3,
  }))
];

export const mockTablesBerbagi = [
  // Meja Berbagi B
  { table_number: "B01", id: 22 },
  { table_number: "B02", id: 23 },
  { table_number: "B03", id: 24 },
];


export const mockTables = [
  ...mockTablesIndividu,
  ...mockTablesKelompok,
  ...mockTablesBerbagi,
];