import React from "react";
import Image from "next/image";

interface LogoSectionProps {
  className?: string;        // class untuk wrapper
  imageClassName?: string;   // class untuk image
  width?: number;            // default width
  height?: number;           // default height
}

const LogoAlt: React.FC<LogoSectionProps> = ({
  className = "",
  imageClassName = "",
}) => (
  <div
    className={`flex flex-col space-y-1 items-center ${className}`}
  >
    <div className="w-[80px] h-[86px] relative">
      <Image
        src="/Image/logobengkod_only.svg"
        fill
        sizes="(max-width: 640px) 80px, (max-width: 768px) 120px, 180px"
        className={`object-contain mx-auto ${imageClassName}`}
        alt="Logo"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
    <h1 className="font-bold text-primary-1 text-3xl text-center">
      Bengkel Koding
    </h1>
    <p className="text-neutral-3 text-base text-center">
      Coworking Space
    </p>
  </div>
);

export default LogoAlt;