import { NextResponse } from "next/server";

/**
 * Serve o index.html do repositório como página HTML de verdade
 * (Content-Type: text/html), para a Vercel não mostrar o código em texto.
 */
export async function GET() {
  const res = await fetch(
    "https://raw.githubusercontent.com/qeloize-elyot/kloset-styles/main/index.html",
    {
      next: { revalidate: 60 },
      headers: {
        Accept: "text/html,text/plain,*/*",
      },
    }
  );

  if (!res.ok) {
    return new NextResponse(
      "<!DOCTYPE html><html><body><h1>Não foi possível carregar o site.</h1><p>Confira se o arquivo index.html existe na raiz do repositório.</p></body></html>",
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
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
