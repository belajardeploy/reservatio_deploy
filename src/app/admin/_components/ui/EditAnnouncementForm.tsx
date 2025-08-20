import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pengumumanUserresponse } from "@/components/json/global/pengumumanresponse";
import { useUpdateAnnouncementsAdmMutation } from "@/services/admin/AnnouncementsAdmServices";
import LabelPrimary from "@/components/label/LabelPrimary";
import InputText from "@/components/input/InputText";
import { Textarea } from "@/components/ui/textarea";
import SecondaryButton from "@/components/button/SecondaryButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import { toast } from "sonner";

export interface EditAnnouncementFormProps {
  data: pengumumanUserresponse;
  onCancel: () => void;
  onUpdated: () => void;
}

export default function EditAnnouncementForm({
  data,
  onCancel,
  onUpdated,
}: EditAnnouncementFormProps) {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [loading, setLoading] = useState(false);
  const [updateAnnouncement] = useUpdateAnnouncementsAdmMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Mengubah pengumuman…");
    const form = new FormData();
    form.append("id", data.id.toString());
    form.append("title", title);
    form.append("content", content);

    try {
      const res = await updateAnnouncement(form).unwrap();
      toast.dismiss();
      if (res.status === "success") {
        toast.success("Pengumuman berhasil diubah");
        onUpdated();
      } else {
        toast.error("Gagal memperbarui");
      }
    } catch {
      toast.error("Error jaringan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence initial={false}>
      <motion.form
        key={`edit-${data.id}`}
        onSubmit={handleSubmit}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-50 rounded space-y-4 p-6"
      >
        <h2 className="text-center font-semibold">Edit Pengumuman</h2>
        <div className="space-y-1">
          <LabelPrimary>Judul Pengumuman</LabelPrimary>
          <InputText
            value={title}
            className="w-full bg-white"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <LabelPrimary>Isi Pengumuman</LabelPrimary>
          <Textarea
            className="h-[120px] bg-white border-2 border-neutral-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <SecondaryButton onClick={onCancel} disabled={loading}>
            Tutup
          </SecondaryButton>
          <PrimaryButton type="submit" isLoading={loading} className="min-w-[101px]">
            Ubah
          </PrimaryButton>
        </div>
      </motion.form>
    </AnimatePresence>
  );
}