"use client";

import InputWithLabel from "../../_components/input/InputWithLabel";
import PrimaryButton from "@/components/button/PrimaryButton";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { useLoginMutation } from "@/services/AuthService";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import WhiteCard from "@/components/card/WhiteCard";
import FailureModal from "@/components/modal/FailureModal";
import { AuthResponse } from "@/components/json/auth/authresponse";
import dayjs from "dayjs";
import LogoAlt from "@/components/logo/LogoAlt";

const url = process.env.NEXT_PUBLIC_API_OAUTH_URL;

const LOGINPAGE = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [Login] = useLoginMutation();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isdisable, setIsDisable] = useState<boolean>(true);
  const ref = useRef<HTMLDialogElement>(null);

  function OnChange() {
    setIsDisable(false);
  }

  async function OnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    // console.log(userdata)
    const res = await Login(formData).unwrap();
    if (res.status == "error") {
      console.log(res);
      ref.current?.showModal();
      setIsLoading(false);
    } else if (res.status == "success") {
      const user: AuthResponse = res.data;
      console.log(res.data);
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
        created_at: user.created_at,
        redirect: false,
        duration: dayjs(new Date()).add(30, "minute").toString(),
      });
      // localStorage.setItem("duration", dayjs(user.created_at).add(30, 'minute').toString());
      setIsLoading(false);
      if (user.role == "admin") {
        router.push("/admin/dashboard");
      } else if (user.role == "user") {
        // router.push("/user/dashboard");
        window.location.replace("/user/dashboard");
      } else if (user.role == "operator") {
        router.push("/operator/dashboard");
      }
    }
    console.log(res);
  }

  return (
    <WhiteCard className="md:px-10 px-6 md:w-[500px] w-[343px] ">
      <LogoAlt />

      <form className="my-6 flex flex-col gap-y-3" onSubmit={OnSubmit}>
        <InputWithLabel
          label="Email mahasiswa"
          placeholder="Masukkan email mahasiswa"
          name="email_mhs"
        />

        <InputWithLabel
          label="Password"
          placeholder="**********"
          name="password"
          isPassword={true}
        />
        <Link
          href={"/forget_password"}
          className="ml-auto text-sm text-primary-3 hover:underline"
        >
          Lupa kata sandi?
        </Link>

        <ReCAPTCHA
          className="mx-auto"
          sitekey="6Lf0s_4qAAAAANqfpktiyUS8BrDlqqiN_QRTGC2K"
          onChange={OnChange}
        />

        <PrimaryButton
          className="w-full h-full mt-3 "
          isLoading={isloading}
          disabled={isdisable}
        >
          Masuk
        </PrimaryButton>

        <Link
          href={`${url}`}
          // href={"http://127.0.0.1:8000/api/v1/auth/login/google/redirect"}
        >
          {/* <div className="p-1.5 w-full border-neutral-3 border-2 rounded-lg flex items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
              <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
            </svg>
            <p className="pl-2">
              Google
            </p>
          </div> */}
          <div className="p-1.5 w-full border-2 border-neutral-3/50 rounded-lg flex items-center justify-center cursor-pointer">
            {/* <svg width="64px" height="64px" viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </g></svg> */}
            <svg
              width="16px"
              height="16px"
              viewBox="-0.5 0 48 48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <defs> </defs>
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <p className="pl-2">Google</p>
          </div>
        </Link>
      </form>

      <FailureModal
        title="Kesalahan login"
        message="Tidak ada akun yang terdaftar yang sesuai"
        ref={ref}
        onConfirm={() => ref?.current?.close()}
      />
    </WhiteCard>
  );
};

export default LOGINPAGE;
