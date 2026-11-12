import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-brand-dark">Olá!</h1>
        <p className="mt-1 text-brand-muted">
          Bem-vindo ao seu guarda-roupa digital.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/analise"
          className="group border border-zinc-100 rounded-2xl p-5 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
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
          <h2 className="font-semibold text-brand-dark">Analisar subtom</h2>
          <p className="mt-1 text-sm text-brand-muted">
            Envie uma selfie e descubra suas cores.
          </p>
        </Link>

        <Link
          href="/guarda-roupa"
          className="group border border-zinc-100 rounded-2xl p-5 hover:border-brand-secondary/40 hover:bg-brand-secondary/5 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center mb-4 group-hover:bg-brand-secondary/20 transition-colors">
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
          <h2 className="font-semibold text-brand-dark">Guarda-roupa</h2>
          <p className="mt-1 text-sm text-brand-muted">
            Cadastre e organize suas peças.
          </p>
        </Link>

        <Link
          href="/looks"
          className="group border border-zinc-100 rounded-2xl p-5 hover:border-brand-accent/40 hover:bg-brand-accent/5 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4 group-hover:bg-brand-accent/20 transition-colors">
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
          <h2 className="font-semibold text-brand-dark">Gerar looks</h2>
          <p className="mt-1 text-sm text-brand-muted">
            Monte combinações por ocasião e clima.
          </p>
        </Link>
      </div>

      {/* Status placeholder */}
      <div className="border border-dashed border-zinc-200 rounded-2xl p-8 text-center">
        <p className="text-sm text-brand-muted">
          Você ainda não tem análise de cores nem peças cadastradas.
        </p>
        <p className="mt-2 text-sm text-brand-muted">
          Comece pela análise de subtom ou cadastre suas primeiras peças.
        </p>
      </div>
    </div>
  );
}
