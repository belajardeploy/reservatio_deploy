import WhiteCard from "@/components/card/WhiteCard";
import { AccordionFaq } from "@/app/user/_components/accordion/AccordionFAQ";
import { ContentFaq } from "@/components/content/ContentFaq";

const FAQPAGE = () => {
  return (
    <div className="md:px-4 md:pt-4 md:pb-0 p-3.5 pb-[15%] flex gap-x-4 w-full justify-center lg:justify-start">
      <WhiteCard>
        <AccordionFaq items={ContentFaq} />
      </WhiteCard>
    </div>
  );
};

export default FAQPAGE;
