export default function AnalisePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-brand-dark">Análise de subtom</h1>
        <p className="mt-1 text-brand-muted">
          Envie uma selfie bem iluminada para identificarmos seu subtom, contraste e estação de cores.
        </p>
      </div>

      <div className="border border-dashed border-zinc-200 rounded-2xl p-12 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-primary/10 flex items-center justify-center">
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
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-brand-dark">Upload de selfie</p>
          <p className="mt-1 text-sm text-brand-muted">
            Em breve: análise com Google Gemini.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="mt-4 px-5 py-2.5 rounded-xl bg-brand-primary/50 text-white text-sm font-medium cursor-not-allowed"
        >
          Selecionar foto
        </button>
      </div>

      <div className="bg-brand-light/60 rounded-2xl p-5 text-sm text-brand-muted space-y-2">
        <p className="font-medium text-brand-dark">Dicas para uma boa foto:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Luz natural, de preferência perto de uma janela</li>
          <li>Rosto limpo, sem maquiagem pesada</li>
          <li>Fundo neutro</li>
          <li>Olhe para a câmera</li>
        </ul>
      </div>
    </div>
  );
}
