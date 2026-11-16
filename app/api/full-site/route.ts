import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

/**
 * Serve o index.html da raiz do repositório como página HTML completa,
 * injetando as variáveis públicas do Supabase para o JS do site conectar no banco.
 */
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  let html: string | null = null;

  // 1) Tenta ler do filesystem do deploy (mais rápido e confiável)
  try {
    const filePath = path.join(process.cwd(), "index.html");
    html = await readFile(filePath, "utf-8");
  } catch {
    html = null;
  }

  // 2) Fallback: busca no GitHub raw
  if (!html) {
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

    html = await res.text();
  }

  // Injeta URL e anon key do Supabase antes de qualquer script da aplicação
  const inject = `<script>window.NEXT_PUBLIC_SUPABASE_URL=${JSON.stringify(
    supabaseUrl
  )};window.NEXT_PUBLIC_SUPABASE_ANON_KEY=${JSON.stringify(
    supabaseAnonKey
  )};</script>`;

  if (html.includes("</head>")) {
    html = html.replace("</head>", `${inject}</head>`);
  } else {
    html = inject + html;
  }

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
    },
  });
}
