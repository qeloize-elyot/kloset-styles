export default function LooksPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-brand-dark">Gerador de looks</h1>
        <p className="mt-1 text-brand-muted">
          Monte combinações com as peças do seu guarda-roupa, considerando ocasião e clima.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1.5">
            Ocasião
          </label>
          <select
            disabled
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm bg-zinc-50 text-brand-muted cursor-not-allowed"
          >
            <option>Casual</option>
            <option>Trabalho</option>
            <option>Evento</option>
            <option>Esporte</option>
            <option>Noite</option>
            <option>Viagem</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1.5">
            Clima
          </label>
          <select
            disabled
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm bg-zinc-50 text-brand-muted cursor-not-allowed"
          >
            <option>Quente</option>
            <option>Ameno</option>
            <option>Frio</option>
            <option>Chuva</option>
          </select>
        </div>
      </div>

      <div className="border border-dashed border-zinc-200 rounded-2xl p-12 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-accent/10 flex items-center justify-center">
          <svg
            width="28"
            height="28"
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
        <div>
          <p className="font-medium text-brand-dark">Ainda sem peças suficientes</p>
          <p className="mt-1 text-sm text-brand-muted">
            Cadastre peças no guarda-roupa e faça a análise de cores para gerar looks.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="mt-2 px-5 py-2.5 rounded-xl bg-brand-accent/50 text-white text-sm font-medium cursor-not-allowed"
        >
          Gerar look
        </button>
      </div>
    </div>
  );
}
