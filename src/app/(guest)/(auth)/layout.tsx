"use client"
import React from "react"

interface guestlayout {
  children?: React.ReactNode
}

const GuestLayout = ({ children }: guestlayout) => {
  return (
    <div className=" bg-[url('/Image/bg.webp')] bg-cover flex flex-row-reverse p-8 items-center justify-center lg:gap-4 xl:gap-0 h-screen">
      <div className="hidden lg:block lg:w-[725px] w-fit font-semibold text-white text-[44px] xl:text-[52px] mx-auto">
        <h1>Ruang Belajar Privat dan Produktif,</h1>
        <h1>Hanya Sekali Klik!</h1>
        <p className="mt-4 text-2xl font-normal">
          Temukan ruang belajar yang sesuai dengan kebutuhanmu. Pesan sekarang dan dapatkan konfirmasi ketersediaan dalam 1 kali klik.
        </p>
      </div>
      {children}
    </div>
  )
}

export default GuestLayout;