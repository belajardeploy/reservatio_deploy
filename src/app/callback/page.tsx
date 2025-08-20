"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { signIn } from "next-auth/react";
import FailureModal from "@/components/modal/FailureModal";
import dayjs from "dayjs";
interface data {
  [key: string]: any
}

const CallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const failure = useRef<HTMLDialogElement>(null)


  useEffect(() => {
    const user: data = {};
    const otherParams: data = {};

    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('data[')) {
        const match = key.match(/^data\[(.+)\]$/);
        if (match && match[1]) {
          user[match[1]] = value;
        }
      } else {
        otherParams[key] = value;
      }
    }
    const Callback = async () => {
      await signIn("credentials", {
        id: user.id,
        email_mhs: user.email_mhs,
        nim: user.nim,
        name: user.name,
        token: user.token,
        photo: user.photo,
        role: user.role,
        penalty_count: user.penalty_count,
        is_reserve: user.is_reserve,
        redirect: false,
        created_at: user.created_at,
        duration: dayjs(new Date()).add(30, 'minute').toString(),
      });

      if (otherParams.success == "1") {
        if (user.role == "admin") {
          router.push("/admin/dashboard");
        } else if (user.role == "user") {
          router.push("/user/dashboard");
        }
        else if (user.role == "operator") {
          router.push("/operator/dashboard");
        }
      } else if (otherParams.success == "0") {
        failure.current?.showModal()
      }
    }

    Callback()
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting...</p>
      <FailureModal
        ref={failure}
        title="Error domain email"
        message="Kesalahan saat melakukan login menggunakan Google"
        onConfirm={() => router.push('/login')}
      />
    </div>
  );
};

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackPage />
    </Suspense>
  );
}