import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Apple's SF Pro is not licensed for web embedding, so Inter stands in for it:
 * same neutral UI-grotesque proportions, and it ships the tabular figures the
 * data tables rely on. Real Apple devices still get SF first — the font stack
 * in globals.css puts -apple-system ahead of this.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ios",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Al Qattara Pure Water CRM & ERP",
  description: "Enterprise Water Delivery Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-[#F2F2F7] text-[#1C1C1E] selection:bg-[#D6EAFF] selection:text-[#003D7F]">
        {children}
      </body>
    </html>
  );
}
