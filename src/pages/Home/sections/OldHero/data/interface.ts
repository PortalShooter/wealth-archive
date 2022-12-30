export interface ImageData {
  id: string;
  url: string;
  alt: string | null;
  height: number;
  width: number;
  src: string;
}

export interface HeroSectionData {
  [index: string]: any;
}
export interface PlanningSectionData {
  [index: string]: any;
}
export interface EmpowerSectionData {
  [index: string]: any;
}
export interface AtWorkSectionData {
  [index: string]: any;
}
export interface QuestionCarouselSectionData {
  [index: string]: any;
}
export interface TrustSectionData {
  [index: string]: any;
}
export interface AccordionSectionData {
  [index: string]: any;
}
export interface LearnSectionData {
  [index: string]: any;
}
export interface WaitlistSectionData {
  [index: string]: any;
}
export interface ModalData {
  [index: string]: any;
}

export interface PageData {
  [index: string]: any;
}
export interface PageProps {
  page: PageData | null;
  type: string;
}
