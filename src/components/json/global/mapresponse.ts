export interface mapresponse {
  id:           number;
  table_number?: string;
  total_seats?:  number;
  type?:         string;
  thumbnail?: string;
  is_available?: boolean;
}

export const mapdata: mapresponse = {
  id: 0,
  table_number: '',
  total_seats: 0,
  type: '',
  thumbnail: '',
  is_available: false
}
