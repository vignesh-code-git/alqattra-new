import "./globals.css";

export const metadata = {
  title: "Al Qattara Pure Water CRM & ERP",
  description: "Enterprise Water Delivery Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
