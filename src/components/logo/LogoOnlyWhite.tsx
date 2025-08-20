import Image from "next/image";

const LogoOnlyWhite = ({ className = "" }) => {
  return (
    <Image
      src={"/Image/bengkod-logo-white.svg"}
      width={230}
      height={80}
      className={"rounded-full w-[201px] " + className}
      alt="profile photo"
    />
  );
};

export default LogoOnlyWhite;
