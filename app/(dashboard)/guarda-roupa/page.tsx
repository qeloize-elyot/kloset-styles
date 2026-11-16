"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Shirt, Trash2, X } from "lucide-react";
import { CATEGORIAS_PECA, type PecaCloset } from "@/types";
import { adicionarPeca, listarPecas, removerPeca } from "./actions";

export default function GuardaRoupaPage() {
  const [pecas, setPecas] = useState<PecaCloset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await listarPecas();
    if (!result.ok) {
      setError(result.error);
      setPecas([]);
    } else {
      setPecas((result.data as PecaCloset[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await adicionarPeca(formData);
    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setOpen(false);
    (e.target as HTMLFormElement).reset();
    await carregar();
  }

  async function handleDelete(id: number) {
    if (!confirm("Remover esta peça do guarda-roupa?")) return;
    setDeletingId(id);
    setError(null);
    const result = await removerPeca(id);
    setDeletingId(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    await carregar();
  }

  return (
    <div className="space-y-8 pb-20 sm:pb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7953C8]">
            Seu acervo
          </p>
          <h1 className="mt-2 font-serif text-[32px] leading-tight tracking-[-0.04em] text-[#2A2039] sm:text-[40px]">
            Guarda-roupa
          </h1>
          <p className="mt-2 max-w-md text-[13px] leading-6 text-[#81758F]">
            Cadastre e organize as peças que você já tem.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#6E43C8] px-5 py-3 text-[12px] font-bold text-white shadow-lg shadow-[#6E43C8]/25 transition hover:-translate-y-0.5 hover:bg-[#5a35b0]"
        >
          <Plus size={16} />
          Adicionar peça
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-[23px] border border-[#EAE3F1] bg-white p-12 text-center text-sm text-[#94899F]">
          Carregando peças...
        </div>
      ) : pecas.length === 0 ? (
        <div className="rounded-[23px] border border-dashed border-[#D9CDE8] bg-[#F7F3FB] p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#7045C5] shadow-sm">
            <Shirt size={26} />
          </div>
          <p className="mt-5 font-serif text-[20px] text-[#352748]">Nenhuma peça cadastrada</p>
          <p className="mt-2 text-[12px] text-[#81758F]">
            Comece adicionando a primeira peça do seu closet.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#6E43C8] px-5 py-2.5 text-[11px] font-bold text-white"
          >
            <Plus size={14} />
            Adicionar primeira peça
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pecas.map((peca) => (
            <article
              key={peca.id}
              className="group relative overflow-hidden rounded-[22px] border border-[#EAE3F1] bg-white shadow-[0_14px_35px_-32px_rgba(51,31,79,0.45)]"
            >
              <div className="relative aspect-[4/3] bg-[#F4EEFB]">
                {peca.imagem ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={peca.imagem}
                    alt={peca.nome}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#C5B4DC]">
                    <Shirt size={40} strokeWidth={1.4} />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(peca.id)}
                  disabled={deletingId === peca.id}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#C25A4A] opacity-100 shadow-sm transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 disabled:opacity-50"
                  aria-label="Remover peça"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-[18px] tracking-[-0.02em] text-[#332646]">
                  {peca.nome}
                </h3>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-[#9A8EAA]">
                  {peca.categoria} · {peca.cor}
                </p>
                {peca.tags && peca.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {peca.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#F2ECFA] px-2.5 py-0.5 text-[10px] font-semibold text-[#7045C5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div
            className="absolute inset-0"
            onClick={() => !saving && setOpen(false)}
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-[22px] text-[#2A2039]">Nova peça</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2ECFA] text-[#7045C5]"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#9A8EAA]">
                  Nome
                </label>
                <input
                  name="nome"
                  required
                  placeholder="Ex: Camisa branca social"
                  className="w-full rounded-xl border border-[#EAE3F1] px-4 py-3 text-sm text-[#2A2039] outline-none focus:border-[#C5B4DC] focus:ring-2 focus:ring-[#EDE4F8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#9A8EAA]">
                    Categoria
                  </label>
                  <select
                    name="categoria"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-[#EAE3F1] bg-white px-3 py-3 text-sm text-[#2A2039] outline-none focus:border-[#C5B4DC] focus:ring-2 focus:ring-[#EDE4F8]"
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {CATEGORIAS_PECA.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#9A8EAA]">
                    Cor
                  </label>
                  <input
                    name="cor"
                    required
                    placeholder="Ex: branco"
                    className="w-full rounded-xl border border-[#EAE3F1] px-4 py-3 text-sm text-[#2A2039] outline-none focus:border-[#C5B4DC] focus:ring-2 focus:ring-[#EDE4F8]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#9A8EAA]">
                  URL da imagem (opcional)
                </label>
                <input
                  name="imagem"
                  type="url"
                  placeholder="https://..."
                  className="w-full rounded-xl border border-[#EAE3F1] px-4 py-3 text-sm text-[#2A2039] outline-none focus:border-[#C5B4DC] focus:ring-2 focus:ring-[#EDE4F8]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#9A8EAA]">
                  Tags (separadas por vírgula)
                </label>
                <input
                  name="tags"
                  placeholder="casual, verão, trabalho"
                  className="w-full rounded-xl border border-[#EAE3F1] px-4 py-3 text-sm text-[#2A2039] outline-none focus:border-[#C5B4DC] focus:ring-2 focus:ring-[#EDE4F8]"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-2 w-full rounded-full bg-[#6E43C8] py-3.5 text-[13px] font-bold text-white transition hover:bg-[#5a35b0] disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Salvar peça"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
