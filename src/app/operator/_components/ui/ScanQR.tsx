import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import clsx from "clsx"
import PrimaryButton from "@/components/button/PrimaryButton";
import { DetailReservationCard, OprToast } from "../toast/OprToast";
import { useConfirmReservationOprMutation } from "@/services/operator/DashboardOprService";
import InputText from "@/components/input/InputText";
import FailureModal from "@/components/modal/FailureModal";
import { confirmationresponse } from "@/components/json/operator/ConfirmationQRResponse";

interface scanqrprop {
  className?: string;
}
const ScanQr = ({ className }: scanqrprop) => {
  const [showtoast, setShowToast] = useState(false);
  const [showdetail, setShowDetail] = useState(false);
  const webcamref = useRef<Webcam>(null);
  const [codereserved, setCodeReserved] = useState<string>("");
  const [result, setResult] = useState<confirmationresponse>();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const failuremodal = useRef<HTMLDialogElement>(null);
  const [ConfirmReservation] = useConfirmReservationOprMutation();
  const [animate, setAnimate] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState(true);

  // function onCapture() {
  //   if (!webcamref.current) return;


  //   const imageSrc = webcamref.current.getScreenshot();

  //   if (imageSrc) {
  //      // Matikan kamera setelah menangkap gambar
  //     const image = new Image();
  //     image.src = imageSrc;

  //     image.onload = () => {
  //       const canvas = document.createElement("canvas");
  //       canvas.width = image.width;
  //       canvas.height = image.height;

  //       const ctx = canvas.getContext("2d");
  //       if (ctx) {
  //         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  //         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //         const qrCode = jsQR(
  //           imageData.data,
  //           imageData.width,
  //           imageData.height
  //         );
  //         console.log(qrCode);

  //         if (qrCode) {
  //           // setStatus('')
  //           setIsCameraActive(false);
  //           Submit(qrCode.data);
  //           // setCodeReserved(qrCode.data)
  //         }
  //       }
  //     };
  //   }
  // }

  const Submit = useCallback(async (code: string) => {
    setAnimate(true);
    if (code.length < 1) {
      setAnimate(false);
      return null;
    }

    const body = new FormData();
    failuremodal.current?.close();
    setShowDetail(false);
    setShowToast(false);

    body.append("code", code);
    const result = await ConfirmReservation(body).unwrap();
    setAnimate(false);
    if (!result) return null;

    if (result.status === "error") {
      setError(result.message);
      failuremodal.current?.showModal();
      return;
    }

    if (result.status === "success") {
      setMessage(result.message);
      setResult(result.data);
      setShowToast(true);
      setShowDetail(true);
    }
  }, [ConfirmReservation]);

  const onCapture = useCallback(() => {
    if (!webcamref.current || !isCameraActive) return;

    const imageSrc = webcamref.current.getScreenshot();

    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(
            imageData.data,
            imageData.width,
            imageData.height
          );

          if (qrCode) {
            setIsCameraActive(false);
            Submit(qrCode.data);
          }
        }
      };
    }
  }, [webcamref, Submit, isCameraActive])

  useEffect(() => {
    if (!isCameraActive) return;
    const interval = setInterval(onCapture, 500); // Scan every 500ms
    return () => clearInterval(interval);
  }, [isCameraActive, onCapture]);

  // async function Submit(code: string) {
  //   setAnimate(true);
  //   if (code.length < 1) {
  //     setAnimate(false);
  //     return null;
  //   }

  //   const body = new FormData();
  //   failuremodal.current?.close();
  //   setShowDetail(false);
  //   setShowToast(false);

  //   body.append("code", code);
  //   const result = await ConfirmReservation(body).unwrap();
  //   console.log(result);
  //   setAnimate(false);
  //   if (!result) return null;

  //   if (result.status == "error") {
  //     setError(result.message);
  //     failuremodal.current?.showModal();
  //     // throw new Error('Kesalahan saat checkin, silahkan coba lagi nanti')
  //   }

  //   if (result.status == "success") {
  //     setMessage(result.message);
  //     setResult(result.data);
  //     setShowToast(true);
  //     setShowDetail(true);
  //   }
  // }

  

  function HandleCloseDetail(){
    setIsCameraActive(true);
    setShowDetail((show) => !show)
  }

  function HandleCloseModal(){
    setIsCameraActive(true);
    failuremodal.current?.close()
  }

  return (
    <div className={clsx("space-y-2.5", className)}>
      <div className="flex gap-x-2">
        <InputText
          className="w-full bg-white"
          placeholder="Masukkan kode tiket"
          value={codereserved}
          onChange={(e) => setCodeReserved(e.target.value)}
        />
        <PrimaryButton
          className="w-1/4"
          onClick={() => Submit(codereserved)}
          isLoading={animate}
          disabled={!(codereserved.length > 1)}
        >
          Cari
        </PrimaryButton>
      </div>
      <Webcam
        ref={webcamref}
        audio={false}
        screenshotFormat="image/png"
        className="w-full border-2 border-solid border-[#ccc]"
      />
      <OprToast
        show={showtoast}
        duration={5000}
        description={message}
        onClose={() => setShowToast((show) => !show)}
      />
      {result && (
        <DetailReservationCard
          show={showdetail}
          reservation={result}
          onClose={() => HandleCloseDetail()}
        />
      )}

      <FailureModal
        title="Kesalahan Checkin"
        errors={error}
        message=""
        ref={failuremodal}
        onConfirm={() => HandleCloseModal()}
      />
    </div>
  );
};

export default ScanQr;
