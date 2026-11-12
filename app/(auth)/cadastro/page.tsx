"use client";

import Link from "next/link";
import { useState } from "react";
import { signup } from "./actions";

export default function CadastroPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#FAF8F5]">
      {/* Lado esquerdo - visual */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-[#181715] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C221E] via-[#181715] to-[#1a1512]" />
        <div className="absolute top-1/3 -right-16 w-72 h-72 rounded-full bg-[#B85D3B]/15 blur-[90px]" />
        <div className="absolute bottom-1/4 -left-10 w-56 h-56 rounded-full bg-[#B85D3B]/10 blur-[70px]" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#FAF8F5] text-[#181715] flex items-center justify-center font-serif italic text-lg">
              K
            </span>
            <span className="font-serif text-xl text-[#FAF8F5]">
              Kloset <span className="italic text-[#B85D3B]">Styles</span>
            </span>
          </Link>

          <div className="space-y-6 max-w-sm">
            <h2 className="font-serif text-4xl text-[#FAF8F5] leading-tight">
              Comece a{" "}
              <span className="italic text-[#B85D3B]">organizar</span>{" "}
              seu estilo.
            </h2>
            <p className="text-[#A09A92] text-sm leading-relaxed">
              Crie sua conta e transforme seu guarda-roupa em um acervo visual inteligente.
            </p>
          </div>

          <p className="text-xs text-[#6E6A63]">
            © {new Date().getFullYear()} Kloset Styles
          </p>
        </div>
      </div>

      {/* Lado direito - formulário */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          <div className="lg:hidden mb-10">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#181715] text-[#FAF8F5] flex items-center justify-center font-serif italic text-base">
                K
              </span>
              <span className="font-serif text-xl text-[#181715]">
                Kloset <span className="italic text-[#B85D3B]">Styles</span>
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-serif text-3xl text-[#181715]">Criar conta</h1>
            <p className="mt-2 text-sm text-[#6E6A63]">
              Comece a organizar seu guarda-roupa
            </p>
          </div>

          <form action={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl px-4 py-3">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="nome" className="block text-xs font-medium uppercase tracking-wider text-[#6E6A63]">
                Nome
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-3.5 rounded-2xl border border-[#E5DFD5] bg-white text-sm text-[#181715] placeholder:text-[#A09A92] focus:outline-none focus:ring-2 focus:ring-[#B85D3B]/30 focus:border-[#B85D3B] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-[#6E6A63]">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-3.5 rounded-2xl border border-[#E5DFD5] bg-white text-sm text-[#181715] placeholder:text-[#A09A92] focus:outline-none focus:ring-2 focus:ring-[#B85D3B]/30 focus:border-[#B85D3B] transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wider text-[#6E6A63]">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3.5 rounded-2xl border border-[#E5DFD5] bg-white text-sm text-[#181715] placeholder:text-[#A09A92] focus:outline-none focus:ring-2 focus:ring-[#B85D3B]/30 focus:border-[#B85D3B] transition"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#181715] text-[#FAF8F5] py-3.5 rounded-full font-medium text-sm hover:bg-[#B85D3B] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#6E6A63]">
            Já tem conta?{" "}
            <Link href="/login" className="font-medium text-[#B85D3B] hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
