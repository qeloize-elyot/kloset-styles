"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Home, Shirt, Sparkles, User, ArrowLeft } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Início", icon: Home },
  { href: "/analise", label: "Análise de cores", icon: Camera },
  { href: "/guarda-roupa", label: "Guarda-roupa", icon: Shirt },
  { href: "/looks", label: "Meus looks", icon: Sparkles },
  { href: "/perfil", label: "Perfil", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAF8FD] text-[#2A2039] sm:flex">
      <aside className="sticky top-0 hidden h-screen w-[250px] shrink-0 flex-col border-r border-[#EAE3F1] bg-white sm:flex">
        <div className="flex h-[82px] items-center gap-3 border-b border-[#EEE8F4] px-7">
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#6E43C8] font-serif text-[22px] italic text-white shadow-lg shadow-[#6E43C8]/20">K</span>
          <span className="font-serif text-[20px] font-semibold tracking-[-0.04em] text-[#2A2039]">Kloset <span className="italic text-[#7953C8]">Styles</span></span>
        </div>

        <div className="px-6 pb-3 pt-8 text-[9px] font-bold uppercase tracking-[0.2em] text-[#A297AF]">Seu espaço</div>
        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-[12px] font-semibold transition-all ${active ? "bg-[#F1EAFB] text-[#6740B5] shadow-sm" : "text-[#7A7087] hover:bg-[#F8F5FB] hover:text-[#342548]"}`}
              >
                <Icon size={17} strokeWidth={1.8} className={active ? "text-[#7045C5]" : "text-[#A095AE] group-hover:text-[#7045C5]"} />
                {item.label}
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#7953C8]" />}
              </Link>
            );
          })}
        </nav>

        <div className="m-4 rounded-2xl bg-gradient-to-br from-[#F4EEFB] to-[#FBF9FD] p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#7650C3] shadow-sm"><Sparkles size={17} /></div>
          <p className="mt-3 text-[12px] font-semibold text-[#3C2C50]">Um look de cada vez.</p>
          <p className="mt-1 text-[10px] leading-5 text-[#82758F]">Seu estilo muda. Seu closet acompanha.</p>
        </div>

        <div className="border-t border-[#EEE8F4] p-4">
          <Link href="/" className="flex items-center gap-2 rounded-xl px-4 py-3 text-[11px] font-semibold text-[#8B8098] transition-colors hover:bg-[#F8F5FB] hover:text-[#6740B5]">
            <ArrowLeft size={14} /> Voltar ao site
          </Link>
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-[66px] items-center justify-between border-b border-[#EAE3F1] bg-white/90 px-5 backdrop-blur-xl sm:hidden">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-[#6E43C8] font-serif text-[18px] italic text-white">K</span>
            <span className="font-serif text-[17px] font-semibold tracking-[-0.04em] text-[#2A2039]">Kloset <span className="italic text-[#7953C8]">Styles</span></span>
          </Link>
          <Link href="/perfil" aria-label="Abrir perfil" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1EAFB] text-[#7045C5]"><User size={17} /></Link>
        </header>

        <main className="min-w-0 flex-1 px-4 pb-8 pt-6 sm:px-8 sm:py-9 lg:px-11">
          <div className="mx-auto w-full max-w-[1120px]">{children}</div>
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-[#EAE3F1] bg-white/95 px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl sm:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[9px] font-semibold transition-colors ${active ? "text-[#6E43C8]" : "text-[#94899F]"}`}>
                <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                <span className="max-w-full truncate">{item.label === "Análise de cores" ? "Análise" : item.label === "Guarda-roupa" ? "Closet" : item.label === "Meus looks" ? "Looks" : item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
