"use client"

import type React from "react"

import { FormEvent, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import ReCAPTCHA from "react-google-recaptcha"
import SuccessModal from "@/components/modal/SuccessModal"
import { useSendPasswordResetConfirmationMutation } from "@/services/AuthService"
import PrimaryButton from "@/components/button/PrimaryButton"
import FailureModal from "@/components/modal/FailureModal"

export default function FORGETPASSWORD() {
  const success = useRef<HTMLDialogElement>(null)
  const failure = useRef<HTMLDialogElement>(null)
  const [email, setEmail] = useState("")
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ResetPassword] = useSendPasswordResetConfirmationMutation()
  const [error, setError] = useState<any>()
  const [errorTitle, setErrorTitle] = useState<any>()
  const [errorMsg, setErrorMsg] = useState<any>()

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    e.preventDefault()

    try{
      const body = new FormData(e.currentTarget)
      const result = await ResetPassword(body).unwrap()

      if (result) {
        console.log(result)
        if (result.status == 'success') {
          success.current?.showModal()
          setIsSubmitting(false)
        } else if (result.status === 'error') {
          if(result.data.status === 'validation_error'){
            setErrorTitle("Email Gagal Terkirim")
            setErrorMsg("Pastikan email yang Anda masukkan sudah sesuai.")
            setError(result.data.errors)
          }else if (result.data === "Email tidak terdaftar. Silakan coba lagi!"){
            setErrorTitle("Email Tidak Terdaftar")
            setErrorMsg("Pastikan email yang Anda masukkan sudah terdaftar di sistem kami.")
            setError(result.data)
          }else{
            setErrorTitle("Kesalahan saat mengirim email")
            setErrorMsg("Terjadi kesalahan saat mengirim email, silakan coba lagi nanti.")
            setError(result.data)
          }
          failure.current?.showModal()
        }
      }
    } catch (error) {
      // Fallback untuk error tak terduga (misal: server error)
      console.log(error)
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
          <h1 className="text-xl font-semibold text-center">Lupa Kata Sandi?</h1>

          {/* Description */}
          <p className="text-center text-sm text-gray-600">
            Silakan masukkan alamat email kampus Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email_mhs"
                placeholder="example@mhs.dinus.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11"
              />
            </div>

            {/* reCAPTCHA */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-[304px]">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lf0s_4qAAAAANqfpktiyUS8BrDlqqiN_QRTGC2K"}
                  onChange={handleCaptchaChange}
                />
              </div>
            </div>

            <PrimaryButton
              disabled={isSubmitting || !captchaVerified}
              isLoading={isSubmitting}
              className="w-full"
            >
              Kirim email
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
        title="Email Terkirim"
        message="Tautan pengaturan ulang kata sandi telah dikirim ke email Anda. Silakan periksa kotak masuk atau folder spam Anda."
        onConfirm={() => success.current?.close()}
      />
      <FailureModal
        ref={failure}
        title={errorTitle}
        message={errorMsg}
        errors={error}
        onConfirm={() => failure.current?.close()}
      />
    </div>
  )
}
