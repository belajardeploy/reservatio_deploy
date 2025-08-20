import ErrorLayout from "@/components/ui/ErrorLayout";

export default function MaintenancePage() {
  return (
    <ErrorLayout
      imageSrc="/Image/maintenance.svg"
      imageAlt="Maintenance Page"
      title="Situs Sedang dalam Perawatan"
      description="Maaf atas ketidaknyamanannya! Saat ini, kami sedang melakukan perawatan untuk meningkatkan layanan."
    />
  );
}
