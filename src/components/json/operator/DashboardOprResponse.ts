export interface dashboardoprresponse {
  total_reservation_today:     number;
  total_checkin_today:         number;
  total_available_table_today: number;
  tables:                      Table[];
}

export interface Table {
  id:           number;
  table_number: string;
}

export interface availabilityresponse {
  thumbnail: string;
  table_type: string;
  total_seats: number;
  availability: Availability[];
}

export interface detailreservationoprresponse {
  reservation_id: string;
  reserver: string;
  total_people: number;
  time_slot: string;
  purpose: string;
}

export interface Availability {
  time_slot: string;
  is_available: boolean;
}