"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAddFeedbackMutation } from "@/services/user/FeedbackUserServices";
import SuccessModal from "@/components/modal/SuccessModal";
import FailureModal from "@/components/modal/FailureModal";
import InputWithLabel from "@/app/(guest)/_components/input/InputWithLabel";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import PrimaryButton from "@/components/button/PrimaryButton";
import { filterOptions } from "@/data/options";
import DropdownUser from "../_components/dropdown/DropdownUser";

export default function HubungiKamiPage() {
  const success = useRef<HTMLDialogElement>(null);
  const failure = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dropdownref = useRef<HTMLDivElement>(null);

  const [isloading, SetIsLoading] = useState<boolean>(false);
  const [feedback] = useAddFeedbackMutation();
  const [error, setError] = useState<any>();
  const [opendropdown, setOpenDropdown] = useState(false);
  const [category, setCategory] = useState("");

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownref.current &&
        !dropdownref.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSuccessModal() {
    success.current?.close();
    formRef.current?.reset();
    setCategory("");
  }

  // Handle dropdown option selection
  function handleCategoryChange(selectedCategory: string) {
    setCategory(selectedCategory);
    setOpenDropdown(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Basic validation
    const formData = new FormData(e.currentTarget);
    const noHp = formData.get("no_hp") as string;
    const description = formData.get("description") as string;

    // More specific validation
    if (!noHp) {
      setError({ message: "No. Handphone wajib diisi" });
      failure.current?.showModal();
      return;
    }

    if (!category) {
      setError({ message: "Kategori Pengaduan wajib diisi" });
      failure.current?.showModal();
      return;
    }

    if (!description) {
      setError({ message: "Deskripsi wajib diisi" });
      failure.current?.showModal();
      return;
    }

    SetIsLoading(true);

    try {
      const body = new FormData(e.currentTarget);
      // The purpose is already included via the hidden input field

      // Debug: Log form data to console
      console.log("Form submission data:");
      console.log("No HP:", body.get("no_hp"));
      console.log("Category:", body.get("category"));
      console.log("Description:", body.get("description"));

      const result = await feedback(body).unwrap();

      console.log(result);

      if (result) {
        if (result.status == "success") {
          success.current?.showModal();
        } else if (result.status == "error") {
          failure.current?.showModal();
          setError(result.data.errors);
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      failure.current?.showModal();
      setError(error);
    } finally {
      SetIsLoading(false);
    }
  }

  return (
    <div className="flex items-start justify-center p-4 md:p-6 lg:p-8">
      <Card className="w-full max-w-[550px] shadow-sm border-2 border-neutral-4 rounded-xl">
        <CardContent className="p-0">
          <div className="px-8 pt-6 mb-4 text-center">
            <h1 className="text-[20px] font-semibold">Formulir Pengaduan</h1>
            <div className="w-full mx-auto mt-2 border-t-2 max-w"></div>
          </div>
          <form
            action=""
            method="POST"
            ref={formRef}
            onSubmit={(e) => onSubmit(e)}
            className="px-8 pb-3 space-y-6"
          >
            <input type="hidden" name="category" value={category} />

            <div className="space-y-6">
              <div className="space-y-2">
                <InputWithLabel
                  label="No. Handphone"
                  placeholder="Masukkan nomor handphone"
                  name="no_hp"
                />
              </div>
              <div className="space-y-2">
                <div className="flex flex-col text-sm gap-y-2">
                  <label htmlFor="category">Kategori Pengaduan</label>

                  <div className="relative w-full" ref={dropdownref}>
                    {/* Toggle Button */}
                    <button
                      type="button"
                      id="category"
                      onClick={() => setOpenDropdown((prev) => !prev)}
                      className="flex items-center w-full p-4 py-3 duration-200 ease-in-out border-2 rounded-lg border-neutral-4 focus:ring-2 focus:border-primary-2/50 focus:outline-none focus:ring-primary-2/50 cursor-pointer"
                    >
                      <p className="mr-auto text-sm text-left">
                        {category || "Pilih Kategori"}
                      </p>
                      <ChevronDown
                        size={24}
                        strokeWidth={1.5}
                        className={clsx(
                          "transition-transform duration-200",
                          opendropdown && "rotate-180"
                        )}
                      />
                    </button>

                    {opendropdown && (
                      <DropdownUser
                        open={opendropdown}
                        options={filterOptions}
                        value={category}
                        onChange={handleCategoryChange}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col text-sm gap-y-2">
                  <label htmlFor="deskripsi">Deskripsi</label>
                  <textarea
                    id="deskripsi"
                    name="description"
                    placeholder="Masukkan deskripsi masalah Anda di sini!"
                    className="w-full min-h-[120px] border-2 border-neutral-4 rounded-lg focus:ring-2 focus:border-primary-2/50 focus:outline-none focus:ring-primary-2/50 duration-200 ease-in-out text-sm p-4 py-3 resize-none"
                    rows={5}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <PrimaryButton
                  type="submit"
                  isLoading={isloading}
                  className="w-[190px]"
                >
                  Laporkan Masalah
                </PrimaryButton>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <SuccessModal
        ref={success}
        title="Laporan Terkirim"
        message="Terima kasih! Laporan Anda sudah kami terima dan akan segera ditindaklanjuti."
        onConfirm={handleSuccessModal}
      />
      <FailureModal
        ref={failure}
        title="Laporan Gagal Terkirim"
        message="Terjadi kesalahan saat mengirim laporan. Silakan coba lagi dalam beberapa saat."
        errors={error}
        onConfirm={() => failure.current?.close()}
      />
    </div>
  );
}
