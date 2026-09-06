import { useState } from "react";
import VaccinationSection from "./VaccinationSection";
import DewormingSection from "./DewormingSection";
import WeightSection from "./WeightSection";
import OtherSection from "./OtherSection";

// 🧩 Typdefinition för props till accordion
type AccordionProps = {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

// 🎯 Enskild knapp med tillhörande innehåll
const AccordionItem = ({
  title,
  isOpen,
  onClick,
  children,
}: AccordionProps) => {
  return (
    <div className="border rounded-lg overflow-hidden transition-all duration-300 w-full shadow">
      <button
        onClick={onClick}
        className="w-full text-center py-3 font-semibold bg-black text-white hover:bg-gray-800"
      >
        {title}
      </button>
      {isOpen && <div className="p-4 bg-white text-black">{children}</div>}
    </div>
  );
};

// 🔧 Huvudkomponent för hälsosidan
const HealthSection = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (sectionName: string) => {
    setOpenSection(prev => (prev === sectionName ? null : sectionName));
  };

  return (
    <div className="p-4 w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-center w-full">
        Djurets hälsodata
      </h2>

      {/* 🔲 GRID med 2 kolumner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
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
    </div>
  );
};

export default HealthSection;
