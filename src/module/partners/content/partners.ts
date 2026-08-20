export type Partner = {
  name: string;
  isEmphasized?: boolean;
};

export const partners: Partner[] = [
  { name: "H&M" },
  { name: "LG Innotek" },
  { name: "NeutraDC" },
  { name: "UNIQLO" },
  { name: "United Tractors" },
  { name: "Westin Hotels" },
  { name: "PLN Indonesia Power" },
  { name: "and many more...", isEmphasized: true },
];
