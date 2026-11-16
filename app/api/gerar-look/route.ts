import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 45;

const GEMINI_MODELS: string[] = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-001",
  "gemini-2.5-flash",
  "gemini-2.0-flash-lite",
  "gemini-2.5-flash-lite",
];

type ClosetPiece = {
  id: number | string;
  name: string;
  category: string;
  style?: string;
  season?: string;
  colorName?: string;
  colorHex?: string;
};

type LookBody = {
  pieces?: ClosetPiece[];
  occasion?: string;
  weather?: string;
  style?: string;
  location?: string;
  subtom?: string;
  biotipo?: string;
  palette?: string;
  genero?: string;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function isRetryable(msg: string) {
  const m = msg.toLowerCase();
  return (
    m.includes("not found") ||
    m.includes("404") ||
    m.includes("503") ||
    m.includes("429") ||
    m.includes("high demand") ||
    m.includes("resource exhausted") ||
    m.includes("unavailable") ||
    m.includes("overloaded") ||
    m.includes("try again")
  );
}

function extractJson(text: string): Record<string, unknown> | null {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(cleaned) as Record<string, unknown>;
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}

function pickFallback(pieces: ClosetPiece[]) {
  const tops = pieces.filter((p) =>
    ["blusas", "casacos", "vestidos"].includes(String(p.category))
  );
  const bottoms = pieces.filter((p) =>
    ["calcas", "saias"].includes(String(p.category))
  );
  const shoes = pieces.filter((p) => String(p.category) === "calcados");

  return {
    top_id: tops[0]?.id ?? null,
    bottom_id: bottoms[0]?.id ?? null,
    shoe_id: shoes[0]?.id ?? null,
    title: "Look do closet",
    explanation:
      "Combinação base com as primeiras peças disponíveis do seu closet (modo reserva).",
  };
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_GENERATIVE_AI_API_KEY não configurada na Vercel." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as LookBody;
    const pieces = Array.isArray(body.pieces) ? body.pieces : [];

    if (pieces.length === 0) {
      return NextResponse.json(
        { error: "Envie as peças do closet para montar o look." },
        { status: 400 }
      );
    }

    const occasion = body.occasion || "Dia a Dia";
    const weather = body.weather || "ameno";
    const style = body.style || "Casual Chic";
    const location = body.location || "Brasil";
    const subtom = body.subtom || "Neutro";
    const biotipo = body.biotipo || "Ampulheta";
    const palette = body.palette || "inverno_profundo";
    const genero = body.genero || "feminino";

    const catalog = pieces
      .map(
        (p) =>
          `- id:${p.id} | ${p.name} | cat:${p.category} | cor:${p.colorName || "?"} | estilo:${p.style || "?"} | estação:${p.season || "?"}`
      )
      .join("\n");

    const prompt = `Você é uma stylist de moda brasileira do app Kloset Styles.
Monte UM look coerente usando APENAS peças do catálogo abaixo (ids reais).

Contexto:
- gênero: ${genero}
- ocasião: ${occasion}
- clima: ${weather}
- estilo desejado: ${style}
- cidade: ${location}
- subtom: ${subtom}
- biotipo: ${biotipo}
- paleta: ${palette}

Catálogo do closet do usuário:
${catalog}

Regras:
1) Escolha 1 peça de cima (blusas/casacos/vestidos), 1 de baixo (calcas/saias) e 1 calçado (calcados) quando existirem.
2) Se for vestido, bottom_id pode ser null.
3) Priorize harmonia de cores com o subtom, clima e ocasião.
4) Responda SOMENTE JSON válido, sem markdown:
{
  "top_id": number|string|null,
  "bottom_id": number|string|null,
  "shoe_id": number|string|null,
  "title": string,
  "explanation": string
}

explanation: 2 a 4 frases em português, citando as peças pelo nome e o porquê.`;

    const genAI = new GoogleGenerativeAI(apiKey);
    let text = "";
    let usedModel = GEMINI_MODELS[0];
    let lastError: Error | null = null;

    for (const modelName of GEMINI_MODELS) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: { temperature: 0.4, maxOutputTokens: 700 },
          });
          const result = await model.generateContent(prompt);
          text = result.response.text();
          usedModel = modelName;
          lastError = null;
          break;
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));
          if (isRetryable(lastError.message || "")) {
            if (attempt < 2) {
              await sleep(700 * attempt);
              continue;
            }
            break;
          }
          throw lastError;
        }
      }
      if (text) break;
    }

    if (!text) {
      const fb = pickFallback(pieces);
      return NextResponse.json({
        ok: true,
        provider: "fallback",
        model: null,
        ...fb,
        note:
          lastError?.message?.includes("high demand") ||
          lastError?.message?.includes("503")
            ? "Gemini ocupado; usamos combinação reserva do closet."
            : "Gemini indisponível; usamos combinação reserva.",
      });
    }

    const parsed = extractJson(text);
    if (!parsed) {
      const fb = pickFallback(pieces);
      return NextResponse.json({
        ok: true,
        provider: "fallback",
        model: usedModel,
        ...fb,
        note: "Resposta da IA inválida; usamos combinação reserva.",
      });
    }

    const ids = new Set(pieces.map((p) => String(p.id)));
    const top_id =
      parsed.top_id != null && ids.has(String(parsed.top_id))
        ? parsed.top_id
        : pickFallback(pieces).top_id;
    const bottom_id =
      parsed.bottom_id != null && ids.has(String(parsed.bottom_id))
        ? parsed.bottom_id
        : pickFallback(pieces).bottom_id;
    const shoe_id =
      parsed.shoe_id != null && ids.has(String(parsed.shoe_id))
        ? parsed.shoe_id
        : pickFallback(pieces).shoe_id;

    return NextResponse.json({
      ok: true,
      provider: "google-gemini",
      model: usedModel,
      top_id,
      bottom_id,
      shoe_id,
      title: String(parsed.title || `${style} para ${occasion}`),
      explanation: String(
        parsed.explanation ||
          "Look montado com as peças do seu closet, alinhado ao clima e à ocasião."
      ),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro ao gerar look.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
