"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PecaCloset } from "@/types";

export type ActionResult =
  | { ok: true; data?: PecaCloset | PecaCloset[] }
  | { ok: false; error: string };

async function getAuthUserId() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { supabase, userId: null as string | null, error: "Faça login para continuar." };
  }

  return { supabase, userId: user.id, error: null as string | null };
}

export async function listarPecas(): Promise<ActionResult> {
  const { supabase, userId, error } = await getAuthUserId();
  if (error || !userId) return { ok: false, error: error || "Não autenticado." };

  const { data, error: dbError } = await supabase
    .from("pecas_closet")
    .select("*")
    .eq("user_id", userId)
    .order("criado_em", { ascending: false });

  if (dbError) {
    return { ok: false, error: dbError.message || "Erro ao carregar peças." };
  }

  return { ok: true, data: (data || []) as PecaCloset[] };
}

export async function adicionarPeca(formData: FormData): Promise<ActionResult> {
  const { supabase, userId, error } = await getAuthUserId();
  if (error || !userId) return { ok: false, error: error || "Não autenticado." };

  const nome = String(formData.get("nome") || "").trim();
  const categoria = String(formData.get("categoria") || "").trim();
  const cor = String(formData.get("cor") || "").trim();
  const imagem = String(formData.get("imagem") || "").trim() || null;
  const tagsRaw = String(formData.get("tags") || "").trim();
  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  if (!nome || !categoria || !cor) {
    return { ok: false, error: "Preencha nome, categoria e cor." };
  }

  const { data, error: dbError } = await supabase
    .from("pecas_closet")
    .insert({
      user_id: userId,
      nome,
      categoria,
      cor,
      imagem,
      tags,
    })
    .select("*")
    .single();

  if (dbError) {
    return { ok: false, error: dbError.message || "Erro ao salvar peça." };
  }

  revalidatePath("/guarda-roupa");
  return { ok: true, data: data as PecaCloset };
}

export async function removerPeca(id: number): Promise<ActionResult> {
  const { supabase, userId, error } = await getAuthUserId();
  if (error || !userId) return { ok: false, error: error || "Não autenticado." };

  if (!id || Number.isNaN(id)) {
    return { ok: false, error: "ID inválido." };
  }

  const { error: dbError } = await supabase
    .from("pecas_closet")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (dbError) {
    return { ok: false, error: dbError.message || "Erro ao remover peça." };
  }

  revalidatePath("/guarda-roupa");
  return { ok: true };
}
