import Image from "next/image"
import React from "react"
// import { image } from "@/components/interface/Image"
import { ImageProps } from "@/components/interface/InterfaceImage"

const ResponsiveImage = ({ className, src, width, height, alt = "", photoclassName = "", loader = 'be'}: ImageProps) => {
  const srcloader = loader == 'be' ? process.env.NEXT_PUBLIC_STORAGE_BASE_URL : loader

  const imageLoader = () => {
    return `${srcloader}/${src}`
  }
  
  return (
    <div className={"" + className}>
      <Image
        style={{
          width: '100%',
          height: '100%'
        }}
        className={photoclassName}
        src={src}
        height={height}
        width={width}
        alt={alt}
        loader={() => imageLoader()}
      />
    </div>
  )
}

export default ResponsiveImage