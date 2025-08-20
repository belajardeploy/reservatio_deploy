import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleCheckBig, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhiteCard from '@/components/card/WhiteCard';
import PrimaryButton from '@/components/button/PrimaryButton';
import { confirmationresponse } from '@/components/json/operator/ConfirmationQRResponse';

// Inline Toast Notification
interface InlineNotificationCardProps {
  show: boolean;
  onClose: () => void;
  message?: string;
  description?: string;
  duration?: number;
}
export const OprToast: React.FC<InlineNotificationCardProps> = ({
  show,
  onClose,
  message = 'Berhasil',
  description = 'QR code terdeteksi! Reservasi berhasil terkonfirmasi.',
  duration = 5000,
}) => {
  useEffect(() => {
    if (!show) return;
    const timeout = setTimeout(onClose, duration);
    return () => clearTimeout(timeout);
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="border-b-green-2 border-b-[4px] bg-white border-2 rounded-xl \
                     border-x-neutral-4 border-t-neutral-4 p-2.5 flex items-center gap-x-3"
        >
          <CircleCheckBig size={18} className="stroke-green-2" />
          <div className="space-y-1 mr-auto">
            <p className="text-sm">{message}</p>
            <p className="text-xs text-neutral-3">{description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} className="stroke-neutral-3" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Detail Card with Close
interface DetailCardProps {
  show: boolean;
  onClose: () => void;
  reservation: confirmationresponse
}
export const DetailReservationCard: React.FC<DetailCardProps> = ({
  show,
  onClose,
  reservation,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <WhiteCard className="space-y-3 relative">
            <div className="border-b-2 border-b-neutral-4 px-2 pb-3">
              <h1 className="font-semibold text-sm text-center">
                Detail Reservasi
              </h1>
            </div>
            <div className="flex p-2">
              <div className="grid grid-cols-[auto_auto_1fr] gap-x-3.5 gap-y-2 text-xs">
                <span>Pemesan</span>
                <span>:</span>
                <span>{reservation.reservation.booker}</span>

                <span>Jumlah Orang</span>
                <span>:</span>
                <span>{reservation.reservation.total_person}</span>

                <span>Nomor Meja</span>
                <span>:</span>
                <span>{reservation.reservation.table_number}</span>

                <span>Waktu</span>
                <span>:</span>
                <span>{reservation.reservation.time}</span>
              </div>
              {/* <Button className="ml-auto h-fit mt-auto w-[70px]">OK</Button> */}
              <PrimaryButton className='h-fit ml-auto mt-auto w-[70px]' onClick={onClose}>Ok</PrimaryButton>
            </div>
          </WhiteCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

