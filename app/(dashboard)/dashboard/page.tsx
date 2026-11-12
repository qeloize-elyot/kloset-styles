import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#B85D3B] font-semibold mb-2">
          Seu closet digital
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-[#181715]">
          Olá! Bem-vindo de volta.
        </h1>
        <p className="mt-2 text-[#6E6A63]">
          Continue organizando seu guarda-roupa e montando looks.
        </p>
      </div>

      {/* Cards de ação */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/analise"
          className="group rounded-3xl border border-[#E5DFD5] bg-white p-6 hover:border-[#B85D3B]/40 hover:shadow-lg hover:shadow-[#B85D3B]/5 transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#F2EDE4] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B85D3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
          <h2 className="font-serif text-lg text-[#181715] mb-1">Analisar subtom</h2>
          <p className="text-sm text-[#6E6A63] leading-relaxed">
            Envie uma selfie e descubra suas cores ideais.
          </p>
        </Link>

        <Link
          href="/guarda-roupa"
          className="group rounded-3xl border border-[#E5DFD5] bg-white p-6 hover:border-[#B85D3B]/40 hover:shadow-lg hover:shadow-[#B85D3B]/5 transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#F2EDE4] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B85D3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.46a1 1 0 0 0 .99.85H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.85l.58-3.46a2 2 0 0 0-1.34-2.23z" />
            </svg>
          </div>
          <h2 className="font-serif text-lg text-[#181715] mb-1">Guarda-roupa</h2>
          <p className="text-sm text-[#6E6A63] leading-relaxed">
            Cadastre e organize as peças que você já tem.
          </p>
        </Link>

        <Link
          href="/looks"
          className="group rounded-3xl border border-[#E5DFD5] bg-white p-6 hover:border-[#B85D3B]/40 hover:shadow-lg hover:shadow-[#B85D3B]/5 transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#F2EDE4] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B85D3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v18" />
              <path d="m8 7 4-4 4 4" />
              <path d="M8 17h8" />
              <path d="M8 13h8" />
            </svg>
          </div>
          <h2 className="font-serif text-lg text-[#181715] mb-1">Gerar looks</h2>
          <p className="text-sm text-[#6E6A63] leading-relaxed">
            Monte combinações por ocasião e clima.
          </p>
        </Link>
      </div>

      {/* Estado vazio */}
      <div className="rounded-3xl border border-dashed border-[#D6CFC3] bg-[#F2EDE4]/40 p-10 text-center">
        <p className="font-serif text-lg text-[#181715]">
          Seu closet ainda está vazio
        </p>
        <p className="mt-2 text-sm text-[#6E6A63] max-w-sm mx-auto">
          Comece pela análise de subtom ou cadastre suas primeiras peças para montar looks.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/analise"
            className="px-5 py-2.5 rounded-full bg-[#181715] text-[#FAF8F5] text-sm font-medium hover:bg-[#B85D3B] transition-colors"
          >
            Fazer análise
          </Link>
          <Link
            href="/guarda-roupa"
            className="px-5 py-2.5 rounded-full border border-[#D6CFC3] text-sm font-medium text-[#181715] hover:border-[#181715] transition-colors"
          >
            Adicionar peça
          </Link>
        </div>
      </div>
    </div>
  );
}
