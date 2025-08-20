"use client";
import PrimaryButton from "@/components/button/PrimaryButton";
import WhiteCard from "@/components/card/WhiteCard";
import { pengumumanUserresponse } from "@/components/json/global/pengumumanresponse";
import { useGetLatestAnnouncementQuery } from "@/services/user/AnnouncementUserServices";
import { Funnel, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FilterButton from "@/components/button/FilterButton";
import clsx from "clsx"
import PaginationControls from "@/components/ui/PaginationControls";
import { PerPageSelect } from "@/components/ui/PerPage";
import SecondaryButton from "@/components/button/SecondaryButton";
import AnnouncementItem from "@/app/user/_components/ui/Announceitem";

const PENGUMUMANPAGE = () => {
  const [keyfilter, setKeyFilter] = useState<string>("");
  const [paginate, setPaginate] = useState<number>(10);
  const { data: allannounce } = useGetLatestAnnouncementQuery({
    type: keyfilter,
    paginate: paginate,
  });
  // const { data: filterdata, refetch } = useGetAnnounceFilterQuery({ type: keyfilter })
  const [pengumuman, setPengumuman] = useState<pengumumanUserresponse[]>([]);
  const [animate, SetAnimate] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const dropdownref = useRef<HTMLDivElement>(null);
  const [limitpage, setLimitPage] = useState<number>(1);

  useEffect(() => {
    SetAnimate(true);
    if (allannounce) {
      if (allannounce.status == "success") {
        console.log("berhasil all data: ", allannounce);
        setLimitPage(allannounce.pagination?.last_page || 1);
        setPengumuman(allannounce.data.announcements);
        SetAnimate(false);
      } else if (allannounce.status == "error") {
        console.error("Gagal fetch data!", allannounce);
        SetAnimate(false);
      }
    }
  }, [allannounce]);

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

  function callFilter(e: string) {
    dropdownref.current?.blur();
    SetAnimate(true);
    setKeyFilter(e);
  }
  return (
    <section className="md:px-4 md:pt-4 md:pb-0 p-3.5 w-full">
      <WhiteCard className={clsx("flex flex-col gap-y-6 lg:p-7 p-3")}>
        <div className="flex items-center">
          <h1 className="font-semibold lg:text-xl text-sm mr-auto">
            Pengumuman
          </h1>
          {keyfilter.length > 1 && (
            <SecondaryButton
              onClick={() => setKeyFilter("")}
              className="flex gap-x-2 lg:text-base text-sm items-center font-medium"
            >
              {keyfilter}
              <X size={16} />
            </SecondaryButton>
          )}
          {keyfilter.length < 1 && (
            <div className="dropdown dropdown-end ml-auto">
              <div tabIndex={0}>
                <PrimaryButton className="ml-auto flex gap-x-1.5 lg:text-base text-sm font-medium items-center px-3.5">
                  <Funnel size={18} className="stroke-white lg:block hidden" />
                  <Funnel size={12} className="stroke-white lg:hidden" />
                  {/* {keyfilter ? keyfilter : 'Filter'} */}
                  Filter
                </PrimaryButton>
              </div>

              <div
                tabIndex={0}
                ref={dropdownref}
                className="dropdown-content mt-2 bg-white rounded-sm z-1 p-2 w-[150px] shadow-md border-neutral-4 border-[1px]"
              >
                <div className="space-y-1 flex flex-col items-start">
                  <FilterButton
                    paragraphClick={() => callFilter("Pemberitahuan")}
                  >
                    Pemberitahuan
                  </FilterButton>
                  <FilterButton paragraphClick={() => callFilter("Informasi")}>
                    Informasi
                  </FilterButton>
                  <FilterButton paragraphClick={() => callFilter("Pengingat")}>
                    Pengingat
                  </FilterButton>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 max-w-full">
          {animate ? (
            <div className="w-full h-[310px] flex justify-center items-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : pengumuman.length > 0 ? (
            pengumuman.map((data, index) => (
              <AnnouncementItem key={index} data={data} />
            ))
          ) : (
            <p className="italic text-primary-1 flex justify-center items-center h-full lg:text-sm text-xs">
              Tidak ada pengumuman disini!
            </p>
          )}
          {/* <p className="italic text-primary-1 flex justify-center items-center h-full lg:text-sm text-xs">Tidak ada pengumuman disini!</p> */}
        </div>

        <div className="flex items-center mt-auto">
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
    </section>
  );
};

export default PENGUMUMANPAGE;
