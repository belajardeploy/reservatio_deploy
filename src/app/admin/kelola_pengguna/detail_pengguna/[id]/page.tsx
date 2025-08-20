import DetailPengguna from "@/app/admin/_components/ui/DetailPengguna";
import { kelolauserresponse } from "@/components/json/admin/KelolaUserResponse";
import { RequestHttp } from "@/services/BE/Request";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{ id: string }>;
}

// Force dynamic so we always fetch fresh data
export const dynamic = "force-dynamic";

const DETAILPENGGUNAPAGE = async ({ params: paramsPromise }: PageProps) => {
  const { id } = await paramsPromise;
  const res = await RequestHttp({
    type: "get",
    url: `admin/users/${id}/reservations`,
  });
  if(res.status == 'error'){
    // Handle error response
   notFound();
  }

  // API returns single user in `result.data.user`
  const user: kelolauserresponse = res.data.users[0];

  return <DetailPengguna user={user} />;
};

export default DETAILPENGGUNAPAGE;