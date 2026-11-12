"use client";

import { useState } from "react";
import Link from "next/link";

const INTERACTIVE_STYLES = [
  {
    id: "minimal",
    label: "Minimalista Editorial",
    season: "Outono / Inverno",
    occasion: "Trabalho Criativo & Reuniões",
    description:
      "Cortes retos, tecidos estruturados e ausência de excessos. A elegância vem do contraste entre lã fria, algodão egípcio e couro fosco.",
    pieces: [
      { category: "Terceira Peça", name: "Blazer Oversized Carvão", fabric: "Lã Fria Italiana", color: "#23211E" },
      { category: "Base Superior", name: "Camisa Poplin Off-White", fabric: "100% Algodão", color: "#F5F2EB" },
      { category: "Parte Inferior", name: "Calça Alfaiataria Pregas", fabric: "Crepe Estruturado", color: "#3A3632" },
      { category: "Calçado & Acessório", name: "Mocassim Tratorado + Cinto", fabric: "Couro Café", color: "#4A3525" },
    ],
    palette: ["#23211E", "#F5F2EB", "#3A3632", "#B85D3B"],
  },
  {
    id: "urbano",
    label: "Casual Urbano",
    season: "Meia-Estação",
    occasion: "Dia a Dia & Café na Cidade",
    description:
      "Sobreposições leves e práticas para rotinas dinâmicas. Une o conforto do denim vintage com a sofisticação do tricô texturizado.",
    pieces: [
      { category: "Terceira Peça", name: "Cardigan Tricô Ponto Grosso", fabric: "Algodão & Linho", color: "#D6CFC3" },
      { category: "Base Superior", name: "T-Shirt Gola Alta Canelada", fabric: "Malha Premium", color: "#FAF8F5" },
      { category: "Parte Inferior", name: "Jeans Reto Lavagem Clara", fabric: "Denim 13oz", color: "#7C8B99" },
      { category: "Calçado & Acessório", name: "Sneaker Retrô Camurça", fabric: "Camurça Areia", color: "#C8B8A6" },
    ],
    palette: ["#D6CFC3", "#FAF8F5", "#7C8B99", "#C8B8A6"],
  },
  {
    id: "noite",
    label: "Noite & Galeria",
    season: "Atemporal",
    occasion: "Jantares & Eventos Noturnos",
    description:
      "Jogos de luz e sombra em paleta escura com ponto focal em terracota queimado. Silhueta alongada e acabamento acetinado.",
    pieces: [
      { category: "Terceira Peça", name: "Trench Coat Estruturado", fabric: "Gabardine Impermeável", color: "#181715" },
      { category: "Base Superior", name: "Blusa Gola Degagê Terracota", fabric: "Seda Acetinada", color: "#B85D3B" },
      { category: "Parte Inferior", name: "Calça Pantalona Cintura Alta", fabric: "Alfaiataria Fluida", color: "#181715" },
      { category: "Calçado & Acessório", name: "Bota Bico Fino + Clutch", fabric: "Couro Envernizado", color: "#2C221E" },
    ],
    palette: ["#181715", "#B85D3B", "#2C221E", "#E5DFD5"],
  },
];

const FAQS = [
  {
    q: "Como funciona a organização do meu guarda-roupa?",
    a: "Você cadastra suas peças por categoria (partes de cima, baixo, terceiras peças e calçados), define a cor predominante e cria combinações prontas para qualquer ocasião.",
  },
  {
    q: "O Kloset Styles sugere combinações automaticamente?",
    a: "Sim! Dentro do seu closet digital você conta com o Gerador de Looks, que cruza suas peças disponíveis para sugerir composições equilibradas na hora.",
  },
  {
    q: "O que é um armário cápsula?",
    a: "É uma seleção inteligente de peças versáteis que combinam entre si, permitindo multiplicar seus looks sem precisar comprar roupas novas toda semana.",
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
            <span className="w-9 h-9 rounded-full bg-[#181715] text-[#FAF8F5] flex items-center justify-center font-serif italic text-lg transition-transform group-hover:scale-105">
              K
            </span>
            <span className="font-serif text-2xl tracking-tight font-medium">
              Kloset <span className="italic text-[#B85D3B]">Styles</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#6E6A63]">
            <a href="#provador" className="hover:text-[#181715] transition-colors">
              Provador Interativo
            </a>
            <a href="#metodo" className="hover:text-[#181715] transition-colors">
              O Método
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
              href="/dashboard"
              className="px-5 py-2.5 rounded-full bg-[#181715] text-[#FAF8F5] text-sm font-medium hover:bg-[#B85D3B] transition-colors shadow-sm"
            >
              Meu Closet →
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2EDE4] border border-[#E5DFD5] text-xs uppercase tracking-widest text-[#6E6A63]">
                <span className="w-2 h-2 rounded-full bg-[#B85D3B]" />
                Seu Guarda-Roupa Digital Inteligente
              </div>

              <h1 className="font-serif text-5xl md:text-7xl leading-[1.06] tracking-tight">
                Redescubra a arte de vestir o que{" "}
                <span className="italic font-normal text-[#B85D3B]">
                  já é seu.
                </span>
              </h1>

              <p className="text-lg text-[#6E6A63] max-w-xl leading-relaxed">
                Transforme seu armário em um acervo visual organizado. Crie cápsulas
                por estação, planeje combinações em segundos e construa uma
                identidade autêntica todos os dias.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="px-8 py-4 rounded-full bg-[#181715] text-[#FAF8F5] text-sm font-medium tracking-wide hover:bg-[#B85D3B] transition-all shadow-md"
                >
                  Começar meu Closet Agora
                </Link>
                <a
                  href="#provador"
                  className="px-8 py-4 rounded-full border border-[#D6CFC3] text-sm font-medium hover:border-[#181715] transition-colors"
                >
                  Testar Provador de Estilo
                </a>
              </div>
            </div>

            {/* Card Editorial em Destaque */}
            <div className="md:col-span-5">
              <div className="rounded-3xl bg-[#F2EDE4] border border-[#E5DFD5] p-7 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-[#6E6A63]">
                      Curadoria da Semana
                    </p>
                    <h2 className="font-serif text-2xl mt-1">
                      Cápsula Essencial #01
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E5DFD5] text-xs font-medium text-[#B85D3B]">
                    12 Peças • 36 Looks
                  </span>
                </div>

                <div className="space-y-3">
                  {currentStyle.pieces.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5]"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-[#6E6A63]">{item.category}</p>
                        </div>
                      </div>
                      <span className="text-xs text-[#6E6A63]">{item.fabric}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-[#6E6A63]">
                  <span>Paleta Harmônica</span>
                  <div className="flex items-center gap-1.5">
                    {currentStyle.palette.map((hex, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-black/10"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Provador Interativo */}
        <section id="provador" className="py-20 bg-[#F2EDE4]/70 border-y border-[#E5DFD5]">
          <div className="max-w-6xl mx-auto px-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#B85D3B] font-semibold">
                  Simulador de Cápsula
                </p>
                <h2 className="font-serif text-3xl md:text-4xl mt-2">
                  Explore atmosferas de estilo
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {INTERACTIVE_STYLES.map((style, index) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyleIndex(index)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      selectedStyleIndex === index
                        ? "bg-[#181715] text-[#FAF8F5] shadow-sm"
                        : "bg-[#FAF8F5] text-[#6E6A63] border border-[#E5DFD5] hover:text-[#181715]"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 bg-[#FAF8F5] rounded-3xl p-8 border border-[#E5DFD5]">
              <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#6E6A63] uppercase tracking-wider">
                    <span>{currentStyle.season}</span>
                    <span>•</span>
                    <span>{currentStyle.occasion}</span>
                  </div>
                  <h3 className="font-serif text-3xl">{currentStyle.label}</h3>
                  <p className="text-[#6E6A63] text-sm leading-relaxed">
                    {currentStyle.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DFD5] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#6E6A63]">
                    Cartela de Cores
                  </span>
                  <div className="flex gap-2">
                    {currentStyle.palette.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-7 h-7 rounded-full border border-black/15"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
                {currentStyle.pieces.map((piece, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#F2EDE4]/60 border border-[#E5DFD5] flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-widest text-[#6E6A63]">
                        {piece.category}
                      </span>
                      <span
                        className="w-4 h-4 rounded-full border border-black/10"
                        style={{ backgroundColor: piece.color }}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">{piece.name}</h4>
                      <p className="text-xs text-[#6E6A63] mt-1">{piece.fabric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Seção Método em 3 Pilares */}
        <section id="metodo" className="max-w-6xl mx-auto px-6 py-20 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#B85D3B] font-semibold">
              Por que usar o Kloset Styles
            </p>
            <h2 className="font-serif text-3xl md:text-4xl">
              Menos tempo decidindo, mais presença no seu dia
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Catalogação Visual",
                desc: "Registre suas peças por categoria, tecido e estação para visualizar todo o seu acervo num só lugar.",
              },
              {
                step: "02",
                title: "Combinações Inteligentes",
                desc: "Monte looks completos para trabalho, lazer ou viagens sem precisar tirar tudo do cabide.",
              },
              {
                step: "03",
                title: "Consumo Consciente",
                desc: "Identifique o que realmente falta no seu armário e evite compras por impulso que ficam paradas.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-7 rounded-3xl bg-[#F2EDE4]/50 border border-[#E5DFD5] space-y-4"
              >
                <span className="font-serif italic text-3xl text-[#B85D3B]">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="text-sm text-[#6E6A63] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Seção FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-6 pb-24 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl">Perguntas Frequentes</h2>
            <p className="text-sm text-[#6E6A63]">
              Tudo o que você precisa saber sobre seu guarda-roupa digital.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E5DFD5] bg-[#F2EDE4]/40 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-medium text-sm"
                >
                  <span>{item.q}</span>
                  <span className="text-[#B85D3B] text-lg">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-[#6E6A63] leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Rodapé Editorial */}
      <footer className="border-t border-[#E5DFD5] bg-[#F2EDE4]/40 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6A63]">
          <p className="font-serif text-base text-[#181715]">
            Kloset <span className="italic text-[#B85D3B]">Styles</span>
          </p>
          <p>© {new Date().getFullYear()} Kloset Styles. Curadoria de Guarda-Roupa Digital.</p>
        </div>
      </footer>
    </div>
  );
}
