/**
 * Fallback da home.
 * O middleware reescreve "/" para /api/full-site,
 * que devolve o HTML com Content-Type correto.
 */
export default function HomePage() {
  return (
    <main style={{ fontFamily: "system-ui", padding: 40 }}>
      <p>Carregando Kloset Styles…</p>
    </main>
  );
}
