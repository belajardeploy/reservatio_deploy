export interface confirmationresponse {
  isLate:      boolean;
  banned:      boolean;
  reservation: detail;
}

export interface detail {
  booker:       string;
  total_person: number;
  table_number: string;
  time:         string;
}