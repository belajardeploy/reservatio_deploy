export interface calendaresponse {
  date: string,
  type: 'upcoming' | 'past' | 'today'
}

export interface penaltyresponse {
  penalty_count: number
}

export interface totalreservationresponse {
  total_reservation: number
}

export interface statusresponse {
  is_banned: 0 | 1,
  is_reserve: 0 | 1,
  ban_until?: string
}

export interface nearestresponse {
  date: string,
  table_number: string,
  person: number,
  time_slot: string
}

export interface datacalendar {
  reservation_id: number;
  detail: detailcalendar;
}

export interface detailcalendar {
  date: Date;
  table_number: string;
  time_slot_id: number;
  purpose: string;
  total_people: number;
}

export const mocknearest = {
  date: '1991-01-01',
  table_number: 'Meja-I01',
  person: 0,
  time_slot_id: 0
}

export const mockstatus: statusresponse = {
  is_banned: 0,
  is_reserve: 0
}

export const mockpenalty = {
  penalty_count: 0
}