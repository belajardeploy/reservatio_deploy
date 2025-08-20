"use client";
import WhiteCard from "@/components/card/WhiteCard";
import InputSearch from "@/app/admin/_components/input/SearchInput";
import { useEffect, useRef, useState } from "react";
import DropdownAdm from "@/app/admin/_components/dropdown/DropdownAdm";
import { major } from "@/data/admin/major";
import SectionNav from "@/components/ui/SectionNav";
import SecondaryButton from "@/components/button/SecondaryButton";
import { PerPageSelect } from "@/components/ui/PerPage";
import PaginationControls from "@/components/ui/PaginationControls";
import { Textarea } from "@headlessui/react";
import DangerButton from "@/components/button/DangerButton";
import { kelolauserresponse } from "@/components/json/admin/KelolaUserResponse";
import {
  useGetKelolaUserAdmQuery,
  useUpdateKelolaUserAdmMutation,
} from "@/services/admin/KelolaUserAdmServices";
import UserItem from "@/app/admin/_components/ui/ContentUserItem";
import useDebounce from "@/lib/Debounced";
import UserItemSkeleton from "@/app/admin/_components/ui/skeleton/UserItemSkeleton";
import { toast } from "sonner";
import { GraduationCap } from "lucide-react";
import clsx from "clsx";

const sections = [
  { label: "Semua", value: "" },
  { label: "Aktif", value: "Active" },
  { label: "Terblokir", value: "Blocked" },
];

const KELOLAPENGGUNAPAGE = () => {
  const [search, setSearch] = useState("");
  // const deb
  const debouncedSearch = useDebounce(search, 1000);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [paginate, setPaginate] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [limitpage, setLimitPage] = useState<number>(1);
  const [selectedmajor, setSelectedMajor] = useState<string>("");
  const [error, setError] = useState<Record<string, string[]>>();
  const [animate, setAnimate] = useState<boolean>(false);
  const [selecteduser, setSelectedUser] = useState<kelolauserresponse | null>(
    null
  );
  const [userdata, setUserData] = useState<kelolauserresponse[] | null>(null);
  const blockmodal = useRef<HTMLDialogElement>(null);

  const [UpdateBan] = useUpdateKelolaUserAdmMutation();
  const {
    data: kelolauserresp,
    isFetching,
    isLoading,
    refetch,
  } = useGetKelolaUserAdmQuery({
    search: debouncedSearch,
    major: selectedmajor,
    status: selectedOption,
    paginate: paginate,
    page: page,
  });

  useEffect(() => {
    if (!kelolauserresp) return;
    console.log(kelolauserresp);
    if (kelolauserresp.status == "error") {
      setError(kelolauserresp.errors);
      console.error(kelolauserresp.message);
    }

    if (kelolauserresp.status == "success") {
      setUserData(kelolauserresp.data.users);
      setLimitPage(kelolauserresp.data?.pagination?.last_page || 1);
    }
  }, [kelolauserresp]);

  useEffect(() => {
    setPage(1);
    setPaginate(10);
  }, [search, selectedOption, selectedmajor]);

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

  function ShowBlockModal(e: kelolauserresponse) {
    if (blockmodal.current) {
      blockmodal.current.showModal();
    }
    setSelectedUser(e);
    setError({});
  }

  function SetSelectedMajor(e: string) {
    if (e == selectedmajor) {
      setSelectedMajor("");
    } else {
      setSelectedMajor(e);
    }
  }

  async function SubmitBlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selecteduser) return;
    setAnimate(true);
    const formData = new FormData(e.currentTarget);
    formData.append("id", selecteduser.id.toString());
    formData.append("is_ban", selecteduser?.is_banned ? "0" : "1");
    toast.loading("Memperbarui data pengguna...");
    const result = await UpdateBan(formData).unwrap();
    if (!result) return;
    toast.dismiss();
    console.log(result);

    if (result.status === "error") {
      setError(result.errors);
      toast.error(result.message);
      console.error(result.message);
    }
    if (result.status === "success") {
      toast.success(result.message);
      setSelectedUser(null);
      setSearch("");
      setSelectedMajor("");
      setSelectedOption("");
      refetch();
      blockmodal.current?.close();
    }

    setAnimate(false);
    setError({});
    setPage(1);
  }
  return (
    <div className="md:pl-4 md:pt-4 md:pr-2 md:pb-0 p-3.5 flex gap-2 h-fit">
      <WhiteCard className="p-6 flex flex-col gap-y-4 w-full h-fit">
        <div className="flex items-center w-full">
          <h1 className="font-semibold text-base uppercase">Pengguna</h1>
          <div className="ml-auto flex gap-4 items-center justify-center">
            <InputSearch
              className=""
              placeholder="Cari Pengumuman"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <DropdownAdm
              options={major}
              value={selectedmajor}
              onChange={(value) => SetSelectedMajor(value)}
              placeholder="Jurusan"
              icon={<GraduationCap size={14} />}
            />
          </div>
        </div>

        <SectionNav
          items={sections}
          current={selectedOption}
          onChange={setSelectedOption}
        />

        {isFetching || isLoading
          ? Array.from({ length: paginate }).map((_, idx) => (
              <UserItemSkeleton key={idx} />
            ))
          : userdata && (
              <UserItem
                users={userdata}
                onBlock={(user) => ShowBlockModal(user)}
              />
            )}

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
              {selecteduser?.is_banned
                ? "Yakin ingin memBuka Blokir ini?"
                : "Yakin ingin memblokir pengguna ini?"}
            </h1>
          </div>

          <form
            action=""
            className="pt-5 flex flex-col gap-y-5 w-full"
            onSubmit={(e) => SubmitBlock(e)}
          >
            <label htmlFor="reason" className="text-sm">
              {selecteduser?.is_banned
                ? "Tindakan ini akan mengizinkan pengguna untuk kembali mengakses fitur seperti biasa."
                : "Mohon isi alasan pemblokiran agar pengguna memahami penyebabnya."}
            </label>

            {selecteduser?.is_banned ? (
              ""
            ) : (
              <div className="">
                <Textarea
                  placeholder="Masukkan alasan pembatalan"
                  name="ban_reason"
                  className={
                    "w-full h-[120px] bg-white border border-neutral-4 rounded-md p-2 text-xs focus:ring-2 focus:border-primary-2/50 focus:outline-none focus:ring-primary-2/50 duration-200 ease-in-out"
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
                className={clsx(
                  selecteduser?.is_banned ? "w-[120px]" : "w-[60px]"
                )}
              >
                {selecteduser?.is_banned ? "Buka Blokir" : "Blokir"}
              </DangerButton>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default KELOLAPENGGUNAPAGE;
