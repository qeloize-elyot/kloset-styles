import { NextResponse } from "next/server";

/**
 * Serve o index.html da raiz do repositório como página HTML completa.
 * A versão final já inclui auth, closet, paleta, clima, pagamento simulado e perfis Mulher/Homem.
 */
export async function GET() {
  const res = await fetch(
    "https://raw.githubusercontent.com/qeloize-elyot/kloset-styles/main/index.html",
    {
      cache: "no-store",
      headers: { Accept: "text/html,text/plain,*/*" },
    }
  );

  if (!res.ok) {
    return new NextResponse(
      "<!DOCTYPE html><html lang=\"pt-BR\"><body style=\"font-family:system-ui;padding:40px;background:#140c18;color:#f4edf9\"><h1>Kloset Styles</h1><p>Não foi possível carregar o site. Confira se o arquivo index.html existe na raiz do repositório.</p></body></html>",
      {
        status: 502,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  const html = await res.text();

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
    },
  });
}
