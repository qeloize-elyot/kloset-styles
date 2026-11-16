import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const GEMINI_MODELS: string[] = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-001",
  "gemini-flash-latest",
  "gemini-2.5-flash",
];

type AnaliseBody = {
  imageBase64?: string;
  mimeType?: string;
  genero?: string;
};

function extractJson(text: string): Record<string, unknown> | null {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

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

function normalizePalette(subtom: string, contraste?: string): string {
  const s = (subtom || "").toLowerCase();
  const c = (contraste || "").toLowerCase();

  if (s.includes("quente")) {
    return c.includes("baixo") || c.includes("suave")
      ? "primavera_clara"
      : "outono_escuro";
  }
  if (s.includes("neutro")) {
    return "verao_suave";
  }
  return c.includes("baixo") || c.includes("suave")
    ? "verao_suave"
    : "inverno_profundo";
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

    const body = (await request.json()) as AnaliseBody;
    let imageBase64 = (body.imageBase64 || "").trim();
    const mimeType = (body.mimeType || "image/jpeg").trim();
    const genero = (body.genero || "feminino").trim();

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Envie uma selfie (imageBase64)." },
        { status: 400 }
      );
    }

    if (imageBase64.startsWith("data:")) {
      const parts = imageBase64.split(",");
      imageBase64 = parts[1] || "";
    }

    if (!imageBase64 || imageBase64.length < 100) {
      return NextResponse.json(
        { error: "Imagem inválida ou muito pequena." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const prompt = `Você é uma consultora de coloração pessoal e morfologia corporal (Brasil).
Analise a selfie e responda APENAS um JSON válido (sem markdown), com este formato exato:
{
  "subtom": "Quente" | "Frio" | "Neutro",
  "contraste": "alto" | "medio" | "baixo",
  "biotipo": string,
  "paleta_sugerida": string,
  "cores_recomendadas": string[],
  "cores_evitar": string[],
  "observacoes": string,
  "confianca": number
}

Regras:
- subtom: veias, tom de pele, contraste rosto/cabelo/olhos.
- biotipo (gênero informado: ${genero}):
  - se feminino: Ampulheta, Triângulo (Pera), Triângulo Invertido, Retângulo, Oval
  - se masculino: Trapézio (Atlético), Triângulo, Triângulo Invertido, Retângulo, Oval
- paleta_sugerida use um destes ids: inverno_profundo, inverno_frio, verao_suave, outono_escuro, primavera_clara
- cores_recomendadas e cores_evitar: 4 a 6 nomes de cores em português
- confianca: 0 a 100
- Se a foto não mostrar bem o rosto, estime com cautela e explique em observacoes.

Responda só o JSON.`;

    const imagePart = {
      inlineData: {
        mimeType:
          mimeType === "image/png" || mimeType === "image/webp"
            ? mimeType
            : "image/jpeg",
        data: imageBase64,
      },
    };

    let text = "";
    let usedModel = "gemini-2.0-flash";
    let lastError: Error | null = null;

    for (const modelName of GEMINI_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          },
        });
        const result = await model.generateContent([
          { text: prompt },
          imagePart,
        ]);
        text = result.response.text();
        usedModel = modelName;
        lastError = null;
        break;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        const msg = lastError.message || "";
        if (
          msg.includes("not found") ||
          msg.includes("404") ||
          msg.includes("is not supported")
        ) {
          continue;
        }
        throw lastError;
      }
    }

    if (lastError && !text) {
      throw lastError;
    }

    const parsed = extractJson(text);

    if (!parsed) {
      return NextResponse.json(
        {
          error: "A IA não retornou um JSON válido. Tente outra foto.",
          raw: text.slice(0, 500),
          model: usedModel,
        },
        { status: 502 }
      );
    }

    const subtomRaw = String(parsed.subtom || "Frio");
    const subtom = subtomRaw.toLowerCase().includes("quente")
      ? "Quente"
      : subtomRaw.toLowerCase().includes("neutro")
        ? "Neutro"
        : "Frio";

    const contraste = String(parsed.contraste || "medio");
    const biotipo = String(
      parsed.biotipo ||
        (genero === "masculino" ? "Trapézio (Atlético)" : "Ampulheta")
    );
    const paleta_id =
      String(parsed.paleta_sugerida || "") ||
      normalizePalette(subtom, contraste);

    const cores_recomendadas = Array.isArray(parsed.cores_recomendadas)
      ? (parsed.cores_recomendadas as string[]).map(String).slice(0, 8)
      : [];
    const cores_evitar = Array.isArray(parsed.cores_evitar)
      ? (parsed.cores_evitar as string[]).map(String).slice(0, 8)
      : [];

    const observacoes = String(
      parsed.observacoes || "Análise gerada pelo Google Gemini."
    );
    const confianca = Math.max(
      0,
      Math.min(100, Number(parsed.confianca) || 75)
    );

    return NextResponse.json({
      ok: true,
      provider: "google-gemini",
      model: usedModel,
      subtom,
      contraste,
      biotipo,
      paleta_id,
      cores_recomendadas,
      cores_evitar,
      observacoes,
      confianca,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro desconhecido na análise.";
    return NextResponse.json({ error: message, ok: false }, { status: 500 });
  }
}
