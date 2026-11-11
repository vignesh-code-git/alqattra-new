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
    <div className="min-h-screen bg-[#F2F2F7] relative flex flex-col justify-between overflow-hidden font-sans">
      {/* Background ambient iOS blur orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#007AFF]/20 to-[#5856D6]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-[#34C759]/15 to-[#007AFF]/10 blur-3xl pointer-events-none" />

      {/* Top iOS hero banner */}
      <div
        className="w-full pt-16 pb-40 px-6 text-center relative z-10 bg-linear-to-r from-[#007AFF] via-[#3A82F6] to-[#5856D6]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
        }}
      >
        <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
          Welcome!
        </h1>
        <p className="text-white/80 text-xs sm:text-sm mt-2 font-medium">
          Stay Cool, Stay Hydrated, Anywhere in the UAE
        </p>
      </div>

      {/* Centered Login Card */}
      <div className="w-full max-w-sm mx-auto -mt-28 px-4 relative z-20">
        <div className="bg-white/85 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-white/60 p-8">
          {/* Al Qattara Logo */}
          <div className="flex flex-col items-center mb-7">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white shadow-[0_4px_14px_rgba(0,122,255,0.35)]">
                <Droplets className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-[#1C1C1E] leading-tight">
                  القطارة
                </div>
                <div className="text-[11px] font-semibold text-[#8E8E93] tracking-widest">
                  AL QATTARA
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@alqattara.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F2F2F7]/70 border border-[#3C3C43]/15 rounded-xl text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F2F2F7]/70 border border-[#3C3C43]/15 rounded-xl text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-xs text-[#8E8E93] cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded-md border-[#3C3C43]/20 text-[#007AFF] focus:ring-[#007AFF]"
                />
                <span className="font-medium text-[#1C1C1E]">Remember me</span>
              </label>
              <a href="#" className="text-xs text-[#007AFF] hover:underline font-medium">
                Forgot?
              </a>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-[0_4px_14px_rgba(0,122,255,0.3)] transition-all cursor-pointer disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-[#8E8E93] relative z-10">
        <div>
          © 2026 <span className="text-[#007AFF] font-medium">Iconia Technologies</span>
        </div>
        <div className="text-[#007AFF] font-medium">Iconia Technologies</div>
      </footer>
    </div>
  );
}
