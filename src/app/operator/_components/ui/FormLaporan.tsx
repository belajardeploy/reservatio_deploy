import { useRef, useState } from "react";
import { SelectAccordion, SelectAccordionItem } from "../accordion/AccordionSelect";
import PrimaryButton from "@/components/button/PrimaryButton";
import { useCreateLaporanOprMutation } from "@/services/operator/DashboardOprService";
import SuccessModal from "@/components/modal/SuccessModal";
import FailureModal from "@/components/modal/FailureModal";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const FormLaporan = () => {
  const [CreateLaporan] = useCreateLaporanOprMutation()
  const failuremodal = useRef<HTMLDialogElement>(null)
  const successmodal = useRef<HTMLDialogElement>(null)
  const [isloading, setIsLoading] = useState<boolean>(false)
  const [category, setCategory] = useState<string>('')
  const [error, setError] = useState<Record<string, string[]>>()
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const body = new FormData(e.currentTarget)
    body.append('category', category)
    const result = await CreateLaporan(body).unwrap()

    if (!result) return null;

    console.log(result)
    if (result.status == 'error') {
      // do something here
      setError(result.data.errors)
      failuremodal.current?.showModal()
    }

    if (result.status == 'success') {
      successmodal.current?.showModal()
    }

    setIsLoading(false)
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="text-center border-b-2 border-b-neutral-4 pb-2 space-y-2">
        <h4 className="text-sm font-semibold">Hubungi Admin</h4>
      </div>

      <form action="" className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-1">
          <Label htmlFor="kategori" className="text-sm font-medium">
            Kategori Pengaduan
          </Label>
          <SelectAccordion value={category}
            onChange={setCategory} placeholder="Pilih Kategori"
            headerClassName=" text-sm" contentClassName="text-xs">
            <SelectAccordionItem value="Sistem">Sistem</SelectAccordionItem>
            <SelectAccordionItem value="Pelayanan">Pelayanan</SelectAccordionItem>
            <SelectAccordionItem value="Fasilitas">Fasilitas</SelectAccordionItem>
            <SelectAccordionItem value="Lainnya (harap jelaskan)">Lainnya (harap jelaskan)</SelectAccordionItem>
          </SelectAccordion>
        </div>
        <div className="space-y-1">
          <Label htmlFor="deskripsi" className="text-sm font-medium">
            Deskripsi
          </Label>
          <Textarea
            id="deskripsi"
            name="description"
            placeholder="Masukkan deskripsi masalah Anda di sini!"
            className="w-full min-h-[120px]"
          />
        </div>

        <PrimaryButton className="w-full" isLoading={isloading}>
          Laporkan Masalah
        </PrimaryButton>
      </form>

      <SuccessModal
        title="Laporan berhasil dikirim"
        ref={successmodal}
        message="Berhasil mengirimkan laporan kepada Admin!"
        onConfirm={() => window.location.reload()}
      />

      <FailureModal
        title="Gagal Mengirim laporan"
        ref={failuremodal}
        message="penyebabnya bisa diantara berikut: "
        onConfirm={() => failuremodal.current?.close()}
        errors={error ? error : 'Kesalahan saat reservasi, coba lagi nanti'}
      />
    </div>
  )
}

export default FormLaporan;