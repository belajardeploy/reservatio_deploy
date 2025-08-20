"use client";
import FilterButton from "@/components/button/FilterButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import { laporanresponse } from "@/components/json/admin/LaporanResponse";
import PaginationControls from "@/components/ui/PaginationControls";
import { PerPageSelect } from "@/components/ui/PerPage";
import {
  useDeleteLaporanAdmMutation,
  useGetLaporanAdmQuery,
  useGetLaporanCSVMutation,
  useUpdateLaporanAdmMutation,
} from "@/services/admin/LaporanAdmServices";
import { Download, Funnel, Minus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LaporanItem from "@/app/admin/_components/ui/ContentLaporanItem";
import LaporanItemSkeleton from "@/app/admin/_components/ui/skeleton/LaporanItemSkeleton";
import { filterOptions } from "@/data/options";
import { toast } from "sonner";
import SectionNav from "@/components/ui/SectionNav";
import Link from "next/link";
import CheckBoxSelect from "@/app/admin/_components/button/CheckboxSelect";

const sections = [
  { label: "Semua", value: "" },
  { label: "Pengguna", value: "pengguna" },
  { label: "Operator", value: "operator" },
];

const LAPORANPAGE = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [paginate, setPaginate] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [limitpage, setLimitPage] = useState<number>(1);
  const detailmodal = useRef<HTMLDialogElement>(null);
  const dropdownref = useRef<HTMLDivElement>(null);
  const [selectedLaporan, setSelectedLaporan] =
    useState<laporanresponse | null>(null);
  const [category, setCategory] = useState<string>("");
  const [laporan, setLaporan] = useState<laporanresponse[]>([]);
  const [DeleteLaporan] = useDeleteLaporanAdmMutation();
  const [UpdateLaporan] = useUpdateLaporanAdmMutation();
  const [role, setRole] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);

  const [DownloadCSV] = useGetLaporanCSVMutation();

  const {
    data: laporanresponse,
    isFetching,
    refetch,
  } = useGetLaporanAdmQuery({
    page: page,
    paginate: paginate,
    category: category,
    role: role,
  });

  useEffect(() => {
    if (!laporanresponse) return;
    console.log(laporanresponse);
    if (laporanresponse.status === "success") {
      setLaporan(laporanresponse.data.complaints);
      setLimitPage(laporanresponse.data?.pagination?.last_page || 1);
    } else if (laporanresponse.status === "error") {
      console.error("Error fetching laporan:", laporanresponse.message);
      setLaporan([]);
    }
  }, [laporanresponse]);

  const callFilter = (e: string) => {
    dropdownref.current?.blur();
    setCategory(e);
  };

  async function showModal(e: laporanresponse) {
    setSelectedLaporan(e);
    detailmodal.current?.showModal();
    handleUpdateLaporan(e);
  }

  async function handleUpdateLaporan(e?: laporanresponse) {
    // console.log("Handling update for:", e);
    if (e && e.is_read === false) {
      toast.loading("Memperbarui laporan...");
      const result = await UpdateLaporan({
        id: e.id,
      }).unwrap();
      // console.log("Update result:", result);
      toast.dismiss();
      if (result.status === "success") {
        refetch();
        toast.success("Laporan berhasil diperbarui");
      } else {
        toast.error("Gagal memperbarui laporan");
        console.error("Failed to update laporan:", result.error);
      }
    }
  }

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

  async function handleDeleteLaporan() {
    if (selectedIds.length > 0) {
      toast.loading("Menghapus laporan...");
      const result = await DeleteLaporan({
        id: selectedIds,
      }).unwrap();
      toast.dismiss();
      // console.log("Delete result:", result);
      if (result.status === "success") {
        setSelectedIds([]);
        setLaporan([]);
        refetch();
        toast.success("Laporan berhasil dihapus");
      } else {
        toast.error("Gagal menghapus laporan");

        console.error("Failed to delete laporan:", result.error);
      }
    }
  }

  const handleSelectAll = () => {
    if (selectedIds.length === laporan?.length) {
      setSelectedIds([]);
    } else if (laporan) {
      setSelectedIds(laporan.map((item) => item.id.toString()));
    }
  };

  const handleSelectId = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  async function CallDownloadCSV() {
    setAnimate(true);
    toast.loading("Menyiapkan file CSV...");

    try {
      const result = await DownloadCSV({}).unwrap();
      const blob = result as Blob;

      // Buat URL untuk blob
      const url = window.URL.createObjectURL(blob);

      // Buat element link untuk download
      const link = document.createElement("a");
      link.href = url;

      // Buat nama file dengan timestamp
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `laporan-pengguna-${
        category ? category.toLowerCase() + "-" : ""
      }${role ? role.toLowerCase() + "-" : ""}${timestamp}.csv`;

      link.download = filename;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.dismiss();
      toast.success("File CSV berhasil diunduh");
    } catch (error) {
      console.error("Error downloading CSV:", error);
      toast.dismiss();
      toast.error("Gagal mengunduh file CSV");
    } finally {
      setAnimate(false);
    }
  }

  return (
    <div className="md:pl-4 md:pt-4 md:pr-2 md:pb-0 p-3.5 flex gap-2 h-fit">
      <div className="bg-white rounded-xl p-6 px-0 border-2 border-neutral-4 flex flex-col gap-y-4 h-full w-full overflow-y-auto">
        <div className="flex items-center w-full px-6">
          <h1 className="font-semibold text-base uppercase">
            Laporan Pengguna
          </h1>
          <div className="ml-auto flex gap-2 items-center">
            {selectedIds.length > 0 && (
              <button className="cursor-pointer" onClick={handleDeleteLaporan}>
                <Trash2 size={16} className="stroke-neutral-3" />
              </button>
            )}
            <CheckBoxSelect
              active={
                selectedIds.length === laporan?.length && laporan?.length > 0
              }
              onClick={handleSelectAll}
              icon={<Minus size={16} className="stroke-white" />}
            />
            {category.length > 1 && (
              <SecondaryButton
                onClick={() => setCategory("")}
                className="flex gap-x-2 lg:text-base text-sm items-center font-medium"
              >
                {category}
                <X size={16} />
              </SecondaryButton>
            )}
            {category.length < 1 && (
              <div className="dropdown dropdown-end ml-auto">
                <div tabIndex={0}>
                  <PrimaryButton className="ml-auto flex gap-x-1.5 lg:text-base text-sm font-medium items-center px-3.5">
                    <Funnel
                      size={18}
                      className="stroke-white lg:block hidden"
                    />
                    <Funnel size={12} className="stroke-white lg:hidden" />
                    Filter
                  </PrimaryButton>
                </div>

                <div
                  tabIndex={0}
                  ref={dropdownref}
                  className="dropdown-content mt-2 bg-white rounded-sm z-1 p-2 w-[250px] shadow-md border-neutral-4 border-[1px]"
                >
                  <div className="space-y-1 flex flex-col items-start">
                    {filterOptions.map((option) => (
                      <FilterButton
                        key={option}
                        paragraphClick={() => callFilter(option)}
                      >
                        {option}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <Link
              href={
                "https://reservation-api.wibowomulyoo.my.id/api/v1/admin/complaints/export"
              }
            ></Link>
            <SecondaryButton
              onClick={CallDownloadCSV}
              isLoading={animate}
              className="ml-auto flex gap-x-1.5 lg:text-base text-sm font-medium items-center px-3.5 group"
            >
              <Download
                size={18}
                className="stroke-primary-1 group-hover:stroke-white ease-in duration-200 lg:block hidden"
              />
              Unduh CSV
            </SecondaryButton>
          </div>
        </div>

        <SectionNav
          items={sections}
          current={role}
          onChange={setRole}
          className="px-6"
        />

        {/* CONTENT SECTION */}
        <div className="flex flex-col">
          {isFetching
            ? Array.from({ length: paginate }).map((_, idx) => (
                <LaporanItemSkeleton key={idx} />
              ))
            : laporan && (
                <LaporanItem
                  laporan={laporan}
                  onSelect={(e) => handleSelectId(e)}
                  onClick={(e) => {
                    showModal(e);
                  }}
                  selectedId={selectedIds}
                />
              )}
        </div>

        {/* PAGINATION SECTION */}
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
      </div>

      <dialog className="modal" ref={detailmodal}>
        <div className="modal-box bg-white rounded-xl max-w-[648px] overflow-y-visible flex flex-col">
          <div className="p-3 max-h-[660px]">
            <div className="border-b-2 border-b-neutral-4 pb-2">
              <h1 className="font-bold text-lg text-black text-center ">
                Laporan Pengguna
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <div className="space-y-0.5">
                <h1 className="text-primary-1 text-base font-semibold">
                  {selectedLaporan?.username}
                </h1>
                <p className="text-neutral-3 text-[11px]">
                  {"<"}
                  {selectedLaporan?.email}
                  {">"}
                </p>
                <p className="text-neutral-3 text-[11px]">
                  {selectedLaporan?.no_hp}
                </p>
              </div>
              <h1 className="font-semibold text-black text-base">
                Masalah Reservasi
              </h1>
              <p className="text-xs font-normal">
                {selectedLaporan?.description}
              </p>

              <p className="text-neutral-3 text-[11px]">
                {selectedLaporan?.created_at}
              </p>
            </div>
            <div className="flex gap-x-2.5 mt-4 justify-center">
              <PrimaryButton onClick={() => detailmodal.current?.close()}>
                Ok
              </PrimaryButton>
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default LAPORANPAGE;
