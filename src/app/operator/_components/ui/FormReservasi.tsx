import InputNumb from "@/components/input/InputNumb";
import { CalendarDays } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SelectAccordion, SelectAccordionItem } from "../accordion/AccordionSelect";
import { purposedataindividu, purposedatakelompok } from "@/data/purpose";
import InputText from "@/components/input/InputText";
import PrimaryButton from "@/components/button/PrimaryButton";
import { filtertableoprresponse } from "@/components/json/operator/ReservationOprResponse";
import { useCreateReservasiOprMutation, useGetFilteredTableQuery } from "@/services/operator/DashboardOprService";
import SuccessModal from "@/components/modal/SuccessModal";
import { formattedtoday } from "@/data/today";
import FailureModal from "@/components/modal/FailureModal";
import dayjs from "dayjs";
const FormReservasi = () => {
  const [person, setPerson] = useState<number>(1)
  const [timeslotid, setTimeSlot] = useState<number>(0)
  const [email_mhs, setEmail] = useState<string[]>([''])
  const [purpose, setPurpose] = useState<string>('')
  const successmodal = useRef<HTMLDialogElement>(null)
  const failuremodal = useRef<HTMLDialogElement>(null)
  const [idtable, setIDTable] = useState<number>(0)
  const [filtertable, setFilterTable] = useState<filtertableoprresponse[]>([])
  const [create] = useCreateReservasiOprMutation()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Record<string, string[]>>()
  const { data: filterresponse } = useGetFilteredTableQuery({ total_seats: person, time_slot_id: timeslotid }, { skip: timeslotid < 1 || person < 1 })
  function extraInput(e: number) {
    const render = []
    // console.log(email_mhs)
    for (let index = 0; index < e; index++) {
      render.push(
        <InputText
          value={email_mhs[index]}
          className="px-2 text-sm w-full"
          key={index}
          placeholder="example@mhs.ac.id"
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      )
    }
    return render
  }

  useEffect(() => {
    setIDTable(0)
    setFilterTable([])
  }, [person, timeslotid])

  useEffect(() => {
    if (filterresponse) {
      if (filterresponse.status == 'success') {
        console.log(filterresponse)
        setFilterTable(filterresponse.data)
      } else if (filterresponse.status == 'error') {
        throw new Error("Kesalahan saat mengambil meja, silahkan reload page! untuk mencobanya kembali")
      }
    }
  }, [filterresponse])

  function handleInputChange(index: number, content: string) {
    const loadEmail = [...email_mhs]

    loadEmail[index] = content
    setEmail(loadEmail)
  }

  async function Submit() {
    setIsLoading(true)
    const body = {
      date: formattedtoday,
      purpose: purpose,
      type: email_mhs.length > 1 ? 'Kelompok' : 'Individu',
      email_mhs: email_mhs,
      time_slot_id: timeslotid,
      table_id: idtable
    }
    console.log(idtable)

    const res = await create(body).unwrap()

    if (!res) return null

    console.log(res)
    if (res.status == 'error') {
      setError(res.data.errors)
      failuremodal.current?.showModal()
    }

    if (res.status == 'success') {
      successmodal.current?.showModal()
    }

    setIsLoading(false)
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="text-center border-b-2 border-b-neutral-4 pb-2 space-y-2">
        <h4 className="text-sm font-semibold">Buat Reservasi</h4>
        <div className="flex gap-x-1 justify-center">
          <CalendarDays size={18} className="stroke-neutral-3" />
          <h4 className="text-sm">{dayjs(new Date()).format("dddd, DD MMMM YYYY")}</h4>
        </div>
      </div>

      <div className="border-2 border-neutral-4 rounded-lg p-1.5 space-y-2.5">
        <h3 className="font-semibold text-primary-1 text-sm ml-2">Jumlah Orang</h3>
        <InputNumb number={person} setNumb={setPerson} />
      </div>

      <SelectAccordion value={timeslotid}
        onChange={setTimeSlot} placeholder="Waktu"
        headerClassName="text-primary-1 font-semibold text-sm" contentClassName="text-xs">
        <SelectAccordionItem value="1">08:00 - 10:00 WIB</SelectAccordionItem>
        <SelectAccordionItem value="2">10:00 - 12:00 WIB</SelectAccordionItem>
        <SelectAccordionItem value="3">13:00 - 15:00 WIB</SelectAccordionItem>
        <SelectAccordionItem value="4">15:00 - 17:00 WIB</SelectAccordionItem>
      </SelectAccordion>

      <SelectAccordion value={purpose}
        onChange={setPurpose} placeholder="Keperluan"
        headerClassName="text-primary-1 font-semibold text-sm" contentClassName="text-xs">
        {person > 1 ? 
        purposedatakelompok.map((data, index) => (
          <SelectAccordionItem value={data} key={index}>{data}</SelectAccordionItem>
        ))
        :
        purposedataindividu.map((data, index) => (
          <SelectAccordionItem value={data} key={index}>{data}</SelectAccordionItem>
        ))
        }
      </SelectAccordion>

      <SelectAccordion value={idtable}
        onChange={setIDTable} placeholder="Nomor meja"
        headerClassName="text-primary-1 font-semibold text-sm" contentClassName="text-xs">
        {filtertable.length > 0 ? filtertable.map((data, index) => (
          <SelectAccordionItem value={data.id.toString()} key={index}>{data.table_number}</SelectAccordionItem>
        )) : <SelectAccordionItem value="2" disabled>Tidak ada meja yang kosong</SelectAccordionItem>}
      </SelectAccordion>

      <hr className="stroke-neutral-4 font-bold" />

      {extraInput(person)}
      <PrimaryButton className="w-full mt-auto" onClick={Submit} isLoading={isloading}>Reservasi sekarang</PrimaryButton>

      <SuccessModal
        title="Reservasi berhasil ditambah"
        ref={successmodal}
        message="Reservasi berhasil ditambahkan!"
        onConfirm={() => window.location.reload()}
      />

      <FailureModal
        title="Gagal menambah reservasi"
        ref={failuremodal}
        message=""
        onConfirm={() => failuremodal.current?.close()}
        errors={error ? error : 'Kesalahan saat reservasi, coba lagi nanti'}
      />
    </div>
  )
}

export default FormReservasi;