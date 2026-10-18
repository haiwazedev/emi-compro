export type HomeSlide = {
  id: number;
  image: string | null;
  imageAlt: string;
  mainTitle: string;
  subtitle: string;
  description: string;
};

export type HomeStatistic = {
  description: string;
  id: number;
  label: string;
  number: string;
};
