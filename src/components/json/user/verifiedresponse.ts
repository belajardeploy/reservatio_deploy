export interface verifiederesponse {
  id: number;
  ticket_code: string;
  table_number: string;
  date: string;
  date_original: string;
  time: string;
  booker: string;
  member: any[];
  is_late: boolean;
}

export const verifieddata: verifiederesponse = {
  "id": 5,
  "ticket_code": "RSV2025123456789",
  "table_number": "Meja-I02",
  "date": "28 Apr 2025",
  "date_original": "2025-04-28",
  "time": "13.00 - 15.00",
  "booker": "123456789018@mhs.dinus.ac.id",
  "member": [],
  "is_late": false
}