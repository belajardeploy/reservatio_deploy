"use client"

import React, { FormEvent, Suspense, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import SuccessModal from "@/components/modal/SuccessModal"
import { useResetPasswordMutation } from "@/services/AuthService"
import { useSearchParams, useRouter } from "next/navigation"
import PrimaryButton from "@/components/button/PrimaryButton"
import FailureModal from "@/components/modal/FailureModal"
import InputText from "@/components/input/InputText"

function ResetPassword() {
  const success = useRef<HTMLDialogElement>(null)
  const failure = useRef<HTMLDialogElement>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [ResetPassword] = useResetPasswordMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const params = useSearchParams();
  const [error, setError] = useState<any>()
  const [errorTitle, setErrorTitle] = useState<any>()
  const [errorMsg, setErrorMsg] = useState<any>()
  const router = useRouter()

  const handleSuccessConfirm = () => {
    success.current?.close();
    router.push('/login');
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const token = params.get('token')
    
    const payload = {
      token: token,
      password: password,
      password_confirmation: confirmPassword,
    }

    setIsSubmitting(true)
    try{
      const result = await ResetPassword(payload).unwrap()
      console.log(result)

      if (result.status == 'success') {
        success.current?.showModal()
        setIsSubmitting(false)
      } else if (result.status == "error") {
        if (result.message == "Token tidak valid. Silakan coba lagi!") {
          setErrorTitle('Token Tidak Valid')
          setErrorMsg('Token tidak valid atau sudah kadaluwarsa, mohon untuk kembali mengisi form lupa kata sandi.')  
        } else if (result.data?.status === "validation_error") {
          setErrorTitle('Gagal Mengubah Kata Sandi')
          setErrorMsg('Terjadi kesalahan saat memperbarui kata sandi. Pastikan kedua kolom sandi sesuai dan memenuhi ketentuan keamanan.')
          setError(result.data.errors)
        } else {
          setErrorTitle('Kesalahan saat reservasi')
          setErrorMsg('Kesalahan saat mengubah kata sandi, silakan coba lagi nanti.');
        }
        
        failure.current?.showModal()
      }
    } catch (err) {
      console.error('Gagal mengubah kata sandi:', err);
      setErrorTitle('Kesalahan saat reservasi')
      setErrorMsg('Kesalahan saat mengubah kata sandi, silakan coba lagi nanti.');
      failure.current?.showModal()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6 shadow-sm">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="w-16 h-16 relative">
            <Image
              src="/Image/logo-bengkod-polosan.webp"
              alt="Logo"
              width={64}
              height={64}
            />
          </div>

          {/* Heading */}
          <h1 className="text-xl font-semibold text-center">Reset Kata Sandi</h1>

          {/* Description */}
          <p className="text-center text-sm text-gray-600">
            Silakan masukkan kata sandi baru Anda. Gunakan kombinasi huruf, angka, dan simbol untuk meningkatkan keamanan akun Anda.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2 relative">
              <label htmlFor="password" className="text-sm font-medium">
                Kata sandi baru
              </label>
              <InputText
                type="password"
                value={password}
                name="password"
                isPassword={true}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Kata sandi baru"
                className="w-full"
              />
            </div>

            <div className="space-y-2 relative">
              <label htmlFor="confirm-password" className="text-sm font-medium">
                Konfirmasi kata sandi baru
              </label>
              <InputText
                type="password"
                name="password_confirmation"
                placeholder="Ulangi kata sandi"
                isPassword={true}
                value={confirmPassword}
                className="w-full"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <PrimaryButton
              className={`w-full h-12 text-white text-base`}
              disabled={!password || !confirmPassword || confirmPassword !== password}
              isLoading={isSubmitting}
            >
              Atur ulang Kata sandi
            </PrimaryButton>

            {/* Back to Login Link */}
            <div className="text-center">
              <Link href="/login" className="text-blue-500 hover:underline text-sm">
                Kembali ke Login
              </Link>
            </div>
          </form>
        </div>
      </Card>
      <SuccessModal
        ref={success}
        title="Kata Sandi Berhasil Diubah"
        message="Kata sandi Anda telah berhasil diperbarui. Silakan gunakan kata sandi baru tersebut untuk masuk ke akun Anda."
        onConfirm={handleSuccessConfirm}
      />
      <FailureModal
        ref={failure}
        title={errorTitle}
        message={errorMsg}
        errors={error}
        onConfirm={()=>failure.current?.close()}
      />
    </div>
  )
}


export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  )
}