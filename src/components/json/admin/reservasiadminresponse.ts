export interface CheckConflictResponse {
  has_conflicts: boolean;
  conflicts: Conflict[];
  total_conflicts: number;
}

export interface Conflict {
  time_slot_id: number;
  table_id: number;
  table_number: string;
  time_range: string;
  conflicting_reservations: ConflictingReservation[];
}

export interface ConflictingReservation {
  id: number;
  code: string;
  status: string;
  booker: string;
  total_person: number;
  purpose: string;
}
