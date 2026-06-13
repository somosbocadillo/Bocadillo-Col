import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const folkies = localFont({
  src: "../public/fonts/Folkies Vantage Sans.ttf",
  variable: "--font-folkies",
  display: "swap",
});

const oldport = localFont({
  src: "../public/fonts/Oldport Script.ttf",
  variable: "--font-oldport",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bocadillo - Hamburguesas y Choriperros Premium en Palmira",
  description: "Pensaste en dulce. Terminaste antojado de hamburguesas y choriperros. Domicilios al 311 689 5379. Visítanos en Cra 22 # 47 - 46, Altamira, Palmira.",
  keywords: ["Bocadillo", "Hamburguesas Palmira", "Choriperros Palmira", "Comida Premium", "Restaurante Palmira", "Domicilios Palmira"],
  authors: [{ name: "Bocadillo" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${folkies.variable} ${oldport.variable}`}>
      <body>{children}</body>
    </html>
  );
}
