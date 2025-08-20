import type React from "react";
import Image from "next/image";
import Link from "next/link";

// Simple button component since we don't have the PrimaryButton
function PrimaryButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`bg-primary-1 text-white rounded-md font-medium hover:bg-primary-2 transition-colors px-6 py-3 ${className}`}
    >
      {children}
    </button>
  );
}

export default function SuccessPage() {
  return (
    <section className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-12 justify-center items-center min-h-screen px-4 py-8 lg:px-8">
      <div className="space-y-4 lg:space-y-6 w-full max-w-md lg:max-w-2xl text-center lg:text-left">
        <h1 className="font-semibold text-primary-1 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
          Konfirmasi Berhasil
        </h1>
        <div className="space-y-3 lg:space-y-4">
          <p className="text-neutral-3 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
            Kamu telah berhasil mengonfirmasi reservasi ini. Tunggu hingga semua
            anggota menyetujui reservasi, dan reservasi akan segera dibuat.
          </p>
          <p className="text-neutral-3 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
            Silakan cek website reservasi untuk informasi lebih lanjut.
          </p>
        </div>

        <div className="pt-2 lg:pt-4">
          <Link href="/login">
            <PrimaryButton className="text-sm sm:text-base lg:text-lg">
              Masuk ke website
            </PrimaryButton>
          </Link>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Image
          src="/Image/wait.svg"
          width={580}
          height={390}
          alt="Success confirmation illustration"
          className="w-64 h-auto sm:w-80 lg:w-[480px] xl:w-[580px] object-contain"
          priority
        />
      </div>
    </section>
  );
}
