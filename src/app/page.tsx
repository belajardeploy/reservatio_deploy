import HeaderGuest from "@/app/(guest)/_components/layout/HeaderGuest";
import SectionFirst from "./(guest)/_components/ui/SectionFirst";
import SectionSec from "./(guest)/_components/ui/SectionSec";
import SectionThird from "./(guest)/_components/ui/SectionThird";
import SectionFourth from "./(guest)/_components/ui/SectionFourth";
import Footer from "@/components/ui/footer";
import { SectionFifth } from "./(guest)/_components/ui/SectionSixth";

export default async function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <HeaderGuest className="" />
      {/* Seamless section flow */}
      <div className="relative">
        <SectionFirst className="" />
        {/* Smooth transition divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/30 to-transparent" />
        <SectionSec />
        {/* Smooth transition divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/40 to-transparent" />
        <SectionThird />
        {/* Smooth transition divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/50 to-transparent" />
        <SectionFourth />
        {/* Smooth transition divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/60 to-transparent" />
        <SectionFifth />
      </div>
      <Footer />
    </main>
  );
}
