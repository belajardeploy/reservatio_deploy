"use client"
import { useState } from "react";
import FailReservation from "@/app/user/_components/ui/FailReservation";
import { CountdownConfirmation } from "@/app/user/_components/ui/CountdownConfirmation";

export default function CONFIRMATIONPAGE() {
  const [page, setPage] = useState<number>(0);
  if (page === 0) {
    return <CountdownConfirmation setPage={setPage} />;
  } else if (page === 1) {
    return <FailReservation />;
  } else {
    return null;
  }
}
