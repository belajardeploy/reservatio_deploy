"use client";
import SecondaryButton from "@/components/button/SecondaryButton";
import WhiteCard from "@/components/card/WhiteCard";
import { Plus } from "lucide-react";
import InputSearch from "@/app/admin/_components/input/SearchInput";
import React, { useEffect, useRef, useState } from "react";
import { pengumumanUserresponse } from "@/components/json/global/pengumumanresponse";
import {
  useDeleteAnnouncementsAdmMutation,
  useGetAnnouncementsAdmQuery,
} from "@/services/admin/AnnouncementsAdmServices";
import { PerPageSelect } from "@/components/ui/PerPage";
import PaginationControls from "@/components/ui/PaginationControls";
import AnnouncementItemAdm from "@/app/admin/_components/ui/AnnounceItemAdm";
import useDebounce from "@/lib/Debounced";
import DangerButton from "@/components/button/DangerButton";
import { toast } from "sonner";
import CreateAnnouncementForm from "@/app/admin/_components/ui/CreateAnnouncementForm";
import EditAnnouncementForm from "@/app/admin/_components/ui/EditAnnouncementForm";
import AnnouncementItemAdmSkeleton from "@/app/admin/_components/ui/skeleton/AnnounceItemAdmSkeleton";

const PENGUMUMANPAGE = () => {
  const [search, setSearch] = useState("");
  const [paginate, setPaginate] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [limitpage, setLimitPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 1000);
  const [announces, setAnnouncements] = useState<
    pengumumanUserresponse[] | null
  >(null);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<pengumumanUserresponse | null>(null);
  const [iseditmode, setIsEditMode] = useState<boolean>(false);
  const [iscreatemode, setIsCreateMode] = useState<boolean>(false);
  const deletemodal = useRef<HTMLDialogElement>(null);

  const [DeleteAnnouncement] = useDeleteAnnouncementsAdmMutation();
  const [animate, setAnimate] = useState<boolean>(false);
  const {
    data: announceresp,
    isLoading,
    isFetching,
    refetch,
  } = useGetAnnouncementsAdmQuery({
    search: debouncedSearch,
    paginate: paginate,
    page: page,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!announceresp) return;

    console.log(announceresp);
    if (announceresp.status == "error") {
      setAnnouncements([]);
      setLimitPage(1);
      return;
    }

    if (announceresp.status == "success") {
      setAnnouncements(announceresp.data.announcements);
      setLimitPage(announceresp.data?.pagination?.last_page || 1);
    }
  }, [announceresp]);

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

  function showModal(e: pengumumanUserresponse) {
    if (!deletemodal.current) return;
    deletemodal.current?.showModal();
    setSelectedAnnouncement(e);
  }

  function ShowEdit(e: pengumumanUserresponse) {
    if (iscreatemode) {
      setIsCreateMode(false);
    }
    // if already editing this same item → close edit mode
    if (iseditmode && selectedAnnouncement?.id === e.id) {
      setIsEditMode(false);
      setSelectedAnnouncement(null);
    } else {
      // if not editing this item, close create mode
      // otherwise open edit mode for this item
      setSelectedAnnouncement(e);
      setIsEditMode(true);
    }
  }

  async function SubmitDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedAnnouncement) return;
    setAnimate(true);
    const formData = new FormData();
    formData.append("id", selectedAnnouncement.id.toString());
    toast.loading("Menghapus pengumuman...");
    const result = await DeleteAnnouncement(formData).unwrap();
    if (!result) return;
    toast.dismiss();
    if (result.status === "success") {
      refetch();
      deletemodal.current?.close();
      toast.success("Pengumuman berhasil dihapus.");
      setSelectedAnnouncement(null);
      setAnimate(false);
    } else {
      toast.error("Gagal menghapus pengumuman.");
      console.error("Failed to delete announcement:", result.message);
      setAnimate(false);
    }
  }
  return (
    <div className="md:pl-4 md:pt-4 md:pr-2 md:pb-0 p-3.5 flex gap-2 h-fit">
      <WhiteCard className="p-6 flex flex-col gap-y-4 w-full h-fit">
        <div className="flex items-center w-full">
          <h1 className="font-semibold text-base uppercase">Pengumuman</h1>
          <div className="ml-auto flex gap-4 items-center">
            <InputSearch
              className=""
              placeholder="Cari Pengumuman"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SecondaryButton
              onClick={() => {
                setIsCreateMode((prev) => !prev);
                setIsEditMode(false);
                setSelectedAnnouncement(null);
              }}
              className="ml-auto min-w-fit flex gap-x-1.5 lg:text-base text-sm font-medium items-center px-3.5 group"
            >
              <Plus
                size={18}
                className="stroke-primary-1 group-hover:stroke-white ease-in duration-200 lg:block hidden"
              />
              Buat Pengumuman
            </SecondaryButton>
          </div>
        </div>

        <CreateAnnouncementForm
          visible={iscreatemode}
          onClose={() => setIsCreateMode(false)}
          onCreated={() => refetch()}
        />

        {/* Announcement List */}

        {isFetching || isLoading ? (
          <div className="flex flex-col gap-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <AnnouncementItemAdmSkeleton key={index} />
            ))}
          </div>
        ) : announces && announces.length > 0 ? (
          <div className="flex flex-col gap-y-4">
            {announces.map((item) => (
              <>
                {iseditmode && selectedAnnouncement?.id == item.id ? (
                  <EditAnnouncementForm
                    key={item.id}
                    data={item}
                    onCancel={() => {
                      ShowEdit(item);
                    }}
                    onUpdated={() => {
                      setIsEditMode(false);
                      setSelectedAnnouncement(null);
                      refetch();
                    }}
                  />
                ) : (
                  <AnnouncementItemAdm
                    key={item.id}
                    data={item}
                    onEdit={ShowEdit}
                    onDelete={showModal}
                  />
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48">
            <p className="text-neutral-3">
              Tidak ada pengumuman yang ditemukan.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
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

      <dialog className="modal" ref={deletemodal}>
        <div className="modal-box bg-white rounded-xl max-w-[420px] text-center">
          <div className="border-b-2 border-b-neutral-4 pb-2">
            <h1 className="font-semibold text-black text-center w-10/12 flex justify-center mx-auto ">
              Yakin ingin menghapus pengumuman ini?
            </h1>
          </div>

          <form
            action=""
            className="pt-5 flex flex-col gap-y-5 w-full"
            onSubmit={(e) => SubmitDelete(e)}
          >
            <p className="text-xs">
              Setelah dihapus, pengumuman ini tidak bisa dikembalikan. Pengguna
              tidak akan lagi melihat informasi ini.
            </p>
            <div className="flex gap-x-2 ml-auto">
              <SecondaryButton
                onClick={() => deletemodal.current?.close()}
                disabled={animate}
              >
                Batal
              </SecondaryButton>
              <DangerButton type="submit" isLoading={animate} className="w-[68px]">
                Hapus
              </DangerButton>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default PENGUMUMANPAGE;
