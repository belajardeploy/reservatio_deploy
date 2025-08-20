import { useGetConfirmationQuery } from "@/services/user/ConfirmationUserServices";
import { useEffect, useRef, useState } from "react";
import { verifiederesponse } from "@/components/json/user/verifiedresponse";
import TicketVerifiedCard from "@/app/user/_components/card/TicketVerifiedCard";
import PrimaryButton from "@/components/button/PrimaryButton";
import ResponsiveImage from "@/components/ResponsiveImage";
import QRCode from 'qrcode';

const ReservasiAktif = () => {
  const { data } = useGetConfirmationQuery({})
  const [verifiedtoday, setVerified] = useState<verifiederesponse[]>([])
  const [verifiedlater, setVerifiedLater] = useState<verifiederesponse[]>([])
  const [src, setSrc] = useState<string>('/Image/dummyqr.png')
  const qrmodal = useRef<HTMLDialogElement>(null)
  function cetakQR(x: string) {
    QRCode.toDataURL(x, { type: 'image/png' }).then(setSrc)
    qrmodal.current?.showModal()
  }

  async function downloadFile() {
    if (src) {
      // console.log("Downloading....")
      const response = await fetch(src)
      if (response.status != 200) {
        console.log("Error fetch data")
        return
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a');
      a.href = url;
      a.download = "qrcode.jpg"
      a.click()
    }
  }

  useEffect(() => {
    if (data) {
      console.log(data)
      if (data.status == 'success') {
        console.log(data.data.reservations)
        setVerified(data.data.reservations.today)
        setVerifiedLater(data.data.reservations.coming)
      } else if (data.status == 'error') {
        // setVerified([])
        // setVerifiedLater([])
        // setVerified([])
      }
    }
  }, [data])

  return (
    <section className="flex flex-col gap-y-4">

      {/* HARI INI */}
      <div className="w-full">
        <p className="text-neutral-3/50 italic text-sm mt-2">Hari ini</p>

        {verifiedtoday.length > 0 ?
          <div className=" md:grid grid-cols-2 gap-3.5 mt-2 space-y-2 md:space-y-0">
            {verifiedtoday.map((perdata, index) => (
              <TicketVerifiedCard className="col-span-1 flex flex-col" result={perdata} onClick={() => cetakQR(perdata.ticket_code)} key={index} />
            ))}
          </div>
          :
          <div className="bg-white rounded-xl py-4 mt-2 text-sm text-primary-1 text-center">
            <p>Saat ini Anda tidak memiliki reservasi yang dijadwalkan untuk hari ini.</p>
          </div>
        }
      </div>

        {/* AKAN DATANG */}
      <div className="w-full">
        <p className="text-neutral-3/50 italic text-sm">Akan datang</p>

        {verifiedlater.length > 0 ?
          <div className=" md:grid grid-cols-2 gap-3.5 mt-2 space-y-2 md:space-y-0">
            {verifiedlater.map((perdata, index) => (
              <TicketVerifiedCard className="col-span-1 flex flex-col" result={perdata} onClick={() => cetakQR(perdata.ticket_code)} key={index} />
            ))}
          </div>
          :
          <div className="bg-white rounded-xl py-4 mt-2 text-sm text-primary-1 text-center">
            <p>Saat ini Anda tidak memiliki reservasi yang dijadwalkan untuk akan datang</p>
          </div>
        }
      </div>



      <dialog id="my_modal_1" className="modal" ref={qrmodal}>
        <div className="modal-box bg-white rounded-lg lg:w-[30%] w-11/12 flex flex-col gap-y-2">
          <div className="border-b-2 border-[#00000066]/[.4] flex items-center">
            <h3 className="font-bold lg:text-lg text-[14px] pt-2 pb-4 mr-auto text-center hidden md:block">Scan kode QR berikut pada operator H6!</h3>
            <h3 className="font-bold lg:text-lg text-[14px] pt-2 pb-4 mr-auto text-center md:hidden">Kode QR</h3>
            <form method="dialog" className="">
              <button className="cursor-pointer">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.31382 5.89982L10.8488 2.36382C10.9443 2.27157 11.0205 2.16123 11.0729 2.03922C11.1253 1.91722 11.1529 1.786 11.1541 1.65322C11.1552 1.52044 11.1299 1.38876 11.0796 1.26587C11.0294 1.14297 10.9551 1.03132 10.8612 0.937425C10.7673 0.843532 10.6557 0.769279 10.5328 0.718998C10.4099 0.668717 10.2782 0.643415 10.1454 0.644569C10.0126 0.645723 9.88142 0.673309 9.75942 0.725718C9.63741 0.778127 9.52707 0.854309 9.43482 0.949819L5.89882 4.48482L2.36382 0.949819C2.27157 0.854309 2.16123 0.778127 2.03922 0.725718C1.91722 0.673309 1.786 0.645723 1.65322 0.644569C1.52044 0.643415 1.38876 0.668717 1.26587 0.718998C1.14297 0.769279 1.03132 0.843532 0.937425 0.937425C0.843532 1.03132 0.769279 1.14297 0.718998 1.26587C0.668717 1.38876 0.643415 1.52044 0.644569 1.65322C0.645723 1.786 0.673309 1.91722 0.725718 2.03922C0.778127 2.16123 0.854309 2.27157 0.949819 2.36382L4.48482 5.89882L0.949819 9.43482C0.854309 9.52707 0.778127 9.63741 0.725718 9.75942C0.673309 9.88142 0.645723 10.0126 0.644569 10.1454C0.643415 10.2782 0.668717 10.4099 0.718998 10.5328C0.769279 10.6557 0.843532 10.7673 0.937425 10.8612C1.03132 10.9551 1.14297 11.0294 1.26587 11.0796C1.38876 11.1299 1.52044 11.1552 1.65322 11.1541C1.786 11.1529 1.91722 11.1253 2.03922 11.0729C2.16123 11.0205 2.27157 10.9443 2.36382 10.8488L5.89882 7.31382L9.43482 10.8488C9.52707 10.9443 9.63741 11.0205 9.75942 11.0729C9.88142 11.1253 10.0126 11.1529 10.1454 11.1541C10.2782 11.1552 10.4099 11.1299 10.5328 11.0796C10.6557 11.0294 10.7673 10.9551 10.8612 10.8612C10.9551 10.7673 11.0294 10.6557 11.0796 10.5328C11.1299 10.4099 11.1552 10.2782 11.1541 10.1454C11.1529 10.0126 11.1253 9.88142 11.0729 9.75942C11.0205 9.63741 10.9443 9.52707 10.8488 9.43482L7.31382 5.89882V5.89982Z" fill="#98A2B3" />
                </svg>
              </button>
              {/* if there is a button in form, it will close the modal */}
            </form>
          </div>

          <div className="flex w-full justify-center md:hidden">
            {src && <ResponsiveImage
              width={350}
              height={350}
              className="w-[300px] h-[300px]"
              src={src}
              loader=''
              alt="qr code here"
            />}
          </div>
          <div className="md:flex w-full justify-center hidden">
            <ResponsiveImage
              width={350}
              height={350}
              className="w-[350px] h-[350px]"
              src={src}
              alt="qr code here"
            />
          </div>


          <PrimaryButton onClick={downloadFile}>
            Unduh QR
          </PrimaryButton>
        </div>
      </dialog>
    </section>
  )
}

export default ReservasiAktif;