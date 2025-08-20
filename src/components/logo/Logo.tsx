import Image from "next/image"

const BengkodLogo = ({className = ''}) => {
  return (
    <Image
      src={"/Image/bengkod-logo-2.svg"}
      width={230}
      height={80}
      className={"rounded-full w-[201px] " + className}
      alt="profile photo"
    />
  )
}

export default BengkodLogo;