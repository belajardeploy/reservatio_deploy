export interface dashboardadmresponse {
    total_reservation_today:     number;
    total_checkin_today:         number;
    total_available_table_today: number;
    user_distribution:           userdistributionresp;
    user_complaints:             usercomplaintsresp[];
    reservation_distribution:    ReservationDistribution[];
    reservations_today:          reservationstodayresp[];
}

export interface ReservationDistribution {
    week:      string;
    done:      number;
    violation: number;
    cancel:    number;
}

export interface reservationstodayresp {
    reserver:     string;
    table_number: string;
    purpose:      string;
    total_people: number;
    status:       string;
}

export interface usercomplaintsresp {
    id:          number;
    category:    string;
    description: string;
    sender:      string;
    created_at:  string;
}

export interface userdistributionresp {
    total_user:  number;
    active_user: number;
    banned_user: number;
}