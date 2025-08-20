export interface logreservasiresponse {
    table:      Table[];
    graph:      ReservationDistribution[];
    pagination: Pagination;
}

interface ReservationDistribution {
    week:      string;
    done:      number;
    violation: number;
    cancel:    number;
}

export interface Dataset {
    label: string;
    data:  number[];
}

export interface Pagination {
    total:        number;
    per_page:     number;
    current_page: number;
    last_page:    number;
    from:         number;
    to:           number;
}

export interface Table {
    tanggal:      string;
    pemesan:      string;
    nomor_meja:   string;
    waktu:        string;
    keperluan:    string;
    jumlah_orang: number;
    status:       string;
}