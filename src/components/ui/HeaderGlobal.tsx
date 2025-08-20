import clsx from "clsx"
import React from "react";

interface headerglobal{
  className?: string,
  children: React.ReactNode
}

const HeaderGlobal = ({className, children} : headerglobal) => {
  return(
    <section className={clsx("bg-white md:py-3 px-4 md:px-[5%] border-b-[1px] border-b-neutral-4 flex w-full", 
      className
    )}>
      {children}
    </section>
  )
}

export default HeaderGlobal;