"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Droplets, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("rouda@alqattara.com");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#111736] relative flex flex-col justify-between overflow-hidden">
      {/* Top gradient hero section with diagonal split (Figma login page.png) */}
      <div
        className="w-full pt-14 pb-44 px-4 text-center relative z-10 bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
        }}
      >
        <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome!
        </h1>
        <p className="text-slate-200 text-xs sm:text-sm mt-2">
          Stay Cool, Stay Hydrated, Anywhere in the UAE
        </p>
      </div>

      {/* Centered Login Card */}
      <div className="w-full max-w-sm mx-auto -mt-32 px-4 relative z-20">
        <div className="bg-[#F8FAFC] rounded-lg shadow-2xl border border-slate-200/80 p-7">
          {/* Al Qattara Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#1B3B5A] to-[#38A3C7] flex items-center justify-center text-white shadow-sm">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-lg font-extrabold text-[#1B3B5A] leading-none">
                  القطارة
                </div>
                <div className="text-[11px] font-extrabold text-[#1B3B5A] tracking-wider">
                  AL QATTARA
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-9 pr-3 py-2.5 bg-[#EDF2FF] border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#5948DB]"
              />
            </div>

            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-9 pr-3 py-2.5 bg-[#EDF2FF] border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#5948DB]"
              />
            </div>

            <div className="pt-1">
              <label className="inline-flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-[#5948DB]"
                />
                <span>Remember me</span>
              </label>
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded bg-[#5948DB] hover:bg-[#4938c7] text-white text-xs font-semibold shadow-md transition cursor-pointer"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-slate-400 relative z-10">
        <div>
          © 2024 <span className="text-[#4A90E2] font-semibold">Iconia Technologies</span>
        </div>
        <div className="text-[#4A90E2]">Iconia Technologies</div>
      </footer>
    </div>
  );
}
