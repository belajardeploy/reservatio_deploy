export interface laporanresponse {
    id:          number;
    username:    string;
    email:       string;
    no_hp:       string;
    category:    "Masalah Reservasi" | "Bug atau Error Sistem" | "Akun & login" | "Lainnya (Harap Jelaskan)";
    description: string;
    is_read:     boolean;
    created_at:  string;
}