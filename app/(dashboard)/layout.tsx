import Link from "next/link";

const navItems = [
  {
    href: "/dashboard",
    label: "Início",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/analise",
    label: "Análise",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    href: "/guarda-roupa",
    label: "Guarda-roupa",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.46a1 1 0 0 0 .99.85H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.85l.58-3.46a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    href: "/looks",
    label: "Looks",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="m8 7 4-4 4 4" />
        <path d="M8 17h8" />
        <path d="M8 13h8" />
      </svg>
    ),
  },
  {
    href: "/perfil",
    label: "Perfil",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-[#FAF8F5]">
      {/* Sidebar desktop */}
      <aside className="hidden sm:flex flex-col w-60 border-r border-[#E5DFD5] bg-[#FAF8F5]">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-[#E5DFD5]">
          <span className="w-8 h-8 rounded-full bg-[#181715] text-[#FAF8F5] flex items-center justify-center font-serif italic text-sm">
            K
          </span>
          <span className="font-serif text-lg text-[#181715]">
            Kloset <span className="italic text-[#B85D3B]">Styles</span>
          </span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-[#6E6A63] hover:bg-[#F2EDE4] hover:text-[#181715] transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#E5DFD5]">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#6E6A63] hover:text-[#181715] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Voltar ao site
          </Link>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header mobile */}
        <header className="sm:hidden h-16 border-b border-[#E5DFD5] flex items-center justify-between px-5 bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#181715] text-[#FAF8F5] flex items-center justify-center font-serif italic text-sm">
              K
            </span>
            <span className="font-serif text-base text-[#181715]">
              Kloset <span className="italic text-[#B85D3B]">Styles</span>
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>

        {/* Bottom nav mobile */}
        <nav className="sm:hidden border-t border-[#E5DFD5] bg-[#FAF8F5] flex justify-around py-2.5 safe-area-pb">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-2 py-1 text-[#6E6A63] hover:text-[#B85D3B] transition-colors"
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
