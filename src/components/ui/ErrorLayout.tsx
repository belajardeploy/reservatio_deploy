import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BengkodLogo from "@/components/logo/Logo";

interface ErrorLayoutProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

export default function ErrorLayout({
  imageSrc,
  imageAlt,
  title,
  description,
}: ErrorLayoutProps) {
  return (
    <div className="bg-[url('/Image/error.png')] bg-cover bg-center w-full min-h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8 sm:mb-12">
          <BengkodLogo />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            {/* Error Image */}
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
              <Image
                src={imageSrc || "/placeholder.svg"}
                width={580}
                height={202}
                alt={imageAlt}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight px-4">
              <span className="text-primary-1">Oops!</span> {title}
            </h1>

            {/* Description */}
            <p className="text-neutral-3 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <Link
          href="/"
          className="flex gap-x-2 items-center hover:opacity-80 transition-opacity duration-200 mt-8"
        >
          <ArrowLeft size={20} className="stroke-primary-1 sm:w-6 sm:h-6" />
          <p className="text-base sm:text-lg text-primary-1 font-medium">
            Kembali ke halaman utama
          </p>
        </Link>
      </div>
    </div>
  );
}
