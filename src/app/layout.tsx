import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";
import "react-tooltip/dist/react-tooltip.css";
import { Toaster } from "sonner";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Form Management",
  description: "Agnos front-end candidate assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          // --- ส่วนของการออกแบบ ---
          toastOptions={{
            // ใช้ classNames เพื่อใส่ Tailwind CSS ให้กับส่วนต่างๆ ของ toast
            classNames: {
              toast:
                "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border border-black/10 dark:border-white/10 rounded-md shadow-2xl",
              title: "font-semibold",
              description: "text-slate-600 dark:text-slate-400",
              actionButton:
                "bg-slate-900 dark:bg-slate-50 text-white dark:text-black",
              cancelButton:
                "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
              closeButton:
                "bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600",
              // สไตล์สำหรับ toast แต่ละประเภท
              success:
                "dark:!bg-green-900/40 !text-green-600 dark:!text-green-400 !border-green-500/30",
              error:
                "dark:!bg-red-900/40 !text-red-600 dark:!text-red-400 !border-red-500/30",
            },
          }}
          // 2. กำหนดไอคอนที่เรา import มาสำหรับแต่ละประเภท
          icons={{
            success: (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="w-5 h-5 text-green-500"
              />
            ),
            error: (
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="w-5 h-5 text-red-500"
              />
            ),
            info: (
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="w-5 h-5 text-blue-500"
              />
            ),
            warning: (
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="w-5 h-5 text-yellow-500"
              />
            ),
          }}
          // --- การตั้งค่าอื่นๆ ---
          position="top-right" // ตำแหน่งยอดนิยม
          // richColors จะถูก override ด้วย classNames ด้านบน แต่ยังคงมีประโยชน์บางอย่าง
          richColors
          // ระยะเวลาที่ toast จะแสดง (หน่วยเป็นมิลลิวินาที)
          duration={3000}
        />
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
