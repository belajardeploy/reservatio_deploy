import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ 
  output: 'standalone',
  crossOrigin: 'anonymous',
  images:{
    remotePatterns: [
      new URL('https://lh3.googleusercontent.com/**'), 
      new URL('https://mahasiswa.dinus.ac.id/images/foto/**'),
      new URL('http://reservation-api.wibowomulyoo.my.id/**'),
      new URL('https://reservation-api.wibowomulyoo.my.id/**'),
      new URL('http://127.0.0.1:8000/**'),
      new URL('https://ui-avatars.com/**'),
      new URL('https://api-reservasi.bengkelkoding.dinus.id/**'),
    ],
    // domains: ['ui-avatars.com']
  },
};

export default nextConfig;
