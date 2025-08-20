export interface AllTableResponse {
    id:           number;
    table_number: string;
}

export interface DetailTableResponse{
    table_number:    string;
    total_seats:     number;
    type:            string;
    is_available:    boolean;
    thumbnail:       string;
    seats_available: number;
    reservations:    detailreservationadm[];
}

export interface detailreservationadm {
    id:           number;
    status:       string;
    reserver:     string;
    purpose:      string;
    total_people: number;
    members:      Member[];
}

interface Member {
    name: string;
}