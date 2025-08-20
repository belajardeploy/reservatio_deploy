import ErrorLayout from "@/components/ui/ErrorLayout";

export default function NotFoundPage() {
  return (
    <ErrorLayout
      imageSrc="/Image/404.svg"
      imageAlt="404 Page Not Found"
      title="Halaman tidak ditemukan"
      description="Maaf, kami tidak dapat menemukan halaman yang Anda cari"
    />
  );
}
