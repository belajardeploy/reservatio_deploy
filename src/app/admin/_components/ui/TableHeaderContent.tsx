import clsx from "clsx";

interface TableHeaderContentProps {
  className?: string;
}

const TableHeaderContent: React.FC = ({className} : TableHeaderContentProps) => (
  <div className={clsx("px-4 border-b-2 py-2 pt-1 border-b-neutral-4 m-0 sticky top-0 bg-white z-10", className)}>
    <div className="grid grid-cols-7 text-xs font-semibold">
      <div className="col-span-1">Tanggal</div>
      <div className="col-span-1">Pemesan</div>
      <div className="col-span-1">Nomor Meja</div>
      <div className="col-span-1">Waktu</div>
      <div className="col-span-1">Keperluan</div>
      <div className="col-span-1">Jumlah Orang</div>
      <div className="col-span-1">Status</div>
    </div>
  </div>
);

export { TableHeaderContent }; // Export jika ingin digunakan di ActualTable juga
