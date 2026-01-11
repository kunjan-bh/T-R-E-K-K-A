import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./../styles/page.css";
import "./../styles/Navbar1.css";
import "./../styles/sideNav.css";
import "./../styles/login.css";
import "./../styles/dashboard.css";
import "./../styles/profileBtn.css";
import "./../styles/notify.css";
import "./../styles/TravelKit.css";
import "./../styles/community.css";
import "./../styles/aboutus.css";
import "./../styles/Loading.css";
import "./../styles/ForgetPassword.css";
import "./../styles/discoverNepal.css";
import "./../styles/illam.css";
import "./../styles/everestRegion.css";
import "./../styles/koshiTappu.css";
import "./../styles/janaki.css";
import "./../styles/dharan.css";
import "./../styles/lalitpur.css";
import "./../styles/kathmandu.css";
import "./../styles/bhaktapur.css";
import "./../styles/langtangNationalPark.css";
import "./../styles/gosaikunda.css";
import "./../styles/gaurishankar.css";
import "./../styles/annapurna.css";
import "./../styles/pokhara.css";
import "./../styles/dhaulagiri.css"
import "./../styles/ghandruk.css"
import "./../styles/ghorepani.css"
import "./../styles/machhapuchhre.css"
import "./../styles/bardia.css"
import "./../styles/lumbini.css"
import "./../styles/sheyLake.css"
import "./../styles/shey.css"
import "./../styles/rara.css"
import "./../styles/khaptad.css"
import "./../styles/api.css"

import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Trekya",
  icons: [
    { rel: "icon", url: "/mount-b.png", media: "(prefers-color-scheme: light)" },
    { rel: "icon", url: "/mount-w.png", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Nova+Cut&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
