export default function PerfilPage() {
  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-brand-dark">Perfil</h1>
        <p className="mt-1 text-brand-muted">
          Gerencie suas informações e preferências.
        </p>
      </div>

      <div className="bg-white border border-zinc-100 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5B21B6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-brand-dark">Seu nome</p>
            <p className="text-sm text-brand-muted">seu@email.com</p>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">
              Nome
            </label>
            <input
              type="text"
              disabled
              placeholder="Seu nome"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm bg-zinc-50 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              disabled
              placeholder="seu@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm bg-zinc-50 cursor-not-allowed"
            />
          </div>
        </div>

        <button
          type="button"
          disabled
          className="w-full py-2.5 rounded-xl bg-brand-primary/50 text-white text-sm font-medium cursor-not-allowed"
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}
