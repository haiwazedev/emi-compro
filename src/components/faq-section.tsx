import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

const faqs: FaqItem[] = [
  {
    id: "rec-spe",
    question: "Apa itu REC dan SPE?",
    answer: [
      "REC adalah instrumen berupa sertifikat yang membuktikan bahwa setiap 1 MWh listrik yang dikonsumsi oleh operasional perusahaan Anda berasal dari pembangkit energi terbarukan, seperti tenaga surya, air, atau angin, yang tersertifikasi.",
      "Sedangkan SPE adalah instrumen berupa sertifikat yang membuktikan bahwa perusahaan Anda telah mendanai atau mengompensasi proyek penurunan emisi karbon secara nyata di tempat lain, seperti proyek efisiensi energi atau konservasi hutan.",
    ],
  },
  {
    id: "ghg-accounting",
    question: "Apa hubungannya REC dan SPE ini dengan GHG Accounting?",
    answer: [
      "REC dapat mendukung pelaporan emisi Scope 2 karena berkaitan dengan penggunaan listrik dari sumber energi terbarukan.",
      "SPE dapat membantu strategi kompensasi emisi yang belum dapat dihindari, terutama saat perusahaan menyusun inventaris dan rencana pengurangan emisi berdasarkan prinsip GHG Accounting.",
    ],
  },
  {
    id: "price-calculation",
    question:
      "Berapa harga 1 unit REC dan 1 unit SPE? Dan bagaimana cara perhitungannya?",
    answer: [
      "Harga REC dan SPE dapat berbeda tergantung volume kebutuhan, jenis instrumen, periode penggunaan, serta ketersediaan sertifikat atau proyek yang relevan.",
      "Perhitungannya dimulai dari konsumsi energi, baseline emisi, target pengurangan emisi, dan kebutuhan pelaporan perusahaan.",
    ],
  },
  {
    id: "purchase-process",
    question: "Bagaimana proses pembelian REC atau SPE melalui PLN EMI?",
    answer: [
      "Tim PLN EMI akan membantu mengidentifikasi kebutuhan perusahaan, memvalidasi data konsumsi atau emisi, menghitung kebutuhan instrumen, lalu menyiapkan rekomendasi dan dokumentasi pendukung.",
    ],
  },
  {
    id: "reporting-use",
    question:
      "Apakah REC dan SPE dapat digunakan untuk laporan ESG atau sustainability report?",
    answer: [
      "Ya, REC dan SPE dapat menjadi bagian dari bukti pendukung dalam laporan keberlanjutan, laporan ESG, atau komunikasi dekarbonisasi, selama penggunaannya sesuai dengan batasan pelaporan dan metodologi yang digunakan perusahaan.",
    ],
  },
];

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="scroll-mt-20 bg-faq-background px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      id="faq"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <div className="max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-faq-accent">
            FAQ
          </p>

          <h2
            className="mt-5 font-display text-4xl leading-none text-faq-foreground"
            id="faq-heading"
          >
            <span className="block">Frequently Asked</span>
            <span className="block italic text-faq-accent">Questions</span>
          </h2>

          <p className="mt-6 font-sans text-sm italic text-faq-accent">
            Hover and scroll to see more questions
          </p>
        </div>

        <div
          aria-label="FAQ questions"
          className="faq-scrollbar mt-12 max-h-[50vh] w-full max-w-3xl overflow-y-scroll border-3 border-faq-panel-border bg-faq-background p-4 outline-none focus-visible:ring-3 focus-visible:ring-faq-accent/35 sm:mt-16 sm:p-6"
          role="region"
          tabIndex={0}
        >
          <Accordion className="space-y-4" collapsible type="single">
            {faqs.map((item) => (
              <AccordionItem
                className="rounded-lg border border-faq-card-border bg-faq-card pl-5 pr-3 shadow-none"
                key={item.id}
                value={item.id}
              >
                <AccordionTrigger className="min-h-8 items-center font-sans text-sm font-bold leading-snug text-faq-foreground no-underline hover:no-underline [&_svg]:size-5 [&_svg]:text-faq-accent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-6 font-sans text-sm leading-6 text-faq-muted">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
