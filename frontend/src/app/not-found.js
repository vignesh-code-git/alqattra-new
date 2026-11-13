import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#EAF4FF] text-[#007AFF] flex items-center justify-center font-extrabold text-2xl mb-4">
        404
      </div>
      <h1 className="text-xl font-bold text-[#1C1C1E] mb-2">Page Not Found</h1>
      <p className="text-xs text-[#8E8E93] max-w-sm mb-6">
        The requested CRM screen does not exist or has been moved.
      </p>
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-4 py-2 bg-[#007AFF] hover:bg-[#0062CC] text-white rounded-xl text-xs font-bold shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
}
