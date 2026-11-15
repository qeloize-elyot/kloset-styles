/**
 * Home do Vercel: carrega o site HTML completo que está em /index.html no repositório.
 * Assim a URL da Vercel mostra o mesmo visual do HTML (loja, closet, paleta, clima, etc.).
 */
export default function HomePage() {
  return (
    <iframe
      src="https://cdn.jsdelivr.net/gh/qeloize-elyot/kloset-styles@main/index.html"
      title="Kloset Styles"
      className="fixed inset-0 h-full w-full border-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
