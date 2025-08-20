"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SuccessModal from "@/components/modal/SuccessModal";
import WhiteCard from "@/components/card/WhiteCard";
import InputText from "@/components/input/InputText";
import {
  useGetProfileQuery,
  useUpdatePasswordMutation,
} from "@/services/user/ProfileUserServices";
import PrimaryButton from "@/components/button/PrimaryButton";
import FailureModal from "@/components/modal/FailureModal";
import SecondaryButton from "@/components/button/SecondaryButton";
import { Eye, EyeOff } from "lucide-react";
import type { profileresponse } from "@/components/json/global/profileresponse";
import ProfileCardSkeleton from "@/components/skeleton/ProfileCard";
import clsx from "clsx"

export default function ProfilePage() {
  const success = useRef<HTMLDialogElement>(null);
  const formmmodal = useRef<HTMLDialogElement>(null);
  const [UpdatePassword] = useUpdatePasswordMutation();
  const [error, setError] = useState<any>();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const failure = useRef<HTMLDialogElement>(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data, isLoading } = useGetProfileQuery({});
  const [session, setSession] = useState<profileresponse | null>(null);

  const handleOpenModal = () => {
    formmmodal.current?.showModal();
  };

  useEffect(() => {
    if (!data) return;
    console.log(data);
    try {
      const { status, data: sessionresponse } = data;
      console.log("asodfinsdaoiufgnb", sessionresponse);
      if (status === "success") {
        setSession(sessionresponse);
      }
    } catch (error) {
      console.error("Error processing session data:", error);
    }
  }, [data]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();

    const body = new FormData(e.currentTarget);

    try {
      const res = await UpdatePassword(body).unwrap();

      if (res) {
        console.log(res);
        if (res.status == "success") {
          formmmodal.current?.close();
          success.current?.showModal();
        } else if (res.status == "error") {
          setError(res.data);
          formmmodal.current?.close();
          failure.current?.showModal();
        }
      }
    } catch (error: any) {
      console.error("Update password error:", error);

      if (error?.data?.status === "validation_error") {
        setError({
          message: error.data.message || "Validation Error",
          errors: error.data.data?.errors || {},
        });
      } else if (error?.data?.message) {
        setError({
          message: error.data.message,
          errors: error.data.data || {},
        });
      } else {
        setError({
          message: "Terjadi kesalahan saat mengubah kata sandi",
          errors: {},
        });
      }

      formmmodal.current?.close();
      failure.current?.showModal();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="md:px-4 md:pt-4 md:pb-0 p-3.5 w-full">
      <WhiteCard
        className={clsx(
          "flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-6 p-4 sm:p-5 lg:p-7"
        )}
      >
        {/* Profile Card */}
        {isLoading ? (
          <ProfileCardSkeleton showNIM={true} />
        ) : (
          <div className="flex flex-col sm:flex-row sm:gap-x-4 lg:flex-row lg:gap-x-6 gap-y-4">
            {/* Main Profile Content */}
            <div className="flex flex-row gap-x-3 sm:gap-x-4 lg:gap-x-6 flex-1">
              {/* Profile Image */}
              <div className="rounded-md w-[120px] sm:w-[140px] lg:w-[184px] flex-shrink-0">
                <Image
                  src={session?.user.photo || "/Image/default.jpg"}
                  alt="Profile"
                  width={200}
                  height={240}
                  className="object-cover rounded-[8px] w-full h-full aspect-[4/5]"
                  priority
                  unoptimized
                />
              </div>

              {/* Profile Info */}
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 flex-1 min-w-0 flex flex-col justify-center">
                <div className="space-y-1">
                  <h2 className="text-[10px] sm:text-[12px] lg:text-sm text-primary-1 uppercase font-medium">
                    STATUS
                  </h2>
                  <p className="text-xs sm:text-sm lg:text-base font-medium uppercase">
                    {session?.user.status}
                  </p>
                </div>

                <div className="space-y-1">
                  <h2 className="text-[10px] sm:text-[12px] lg:text-sm text-primary-1 uppercase font-medium">
                    NAMA LENGKAP
                  </h2>
                  <p className="text-xs sm:text-sm lg:text-base font-medium break-words">
                    {session?.user.name}
                  </p>
                </div>

                {session?.user.status == "Mahasiswa" && (
                  <div className="space-y-1">
                    <h2 className="text-[10px] sm:text-[12px] lg:text-sm text-primary-1 uppercase font-medium">
                      NOMOR INDUK MAHASISWA
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-base font-medium break-words">
                      {session.user.nim}
                    </p>
                  </div>
                )}

                <div className="space-y-1">
                  <h2 className="text-[10px] sm:text-[12px] lg:text-sm text-primary-1 uppercase font-medium">
                    EMAIL
                  </h2>
                  <p className="text-xs sm:text-sm lg:text-base font-medium break-words">
                    {session?.user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Change Password Button - Desktop */}
            <div className="hidden lg:flex lg:items-start lg:justify-end">
              <PrimaryButton
                onClick={handleOpenModal}
                className="bg-blue-900 hover:bg-blue-800 px-6 py-2 whitespace-nowrap"
              >
                Ubah Kata Sandi
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* Change Password Button - Mobile & Tablet */}
        <div className="block lg:hidden mt-2">
          <PrimaryButton
            onClick={handleOpenModal}
            className="w-full bg-blue-900 hover:bg-blue-800 py-3 text-sm font-medium"
          >
            Ubah kata sandi
          </PrimaryButton>
        </div>

        {/* Modal dialogs */}
        <dialog className="modal" ref={formmmodal}>
          <div className="modal-box max-w-[450px] bg-white rounded-xl p-10 space-y-2">
            <h2 className="text-lg font-semibold border-b-2 border-neutral-4 pb-2 text-center">
              Ubah Kata Sandi
            </h2>
            <div className="space-y-4">
              <p className="text-[14px] text-center">
                Pastikan kata sandi yang dibuat mudah untuk diingat dan sulit
                ditebak
              </p>
              <form className="space-y-3 w-full" onSubmit={onSubmit}>
                <div className="space-y-3 relative">
                  <label
                    htmlFor="password_old"
                    className="block text-primary-1 text-[12px] mb-1"
                  >
                    KATA SANDI
                  </label>
                  <InputText
                    name="old_password"
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi lama"
                    className="w-full pr-10 text-sm border-primary-1 focus:border-primary-1"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-8 text-primary-1 cursor-pointer"
                  >
                    {showOldPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>

                <div className="space-y-3 relative">
                  <label
                    htmlFor="password_new"
                    className="block text-primary-1 text-[12px] mb-1"
                  >
                    KATA SANDI BARU
                  </label>
                  <InputText
                    name="new_password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi baru"
                    className="w-full pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-8 text-neutral-500 cursor-pointer"
                  >
                    {showNewPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>

                <div className="space-y-3 relative">
                  <label
                    htmlFor="password_confirm"
                    className="block text-primary-1 text-[12px] mb-1"
                  >
                    KONFIRMASI KATA SANDI BARU
                  </label>
                  <InputText
                    name="new_password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulang kata sandi baru"
                    className="w-full pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-8 text-neutral-500 cursor-pointer"
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>

                <div className="flex gap-x-[14px] mt-6 justify-end">
                  <SecondaryButton
                    type="button"
                    onClick={() => formmmodal.current?.close()}
                    className="px-4"
                  >
                    Kembali
                  </SecondaryButton>
                  <PrimaryButton
                    type="submit"
                    className="px-4 w-[130px]"
                    isLoading={isloading}
                  >
                    Ubah Sandi
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </dialog>

        <SuccessModal
          ref={success}
          title="Kata Sandi Berhasil Diubah"
          message="Kata sandi akun telah diperbarui. Silakan gunakan kata sandi baru saat login berikutnya."
          onConfirm={() => success.current?.close()}
        />
        <FailureModal
          title="Kata Sandi Gagal Diubah"
          message={
            error?.message ||
            "Terjadi kesalahan saat mengubah kata sandi. Silakan coba lagi atau periksa kembali data yang dimasukkan."
          }
          errors={error?.errors}
          ref={failure}
          onConfirm={() => failure.current?.close()}
        />
      </WhiteCard>
    </div>
  );
}
