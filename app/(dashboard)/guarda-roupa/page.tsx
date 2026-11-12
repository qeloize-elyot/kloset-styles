export default function GuardaRoupaPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-dark">Guarda-roupa</h1>
          <p className="mt-1 text-brand-muted">
            Cadastre e organize as peças que você já tem.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="px-4 py-2 rounded-xl bg-brand-primary/50 text-white text-sm font-medium cursor-not-allowed"
        >
          Adicionar peça
        </button>
      </div>

      <div className="border border-dashed border-zinc-200 rounded-2xl p-12 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-secondary/10 flex items-center justify-center">
          <svg
            width="28"
            height="28"
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
        <div>
          <p className="font-medium text-brand-dark">Nenhuma peça cadastrada</p>
          <p className="mt-1 text-sm text-brand-muted">
            Em breve você poderá fotografar e registrar suas roupas.
          </p>
        </div>
      </div>
    </div>
  );
}
