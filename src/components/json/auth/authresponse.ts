export interface AuthResponse {
  id: number;
  name: string;
  email_mhs: string;
  photo: string;
  penalty_count: number;
  is_reserve: boolean;
  is_banned: boolean;
  is_admin: boolean;
  is_operator: boolean;
  created_at: string;  // bisa diubah jadi Date jika ingin parsing otomatis
  updated_at: string;
  token: string;
  nim?: string
  role: 'user' | 'admin' | string;  // bisa ditentukan lebih spesifik jika perlu
}