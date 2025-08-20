//// filepath: src/app/admin/_components/ui/CreateAnnouncementForm.tsx
import React, { useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateAnnouncementsAdmMutation } from "@/services/admin/AnnouncementsAdmServices";
import LabelPrimary from "@/components/label/LabelPrimary";
import InputText from "@/components/input/InputText";
import { Textarea } from "@/components/ui/textarea";
import SecondaryButton from "@/components/button/SecondaryButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import { toast } from "sonner";

interface CreateAnnouncementFormProps {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateAnnouncementForm({
  visible,
  onClose,
  onCreated,
}: CreateAnnouncementFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [createAnnouncement] = useCreateAnnouncementsAdmMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Membuat pengumuman…");
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    try {
      const result = await createAnnouncement(form).unwrap();
      toast.dismiss();
      if (result.status === "success") {
        toast.success("Pengumuman berhasil dibuat");
        setTitle("");
        setContent("");
        onCreated();
        onClose();
      } else {
        toast.error("Gagal membuat pengumuman");
      }
    } catch (err) {
      toast.dismiss();
      console.error("Error creating announcement:", err);
      toast.error("gagal membuat pengumuman");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="create"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-gray-50 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <h2 className="text-center font-semibold">BUAT PENGUMUMAN</h2>
            <div className="space-y-1">
              <LabelPrimary>Judul Pengumuman</LabelPrimary>
              <InputText
                name="title"
                value={title}
                className="bg-white w-full"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan Judul Pengumuman"
                required
              />
            </div>
            <div className="space-y-1">
              <LabelPrimary>Isi Pengumuman</LabelPrimary>
              <Textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Masukkan isi pengumuman"
                className="h-[120px] bg-white border border-neutral-4 focus:border-primary-1 focus:ring-primary-1"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <SecondaryButton type="button" onClick={onClose} disabled={loading}>
                Tutup
              </SecondaryButton>
              <PrimaryButton type="submit" isLoading={loading} className="min-w-[101px]">
                Umumkan
              </PrimaryButton>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}