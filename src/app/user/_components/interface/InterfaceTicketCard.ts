import { reservasiresponse } from "@/components/json/user/reservasiresponse";
import { verifiederesponse } from "@/components/json/user/verifiedresponse";

export interface ticketcardverified {
  className?: string,
  result: verifiederesponse,
  children?: React.ReactNode,
  onClick?: (x: any) => void
}

export interface ticketcardreservation {
  className?: string,
  result: reservasiresponse,
  children?: React.ReactNode,
}