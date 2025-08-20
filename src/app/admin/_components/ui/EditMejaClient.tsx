"use client";

import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import WhiteCard from "@/components/card/WhiteCard";
import DropdownInput from "@/components/input/InputDropdown";
import InputText from "@/components/input/InputText";
import { DetailTableResponse } from "@/components/json/admin/kelolamejaresponse";
import LabelPrimary from "@/components/label/LabelPrimary";
import FileUpload from "@/components/svg/File";
import { jumlah_kursi } from "@/data/admin/total_seat";
import clsx from "clsx";
import {
  useUpdateMejaMutation,
} from "@/services/admin/KelolaMejaAdmServices";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  id: string;
  date?: string;
  timeSlotId?: string;
  detailTable: DetailTableResponse;
}

const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export default function EditMejaClient({
  id,
  date,
  timeSlotId,
  detailTable,
}: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [available, setAvailable] = useState<string>(
    detailTable.is_available ? "Tersedia" : "Tidak Tersedia"
  );
  const [jumlahKursi, setJumlahKursi] = useState<string>(
    detailTable.total_seats.toString() || "1"
  );
  const src = detailTable.thumbnail || null;
  const [selectedMeja] = useState<string>(id);
  const selectedDate = date ? dayjs(date, "YYYY-MM-DD").toDate() : new Date();
  const selectedTime = timeSlotId ? parseInt(timeSlotId, 10) : 1;
  const [animate, setAnimate] = useState(false);
  
  const [updateMeja] = useUpdateMejaMutation();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Hanya .jpg, .jpeg, .png, .webp yang diizinkan.");
      e.target.value = ""; // reset input
      return;
    }
    setSelectedFile(e.target.files?.[0] || null);
  };

  //submit with prevent default on button click
  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setAnimate(true);
    const formData = new FormData();
    if (selectedFile) {
      formData.append("thumbnail", selectedFile);
    }
    formData.append("is_available", available === "Tersedia" ? "1" : "0");
    formData.append("total_seats", jumlahKursi);
    formData.append("id", selectedMeja);
    formData.append("date", dayjs(selectedDate).format("YYYY-MM-DD"));
    formData.append("time_slot_id", selectedTime.toString());

    const result = await updateMeja(formData).unwrap();
    console.log("formData time slot id", formData.get("time_slot_id"));
    console.log("result", result);
    if (result.status === "success") {
      toast.success("Table saved successfully", {
        description: "Meja berhasil disimpan.",
        duration: 3000,
      });
      setSelectedFile(null);
      toast.success("Meja berhasil disimpan", {
        description:
          "Meja telah berhasil diperbarui. Kamu akan redirect ke halaman kelola meja.",
        duration: 3000,
      });
      router.push("/admin/kelola_meja");
    } else {
      toast.error("Error saving table", {
        description: result.message || "Terjadi kesalahan saat menyimpan meja.",
        duration: 3000,
      });
    }
    setAnimate(false);
  }

  return (
    <div className="md:pl-4 md:pt-4 md:pr-2 md:pb-0 p-3.5 flex gap-2 w-[1275px] h-[648px]">
      <WhiteCard className="flex justify-center w-full h-fit">
        <div className="space-y-4 w-[540px] mr-auto">
          <div className="space-y-2 w-full">
            <LabelPrimary>Nomor meja</LabelPrimary>
            <InputText
              disabled
              value={detailTable?.table_number}
              className="w-full text-sm"
            />
          </div>
          <div className="space-y-2 w-full">
            <LabelPrimary>Jumlah Kursi</LabelPrimary>
            <DropdownInput
              options={jumlah_kursi}
              value={jumlahKursi}
              onChange={setJumlahKursi}
              itemClassName="cursor-pointer hover:bg-neutral-4 rounded-md duration-200 ease-in-out p-2 flex items-center text-sm"
              placeholder="Pilih Jumlah Kursi"
            />
          </div>
          <div className="space-y-2 w-full">
            <LabelPrimary>Tipe Meja</LabelPrimary>
            <InputText
              disabled
              value={detailTable?.type}
              className="w-full text-sm"
            />
          </div>
          <div className="space-y-2 w-full">
            <LabelPrimary>Ketersediaan</LabelPrimary>
            <DropdownInput
              options={["Tersedia", "Tidak Tersedia"]}
              value={available}
              onChange={setAvailable}
              itemClassName="cursor-pointer hover:bg-neutral-4 rounded-md duration-200 ease-in-out p-2 flex items-center text-sm"
              placeholder="Pilih Jumlah Kursi"
            />
            {/* <InputText value="Table-01" className="w-full text-sm" /> */}
          </div>
        </div>
        <div className="flex flex-col gap-y-8 w-[540px] ml-auto">
          <div className="border-2 rounded-lg p-6 flex flex-col gap-y-3">
            <h1 className="font-semibold text-[18px]">Media Upload</h1>
            {src !== null && !selectedFile ? (
              <label className="relative flex items-center gap-2">
                {/* overlay untuk klik & drag */}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  ref={fileInputRef}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                {/* thumbnail */}
                <Image
                  width={464}
                  height={264}
                  src={src}
                  alt="Table Thumbnail"
                  className="w-full h-[260px] object-cover"
                />
                {/* tombol Ganti foto */}
                <SecondaryButton
                  className="bg-white absolute bottom-0 right-0"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }}
                >
                  Ganti foto
                </SecondaryButton>
              </label>
            ) : selectedFile ? (
              <div className="rounded-md flex w-full items-center border-2 border-primary-1 p-2 gap-2">
                <p className="bg-primary-1 rounded-sm text-white p-1 px-2 text-xs">
                  {selectedFile.name.split(".").pop()}
                </p>
                <p className="text-sm mr-auto">
                  {selectedFile.name.replace(/\.[^/.]+$/, "")}
                </p>
                <X
                  size={16}
                  onClick={() => setSelectedFile(null)}
                  className="cursor-pointer"
                />
              </div>
            ) : (
              <label
                className={clsx(
                  "relative border-2 border-primary-1 rounded-lg border-dashed w-full flex flex-col gap-y-2 p-6 items-center justify-center",
                  "transition-colors duration-150 ease-in-out",
                  selectedFile ? "bg-primary-50" : "bg-transparent"
                )}
              >
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  ref={fileInputRef}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <FileUpload className="size-11" />
                <p className="text-[12px] font-normal">Drag your file here</p>
                <div className="flex w-[200px] gap-3 items-center justify-center">
                  <hr className="border-neutral-4 w-full" />
                  <p className="text-neutral-4">OR</p>
                  <hr className="border-neutral-4 w-full" />
                </div>
                <SecondaryButton
                  className="w-fit"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }}
                >
                  Browse File
                </SecondaryButton>
              </label>
            )}

            <p className="text-xs text-neutral-3 font-normal">
              Only support .jpg, .jpeg .webp and .png files
            </p>
          </div>

          <PrimaryButton className="ml-auto min-w-[78px]" onClick={handleSubmit} isLoading={animate}>
            Simpan
          </PrimaryButton>
        </div>
      </WhiteCard>
    </div>
  );
}
