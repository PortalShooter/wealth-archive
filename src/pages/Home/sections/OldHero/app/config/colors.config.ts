export type Colors = 
  | "white"
  | "black"
  | "darkGreen"
  | "yellow"
  | "darkGrey"
  | "green"
  | "lightGreen"
  | "carouselBg"

type СolorList = {
  [key in Colors]: string;
} 

export const colorList: СolorList = {
  "white": "var(--color-white)",
  "black": "var(--color-black)",
  "darkGreen": "var(--color-green-dark)",
  "yellow": "var(--color-yellow)",
  "darkGrey": "var(--color-dark-grey)",
  "green": "var(--color-green)",
  "lightGreen": "var(--color-light-green)",
  "carouselBg": "var(--color-carousel-bg)",
}