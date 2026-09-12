import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";

export const delightSemibold = localFont({
  src: "../../public/fonts/Delight-SemiBold.ttf",
  variable: "--font-delight-semibold",
  display: "swap",
  weight: "600",
});

export const delightLight = localFont({
  src: "../../public/fonts/Delight-Light.ttf",
  variable: "--font-delight-light",
  display: "swap",
  weight: "300",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
