
// import { Poppins } from "next/font/google";
// import "./globals.css";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400"], // Only 400 weight included
//   variable: "--font-poppins",
// });

// export const metadata = {
//   icons: {
//     icon: "/fav2.png",
//   },
//   title: "Factory Licence | Apply Online – Lawfinity India",
//   description:
//     "Get your Factory Licence hassle-free with Lawfinity India. Expert support for CPCB/SPCB compliance",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${poppins.variable} font-sans antialiased`}>
//         {children}
//       </body>
//     </html>
//   );
// }


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import Script from "next/script";
import TrackingScript from "@/components/TrackingScript";


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
      <head>
        <link rel="icon" type="image/png" href="/fav2.png" />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TR58JL6Q');
          `}
        </Script>

        {/* Meta Pixel Script */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '777415601527541');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WB9C1YGDMG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WB9C1YGDMG');
          `}
        </Script>
      </head>
      <body>
         <TrackingScript />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TR58JL6Q"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Google tag (gtag.js) for Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17199345901"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17199345901');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=777415601527541&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
