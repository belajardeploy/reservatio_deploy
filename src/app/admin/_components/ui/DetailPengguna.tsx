"use client";

import DangerAltButton from "@/components/button/DangerAltButton";
import DangerButton from "@/components/button/DangerButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import WhiteCard from "@/components/card/WhiteCard";
import { kelolauserresponse } from "@/components/json/admin/KelolaUserResponse";
import { riwayatresponse } from "@/components/json/global/riwayatresponse";
import PaginationControls from "@/components/ui/PaginationControls";
import { PerPageSelect } from "@/components/ui/PerPage";
import RiwayatTableHeader from "@/components/ui/RiwayatTableHeader";
import RiwayatTableRow from "@/components/ui/RiwayatTableRow";
import {
  useGetDetailUserAdmQuery,
  useUpdateKelolaUserAdmMutation,
} from "@/services/admin/KelolaUserAdmServices";
import { Textarea } from "@headlessui/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import TableResevationSkeleton from "@/app/admin/_components/ui/skeleton/TableReservationSkeleton";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface DetailPenggunaProps {
  user: kelolauserresponse;
}

const DetailPengguna = ({ user }: DetailPenggunaProps) => {
  const [paginate, setPaginate] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [limitpage, setLimitPage] = useState<number>(1);
  const [animate, setAnimate] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string[]>>();
  const router = useRouter();

  const [userresvations, setUserReservations] = useState<
    riwayatresponse[] | null
  >(null);
  const { data: userresp, isFetching } = useGetDetailUserAdmQuery({
    id: user.id,
    page: page,
    paginate: paginate,
  });

  useEffect(() => {
    if (!userresp) return;
    console.log(userresp);
    if (userresp.status === "error") {
      console.error(userresp.message);
      return;
    }

    if (userresp.status === "success") {
      setUserReservations(userresp.data.reservations);
      setLimitPage(userresp.data?.pagination?.last_page || 1);
    }
  }, [userresp]);

  const [UpdateBan] = useUpdateKelolaUserAdmMutation();

  const blockmodal = useRef<HTMLDialogElement>(null);
  function NextPage() {
    if (page < limitpage) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function PreviousPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function ShowBlockModal() {
    if (blockmodal.current) {
      blockmodal.current.showModal();
    }
    setError({});
  }
  async function SubmitBlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    setAnimate(true);
    const formData = new FormData(e.currentTarget);
    // const is_ban = !selecteduser?.is_banned // Toggle ban status
    formData.append("id", user.id.toString());
    formData.append("is_ban", user?.is_banned ? "0" : "1");
    toast.loading("Memperbarui data pengguna...");
    const result = await UpdateBan(formData).unwrap();
    if (!result) return;
    toast.dismiss();
    console.log(result);

    if (result.status === "error") {
      setError(result.errors);
      toast.error(result.message);
      console.error(result);
    }
    if (result.status === "success") {
      toast.success(result.message);
      // refetch();
      router.push("/admin/kelola_pengguna");
      // window.location.href('/'); // Refresh the page to reflect changes
      blockmodal.current?.close();
    }

    setAnimate(false);
    setError({});
    setPage(1);
  }
  return (
    <div className="md:pl-4 md:pt-4 md:pr-2 md:pb-0 p-3.5 flex gap-2 h-fit">
      <WhiteCard className="w-full space-y-8 px-6 py-6">
        <div className="flex items-center gap-8">
          <Image
            className="rounded-full w-18 h-18"
            width={73}
            height={73}
            src={user?.photo || "/images/default-profile.png"}
            alt="Profile Picture"
            unoptimized
          />
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">{user?.name}</h1>
            <p className="px-2 py-1 rounded-md bg-primary-3/10 text-primary-1 text-xs font-normal w-fit">
              {user?.nim}
            </p>
          </div>

          <DangerAltButton
            className={clsx(
              "px-4 py-2 text-sm ml-auto",
              user?.is_banned ? "w-[120px]" : "w-[74px]"
            )}
            onClick={() => ShowBlockModal()}
          >
            {user?.is_banned ? "Buka Blokir" : "Blokir"}
          </DangerAltButton>
        </div>

        <div className="space-y-2 w-full">
          <h3 className="text-xs font-medium">Riwayat</h3>

          {isFetching ? (
            <TableResevationSkeleton />
          ) : userresvations && userresvations.length > 0 ? (
            <div className="lg:grid lg:grid-cols-7 text-left rounded-xl p-6 w-full">
              <RiwayatTableHeader />
              {userresvations.map((item, idx) => (
                <React.Fragment key={idx}>
                  <RiwayatTableRow item={item} />
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="col-span-7 py-10 text-center text-sm text-primary-1">
              Pengguna ini belum memiliki riwayat.
            </div>
          )}
        </div>

        <div className="flex items-center mt-auto px-6">
          <PerPageSelect value={paginate} onChange={setPaginate} />
          <PaginationControls
            className="ml-auto"
            page={page}
            limitPage={limitpage}
            onNext={NextPage}
            onPrevious={PreviousPage}
          />
        </div>
      </WhiteCard>

      <dialog className="modal" ref={blockmodal}>
        <div className="modal-box bg-white rounded-xl max-w-[420px] text-center">
          <div className="border-b-2 border-b-neutral-4 pb-2">
            <h1 className="font-semibold text-lg text-black text-center w-10/12 flex justify-center mx-auto ">
              {user?.is_banned
                ? "Yakin ingin membuka Blokir ini?"
                : "Yakin ingin memblokir pengguna ini?"}
            </h1>
          </div>

          <form
            action=""
            className="pt-5 flex flex-col gap-y-5 w-full"
            onSubmit={(e) => SubmitBlock(e)}
          >
            <label htmlFor="reason" className="text-sm">
              {user
                ? "Tindakan ini akan mengizinkan pengguna untuk kembali mengakses fitur seperti biasa."
                : "Mohon isi alasan pemblokiran agar pengguna memahami penyebabnya."}
            </label>
            {/* <h3 className="text-sm"></h3> */}
            {!user.is_banned && (
              <div className="">
                <Textarea
                  placeholder="Masukkan alasan pembatalan"
                  name="ban_reason"
                  className={
                    "w-full h-[120px] bg-white border border-neutral-4 rounded-md p-2 text-xs"
                  }
                />
                {error
                  ? error.reason && (
                      <p className="text-xs text-red-2 text-left mt-1">
                        {error.reason[0]}
                      </p>
                    )
                  : ""}
              </div>
            )}

            <div className="flex gap-x-2 ml-auto">
              <SecondaryButton
                onClick={() => blockmodal.current?.close()}
                disabled={animate}
              >
                Tutup
              </SecondaryButton>
              <DangerButton
                type="submit"
                isLoading={animate}
                className={clsx(user?.is_banned ? "w-[120px]" : "w-[60px]")}
              >
                {user?.is_banned ? "Buka Blokir" : "Blokir"}
              </DangerButton>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DetailPengguna;
