import { useState } from "react";
import VaccinationSection from "./VaccinationSection";
import DewormingSection from "./DewormingSection";
import WeightSection from "./WeightSection";
import OtherSection from "./OtherSection";

const HealthSection = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (sectionName: string) => {
    setOpenSection(prev => (prev === sectionName ? null : sectionName));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Djurets hälsodata</h2>

      <AccordionItem
        title="Vaccinationer"
        isOpen={openSection === "vaccination"}
        onClick={() => toggleSection("vaccination")}
      >
        <VaccinationSection />
      </AccordionItem>

      <AccordionItem
        title="Avmaskning"
        isOpen={openSection === "deworming"}
        onClick={() => toggleSection("deworming")}
      >
        <DewormingSection />
      </AccordionItem>

      <AccordionItem
        title="Vikt"
        isOpen={openSection === "weight"}
        onClick={() => toggleSection("weight")}
      >
        <WeightSection />
      </AccordionItem>

      <AccordionItem
        title="Övrigt"
        isOpen={openSection === "other"}
        onClick={() => toggleSection("other")}
      >
        <OtherSection />
      </AccordionItem>
    </div>
  );
};

export default HealthSection;

// 👇 Inbyggd liten Accordion-komponent
type AccordionProps = {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const AccordionItem = ({
  title,
  isOpen,
  onClick,
  children,
}: AccordionProps) => {
  return (
    <div className="border rounded-lg">
      <button
        className="w-full text-left p-3 font-medium bg-gray-100 hover:bg-gray-200"
        onClick={onClick}
      >
        {title}
      </button>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};
