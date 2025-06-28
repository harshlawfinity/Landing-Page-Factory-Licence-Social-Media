import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
   icons: {
    icon: "/fav2.png",
  },
  title: "Factory Licence | Apply Online – Lawfinity India",
  description: "Get your Factory Licence hassle-free with Lawfinity India. Expert support for CPCB/SPCB compliance",
};

 



export default function RootLayout({ children }) {
  return (
    <html lang="en">
              <link rel="icon" type="image/png" href="../../public/fav2.png" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
