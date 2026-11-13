"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("rouda@alqattara.com");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] relative flex flex-col font-sans overflow-hidden">
      {/* Hero band with the curved lower edge from the reference */}
      <div
        className="absolute inset-x-0 top-0 h-[34vh] min-h-[210px] bg-gradient-to-r from-[#007AFF] via-[#32ADE6] to-[#5AC8FA]"
        style={{ clipPath: "ellipse(135% 100% at 50% 0%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 pt-14 pb-6 px-6 text-center">
        <h1 className="text-white text-2xl sm:text-[26px] font-bold tracking-tight">Welcome!</h1>
        <p className="text-white/85 text-[12px] sm:text-[13px] mt-1.5 font-medium">
          Stay Cool, Stay Hydrated, Anywhere in the UAE
        </p>
      </div>

      {/* Login card */}
      <div className="relative z-20 w-full max-w-[380px] mx-auto px-4">
        <div className="bg-white rounded-[20px] shadow-[0_14px_40px_rgba(0,0,0,0.12)] border border-[#3C3C43]/8 px-8 py-9">
          <div className="flex justify-center mb-7">
            <Image
              src="/alqattara-logo.svg"
              alt="Al Qattara"
              width={240}
              height={92}
              priority
              className="h-[52px] w-auto"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-[#8E8E93] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rouda@alqattara.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#3C3C43]/15 rounded-[10px] text-[12px] text-[#1C1C1E] placeholder:text-[#8E8E93] focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/18 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-[#8E8E93] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#3C3C43]/15 rounded-[10px] text-[12px] text-[#1C1C1E] placeholder:text-[#8E8E93] focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/18 transition-all"
              />
            </div>

            <label className="flex items-center gap-2 pt-1 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-3.5 h-3.5 rounded-[4px] border-[#3C3C43]/25 text-[#007AFF] focus:ring-[#007AFF]/30 cursor-pointer"
              />
              <span className="text-[11px] font-medium text-[#3C3C43]">Remember me</span>
            </label>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-2 rounded-[8px] bg-[#007AFF] hover:bg-[#0062CC] text-white text-[12px] font-semibold shadow-[0_3px_10px_rgba(0,122,255,0.35)] transition-all cursor-pointer disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-14 mb-8 flex items-center justify-between text-[11px] text-[#8E8E93]">
        <div>
          © 2026{" "}
          <a href="#" className="text-[#007AFF] hover:underline font-medium">
            Iconia Technologies
          </a>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-[#007AFF] transition-colors">
            Iconia
          </a>
          <a href="#" className="hover:text-[#007AFF] transition-colors">
            About Us
          </a>
        </div>
      </footer>
    </div>
  );
}
