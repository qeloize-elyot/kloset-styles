"use client";

import React, { useState } from "react";
import Link from "next/link";

interface StylePreset {
  id: string;
  label: string;
  subtitle: string;
  occasion: string;
  harmony: string;
  palette: { name: string; hex: string }[];
  pieces: {
    slot: string;
    name: string;
    fabric: string;
    tone: string;
    hex: string;
  }[];
}

const INTERACTIVE_STYLES: StylePreset[] = [
  {
    id: "alfaiataria",
    label: "Alfaiataria Desconstruída",
    subtitle: "Equilíbrio entre estrutura clássica e leveza contemporânea.",
    occasion: "Trabalho Criativo & Reuniões",
    harmony: "Monocromático Quente & Neutros",
    palette: [
      { name: "Carvão", hex: "#181715" },
      { name: "Areia", hex: "#D8CFC2" },
      { name: "Terracota", hex: "#B85D3B" },
      { name: "Off-White", hex: "#FAF8F5" },
    ],
    pieces: [
      {
        slot: "Sobreposição",
        name: "Blazer Oversized em Linho Espanhol",
        fabric: "100% Linho • Corte Reto",
        tone: "Areia Natural",
        hex: "#D8CFC2",
      },
      {
        slot: "Base Superior",
        name: "Camiseta Gola Alta Canelada",
        fabric: "Algodão Pima Peruano",
        tone: "Preto Carvão",
        hex: "#181715",
      },
      {
        slot: "Inferior",
        name: "Calça Pantalona de Pregas Duplas",
        fabric: "Gabardine Leve",
        tone: "Off-White",
        hex: "#F2EDE4",
      },
      {
        slot: "Calçado & Acessório",
        name: "Mocassim Tratorado + Cinto Fivela Dourada",
        fabric: "Couro Legítimo",
        tone: "Terracota Escuro",
        hex: "#8C4327",
      },
    ],
  },
  {
    id: "minimalismo",
    label: "Minimalismo Noturno",
    subtitle: "Silhuetas alongadas e contraste sutil de texturas nobres.",
    occasion: "Jantares, Vernissages & Eventos",
    harmony: "Alto Contraste Sobrio",
    palette: [
      { name: "Ônix", hex: "#121212" },
      { name: "Chumbo", hex: "#3A3835" },
      { name: "Café", hex: "#4A3228" },
      { name: "Champanhe", hex: "#E6DEC8" },
    ],
    pieces: [
      {
        slot: "Sobreposição",
        name: "Casaco Longo Estruturado",
        fabric: "Lã Fria Italiana",
        tone: "Ônix Profundo",
        hex: "#121212",
      },
      {
        slot: "Base Superior",
        name: "Camisa de Seda com Botões Ocultos",
        fabric: "Seda Pura Acetinada",
        tone: "Champanhe",
        hex: "#E6DEC8",
      },
      {
        slot: "Inferior",
        name: "Calça Cigarrete Cintura Alta",
        fabric: "Crepe de Alfaiataria",
        tone: "Chumbo",
        hex: "#3A3835",
      },
      {
        slot: "Calçado & Acessório",
        name: "Bota Bico Fino + Bolsa Geométrica",
        fabric: "Couro Pelica",
        tone: "Café Expresso",
        hex: "#4A3228",
      },
    ],
  },
  {
    id: "urbano",
    label: "Essencial Fim de Semana",
    subtitle: "Conforto absoluto com curadoria estética para dias ao ar livre.",
    occasion: "Brunch, Viagens & Passeios",
    harmony: "Tons Terrosos & Botânicos",
    palette: [
      { name: "Oliva", hex: "#5A6650" },
      { name: "Cru", hex: "#EFECE6" },
      { name: "Camurça", hex: "#C29B77" },
      { name: "Denim", hex: "#2C3E50" },
    ],
    pieces: [
      {
        slot: "Sobreposição",
        name: "Jaqueta Utilitária com Bolsos Frontais",
        fabric: "Sarja Pesada Peletizada",
        tone: "Verde Oliva",
        hex: "#5A6650",
      },
      {
        slot: "Base Superior",
        name: "Tricô Trama Aberta Ponto Inglês",
        fabric: "Fio de Algodão Orgânico",
        tone: "Algodão Cru",
        hex: "#EFECE6",
      },
      {
        slot: "Inferior",
        name: "Jeans Vintage Lavagem Clássica",
        fabric: "Denim Selvagem 13oz",
        tone: "Azul Índigo",
        hex: "#2C3E50",
      },
      {
        slot: "Calçado & Acessório",
        name: "Tênis Retrô Solado Gum + Óculos Tartaruga",
        fabric: "Camurça & Lona",
        tone: "Caramelo Suave",
        hex: "#C29B77",
      },
    ],
  },
];

const CAPSULE_CARDS = [
  {
    code: "CAP—01",
    season: "Outono / Inverno",
    title: "Cápsula Essencial de Trabalho",
    piecesCount: "12 Peças",
    outfitsCount: "34 Combinações",
    description:
      "Construída sobre bases neutras com pontos focais em terracota e caramelo. Ideal para quem busca autoridade visual sem rigidez.",
    highlights: [
      "Trench Coat Impermeável Areia",
      "2 Blazers de Corte Arquitetônico",
      "3 Calças de Alfaiataria Fluida",
      "4 Bases em Algodão Pima e Seda",
    ],
  },
  {
    code: "CAP—02",
    season: "Todas as Estações",
    title: "Mala Inteligente de 4 Dias",
    piecesCount: "9 Peças",
    outfitsCount: "18 Combinações",
    description:
      "Planejada para caber apenas na bagagem de mão, garantindo looks distintos do café da manhã a um jantar especial sem amassar.",
    highlights: [
      "Conjunto Monocromático em Linho Misto",
      "Tricô Leve para Variação Térmica",
      "Jeans Reto Coringa Escuro",
      "Dupla de Calçados Versáteis",
    ],
  },
  {
    code: "CAP—03",
    season: "Primavera / Verão",
    title: "Minimalismo Solar & Fibras Naturais",
    piecesCount: "10 Peças",
    outfitsCount: "26 Combinações",
    description:
      "Foco total em respirabilidade, tecidos não sintéticos e silhuetas amplas que valorizam o movimento e o frescor.",
    highlights: [
      "Camisaria Oversized 100% Linho",
      "Bermuda de Alfaiataria com Pregas",
      "Regatas Estruturadas Caneladas",
      "Sandália Minimalista em Couro Cru",
    ],
  },
];

const FAQS = [
  {
    question: "Como funciona a organização do guarda-roupa no Kloset Styles?",
    answer:
      "Você cadastra suas peças principais informando categoria (superiores, inferiores, sobreposições ou calçados), cor predominante e tecido. A plataforma organiza tudo em uma grade editorial limpa e permite gerar combinações automáticas com um clique.",
  },
  {
    question: "Preciso tirar foto de todas as minhas roupas para começar?",
    answer:
      "Não! O Kloset Styles foi desenhado com fichas catalográficas de cor e tecido. Você pode cadastrar suas peças rapidamente apenas pelo nome, categoria e tom cromático, mantendo o visual do site sempre harmônico e sem fotos bagunçadas.",
  },
  {
    question: "O que é um Armário-Cápsula e como o site ajuda a criar um?",
    answer:
      "Um armário-cápsula é um conjunto reduzido de peças altamente combináveis entre si. No nosso painel você visualiza facilmente quais cores e categorias estão em excesso ou em falta, multiplicando seus looks sem precisar comprar mais roupas.",
  },
];

export default function HomePage() {
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentStyle = INTERACTIVE_STYLES[selectedStyleIndex];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF8F5] text-[#181715]">
      {/* Faixa Superior de Anúncio Editorial */}
      <div className="bg-[#181715] text-[#FAF8F5] text-[11px] uppercase tracking-[0.22em] py-2.5 px-4 text-center">
        Kloset Styles Atelier • Curadoria Digital de Guarda-Roupa &amp; Estilo Pessoal
      </div>

      {/* Cabeçalho Principal */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF8F5]/90 border-b border-[#E5DFD5]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-full bg-[#181715] text-[#FAF8F5] flex items-center justify-center font-serif italic text-xl transition-transform group-hover:scale-105">
              K
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-tight leading-none">
                Kloset <span className="italic text-[#B85D3B]">Styles</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E6A63] mt-1">
                Digital Wardrobe
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6E6A63]">
            <a href="#provador" className="hover:text-[#181715] transition-colors">
              Simulador de Looks
            </a>
            <a href="#metodo" className="hover:text-[#181715] transition-colors">
              O Método
            </a>
            <a href="#capsulas" className="hover:text-[#181715] transition-colors">
              Coleções-Cápsula
            </a>
            <a href="#faq" className="hover:text-[#181715] transition-colors">
              Dúvidas
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-[#181715] hover:text-[#B85D3B] transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/closet"
              className="px-5 py-2.5 rounded-full bg-[#181715] text-[#FAF8F5] text-sm font-medium hover:bg-[#B85D3B] transition-colors"
            >
              Abrir Meu Closet →
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-28 border-b border-[#E5DFD5]">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F2EDE4] border border-[#E5DFD5] text-xs uppercase tracking-widest text-[#6E6A63]">
                <span className="w-2 h-2 rounded-full bg-[#B85D3B]" />
                Arquitetura de Estilo Inteligente
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-[64px] leading-[1.06] tracking-tight">
                Redescubra o poder das peças que{" "}
                <span className="italic font-normal text-[#B85D3B]">
                  você já possui.
                </span>
              </h1>

              <p className="text-base md:text-lg text-[#6E6A63] max-w-xl leading-relaxed">
                Mais do que um aplicativo de organização: o{" "}
                <strong className="text-[#181715] font-medium">Kloset Styles</strong>{" "}
                transforma seu guarda-roupa em um acervo visual digno de revista,
                criando combinações instantâneas para cada ocasião do seu dia.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/closet"
                  className="px-8 py-4 rounded-full bg-[#181715] text-[#FAF8F5] text-sm font-medium tracking-wide hover:bg-[#B85D3B] transition-all"
                >
