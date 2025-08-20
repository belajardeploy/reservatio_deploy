export interface reservasiresponse {
  id: number;
  ticket_code: string;
  table_number: string;
  date: string;
  date_original: string;
  time: string;
  booker: string;
  expires_at: string,
  member: any[];
  is_late: boolean;
}

export interface statuskonfirmasiresponse {
  confirmed: string[];
  not_confirmed: string[];
}

export const defaultreservasi: reservasiresponse = {
  "id": 5,
  "ticket_code": "",
  "table_number": "",
  "date": "",
  "date_original": "",
  "time": "",
  "booker": "",
  "expires_at": '',
  "member": [],
  "is_late": false
}