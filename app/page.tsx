import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.46a1 1 0 0 0 .99.85H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.85l.58-3.46a2 2 0 0 0-1.34-2.23z" />
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-tight text-brand-dark">
              Kloset Styles
            </span>
          </div>

          <nav className="hidden sm:flex items-center gap-8 text-sm text-brand-muted">
            <a href="#como-funciona" className="hover:text-brand-dark transition-colors">
              Como funciona
            </a>
            <a href="#recursos" className="hover:text-brand-dark transition-colors">
              Recursos
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="text-sm font-medium bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand-secondary mb-4 tracking-wide uppercase">
              Guarda-roupa digital inteligente
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-brand-dark leading-tight tracking-tight text-balance">
              Seu guarda-roupa, suas cores, suas soluções.
            </h1>
            <p className="mt-6 text-lg text-brand-muted leading-relaxed max-w-xl">
              Analise seu subtom de pele, descubra as cores que combinam com você
              e monte looks práticos com as peças que você já tem — considerando
              ocasião e clima.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-primary/90 transition-colors"
              >
                Começar agora
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 border border-zinc-200 text-brand-dark px-6 py-3 rounded-xl font-medium hover:bg-zinc-50 transition-colors"
              >
                Ver como funciona
              </a>
            </div>
          </div>

          {/* Color preview strip */}
          <div className="mt-16 flex gap-3">
            <div className="h-3 w-16 rounded-full bg-brand-primary" />
            <div className="h-3 w-16 rounded-full bg-brand-secondary" />
            <div className="h-3 w-16 rounded-full bg-brand-accent" />
            <div className="h-3 w-16 rounded-full bg-zinc-300" />
            <div className="h-3 w-16 rounded-full bg-zinc-800" />
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="bg-brand-light/60 border-y border-zinc-100">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-2xl font-semibold text-brand-dark mb-12">
              Como funciona
            </h2>

            <div className="grid sm:grid-cols-3 gap-10">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5B21B6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brand-dark">1. Analise seu subtom</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Envie uma selfie e a IA identifica se seu subtom é quente, frio
                  ou neutro, além do contraste e da estação de cores ideal.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.46a1 1 0 0 0 .99.85H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.85l.58-3.46a2 2 0 0 0-1.34-2.23z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brand-dark">2. Cadastre suas peças</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Fotografe e registre as roupas que você já tem. Informe
                  categoria, cor predominante e estilo de cada peça.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3v18" />
                    <path d="m8 7 4-4 4 4" />
                    <path d="M8 17h8" />
                    <path d="M8 13h8" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brand-dark">3. Receba looks prontos</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Informe a ocasião e o clima. O sistema monta combinações
                  reais com o que você já tem e mostra o que pode faltar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recursos */}
        <section id="recursos" className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-semibold text-brand-dark mb-12">
            O que você consegue fazer
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border border-zinc-100 rounded-2xl p-6 hover:border-brand-primary/30 transition-colors">
              <h3 className="font-semibold text-brand-dark mb-2">Análise de cores</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Descubra sua paleta pessoal e saiba quais tons valorizam sua
                pele, cabelo e olhos.
              </p>
            </div>
            <div className="border border-zinc-100 rounded-2xl p-6 hover:border-brand-secondary/30 transition-colors">
              <h3 className="font-semibold text-brand-dark mb-2">Guarda-roupa organizado</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Tenha todas as suas peças em um só lugar, com fotos e tags
                fáceis de filtrar.
              </p>
            </div>
            <div className="border border-zinc-100 rounded-2xl p-6 hover:border-brand-accent/30 transition-colors">
              <h3 className="font-semibold text-brand-dark mb-2">Looks por ocasião e clima</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Trabalho, casual, evento ou frio — o sistema considera o
                contexto real do dia.
              </p>
            </div>
            <div className="border border-zinc-100 rounded-2xl p-6 hover:border-zinc-300 transition-colors">
              <h3 className="font-semibold text-brand-dark mb-2">Sugestões práticas</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Não é só estética: você recebe combinações possíveis com o que
                já possui e dicas do que falta.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-brand-primary flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.46a1 1 0 0 0 .99.85H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.85l.58-3.46a2 2 0 0 0-1.34-2.23z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-brand-dark">Kloset Styles</span>
          </div>
          <p className="text-xs text-brand-muted">
            Seu guarda-roupa, suas cores, suas soluções.
          </p>
        </div>
      </footer>
    </div>
  );
}
