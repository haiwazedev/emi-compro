export type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
};

export const clientLogos: ClientLogo[] = [
  {
    name: "Accenture",
    src: "/clients/logoklien_accenture.png",
    width: 1966,
    height: 518,
  },
  {
    name: "Astra Otoparts",
    src: "/clients/logoklien_astraoto.png",
    width: 1956,
    height: 430,
  },
  {
    name: "Pama",
    src: "/clients/logoklien_pama.png",
    width: 780,
    height: 1000,
    className: "max-h-16",
  },
  {
    name: "PLN Indonesia Power",
    src: "/clients/logoklien_plnip.png",
    width: 1966,
    height: 406,
  },
  {
    name: "The Ritz-Carlton",
    src: "/clients/logoklien_ritz-carlton.png",
    width: 2000,
    height: 1400,
    className: "max-h-16",
  },
  {
    name: "United Tractors",
    src: "/clients/logoklien_unitedtrac.png",
    width: 1876,
    height: 347,
  },
  {
    name: "Westin Hotels & Resorts",
    src: "/clients/logoklien_westin.png",
    width: 2000,
    height: 634,
  },
];

export const topRowClientLogos = clientLogos;
export const bottomRowClientLogos = [
  clientLogos[3],
  clientLogos[6],
  clientLogos[1],
  clientLogos[4],
  clientLogos[0],
  clientLogos[5],
  clientLogos[2],
];
