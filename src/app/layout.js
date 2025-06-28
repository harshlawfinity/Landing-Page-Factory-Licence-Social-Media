import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"], // Only 400 weight included
  variable: "--font-poppins",
});

export const metadata = {
  icons: {
    icon: "/fav2.png",
  },
  title: "Factory Licence | Apply Online – Lawfinity India",
  description:
    "Get your Factory Licence hassle-free with Lawfinity India. Expert support for CPCB/SPCB compliance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
