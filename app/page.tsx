"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronDown,
  CloudSun,
  Palette,
  Shirt,
  Sparkles,
} from "lucide-react";

const INTERACTIVE_STYLES = [
  {
    id: "minimal",
    label: "Minimalista",
    season: "Outono / Inverno",
    occasion: "Trabalho e encontros",
    description:
      "Linhas limpas, peças versáteis e uma cartela sofisticada. Um visual elegante sem precisar de excessos.",
    pieces: [
      { category: "Terceira peça", name: "Blazer amplo", detail: "Alfaiataria", color: "#393044" },
      { category: "Parte de cima", name: "Camisa off-white", detail: "Algodão", color: "#F2EEE7" },
      { category: "Parte de baixo", name: "Calça reta", detail: "Corte clássico", color: "#776D83" },
      { category: "Calçado", name: "Mocassim", detail: "Couro café", color: "#795A4A" },
    ],
    palette: ["#393044", "#F2EEE7", "#776D83", "#B9A8C9"],
  },
  {
    id: "urbano",
    label: "Casual urbano",
    season: "Meia-estação",
    occasion: "Dia a dia e passeios",
    description:
      "Conforto com personalidade: sobreposições leves, jeans e texturas que deixam a rotina mais interessante.",
    pieces: [
      { category: "Terceira peça", name: "Cardigan de tricô", detail: "Trama macia", color: "#C8B8D9" },
      { category: "Parte de cima", name: "T-shirt básica", detail: "Malha de algodão", color: "#F8F6F8" },
      { category: "Parte de baixo", name: "Jeans reto", detail: "Denim azul", color: "#8EA2B8" },
      { category: "Calçado", name: "Tênis casual", detail: "Camurça clara", color: "#C9B9A8" },
    ],
    palette: ["#C8B8D9", "#F8F6F8", "#8EA2B8", "#C9B9A8"],
  },
  {
    id: "noite",
    label: "Noite especial",
    season: "Atemporal",
    occasion: "Jantares e eventos",
    description:
      "Uma composição marcante com contraste, movimento e detalhes que fazem o look parecer pensado nos mínimos pontos.",
    pieces: [
      { category: "Terceira peça", name: "Jaqueta estruturada", detail: "Acabamento fosco", color: "#25202D" },
      { category: "Parte de cima", name: "Blusa acetinada", detail: "Toque suave", color: "#A887C8" },
      { category: "Parte de baixo", name: "Calça pantalona", detail: "Caimento fluido", color: "#25202D" },
      { category: "Calçado", name: "Bota clássica", detail: "Preto intenso", color: "#302635" },
    ],
    palette: ["#25202D", "#A887C8", "#302635", "#E9E2ED"],
  },
];

const FAQS = [
  {
    q: "Como funciona o Kloset Styles?",
    a: "Você organiza as peças que já tem, informa suas preferências e usa o gerador para encontrar combinações levando em conta a ocasião e o clima.",
  },
  {
    q: "Preciso comprar roupas novas?",
    a: "Não. A proposta é aproveitar melhor o que já existe no seu guarda-roupa e descobrir combinações que talvez ainda não tenham passado pela sua cabeça.",
  },
  {
    q: "O que é a análise de subtom?",
    a: "É uma ferramenta de apoio para explorar cores que harmonizam com suas características e organizar uma paleta pessoal de referência.",
  },
];

const FEATURES = [
  {
    icon: Camera,
    number: "01",
    title: "Descubra sua paleta",
    description: "Explore seu subtom e encontre uma seleção de cores para usar como guia na hora de se vestir.",
  },
  {
    icon: Shirt,
    number: "02",
    title: "Organize seu closet",
    description: "Cadastre suas peças e transforme seu guarda-roupa em um acervo visual fácil de consultar.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Crie novas combinações",
    description: "Receba ideias de looks com o que você já tem, considerando ocasião e clima.",
  },
];

export default function HomePage() {
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const currentStyle = INTERACTIVE_STYLES[selectedStyleIndex];

  return (
    <div className="min-h-screen overflow-hidden bg-[#FCFAFF] text-[#261D35]">
      <div className="bg-[#281C39] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 sm:text-[11px]">
        Seu estilo começa com o que você já tem <span className="mx-2 text-[#CDB8F4]">✦</span> Conheça o Kloset Styles
      </div>

      <header className="sticky top-0 z-40 border-b border-[#ECE6F3] bg-[#FCFAFF]/90 backdrop-blur-xl">
        <div className="ks-container flex h-[76px] items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Kloset Styles - início">
            <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#6E43C8] font-serif text-[23px] italic text-white shadow-lg shadow-[#6E43C8]/20">K</span>
            <span className="font-serif text-[21px] font-semibold tracking-[-0.04em] text-[#2A2039]">
              Kloset <span className="italic text-[#7953C8]">Styles</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#776C87] md:flex">
            <a href="#como-funciona" className="transition-colors hover:text-[#6E43C8]">Como funciona</a>
            <a href="#inspiracao" className="transition-colors hover:text-[#6E43C8]">Inspiração</a>
            <a href="#duvidas" className="transition-colors hover:text-[#6E43C8]">Dúvidas</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/login" className="hidden px-2 py-2 text-[13px] font-semibold text-[#5E526F] transition-colors hover:text-[#6E43C8] sm:block">Entrar</Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-[#6E43C8] px-4 py-3 text-[12px] font-semibold text-white shadow-lg shadow-[#6E43C8]/20 transition-all hover:-translate-y-0.5 hover:bg-[#5934AC] sm:px-5 sm:text-[13px]">
              Meu closet <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="ks-hero relative">
          <div className="ks-container relative grid min-h-[640px] items-center gap-14 py-16 md:grid-cols-[1.02fr_0.98fr] md:py-20 lg:gap-20">
            <div className="relative z-10 max-w-[620px]">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E5D9F4] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7655B5] shadow-sm">
                <Sparkles size={13} /> Seu guarda-roupa, de um jeito novo
              </div>
              <h1 className="max-w-[650px] font-serif text-[clamp(3.4rem,7vw,6.1rem)] leading-[0.99] tracking-[-0.055em] text-[#2A2039]">
                Vista-se de <span className="ks-heading-accent italic">você.</span>
                <br />Todos os dias.
              </h1>
              <p className="mt-7 max-w-[490px] text-[15px] leading-8 text-[#766B84] sm:text-[17px]">
                Seu estilo, suas peças e novas possibilidades. Organize seu closet, descubra suas cores e encontre combinações que fazem sentido para cada ocasião.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/dashboard" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6E43C8] px-7 py-4 text-[13px] font-semibold text-white shadow-xl shadow-[#6E43C8]/20 transition-all hover:-translate-y-1 hover:bg-[#5934AC]">
                  Começar agora <ArrowRight size={16} />
                </Link>
                <a href="#como-funciona" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DED3EB] bg-white/70 px-7 py-4 text-[13px] font-semibold text-[#514461] transition-colors hover:border-[#A98ED5] hover:bg-white">
                  Conhecer a plataforma
                </a>
              </div>
              <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#EAE3F1] pt-6 text-[11px] font-medium text-[#8B8097]">
                <span className="inline-flex items-center gap-2"><Check size={14} className="text-[#6E43C8]" /> Organize o que já tem</span>
                <span className="inline-flex items-center gap-2"><Check size={14} className="text-[#6E43C8]" /> Explore sua paleta</span>
                <span className="inline-flex items-center gap-2"><Check size={14} className="text-[#6E43C8]" /> Monte looks com praticidade</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[460px]">
              <div className="ks-orbit ks-orbit-one" />
              <div className="ks-orbit ks-orbit-two" />
              <div className="ks-hero-photo-wrap">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
                  alt="Pessoa em look editorial de moda"
                />
              </div>
              <div className="ks-float-card ks-float-top">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A8EAA]">Paleta do dia</p>
                <div className="mt-3 flex gap-2">
                  {["#6E43C8", "#C8B8D9", "#F2EEE7", "#393044"].map((c) => (
                    <span key={c} className="h-6 w-6 rounded-full border border-black/5" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div className="ks-float-card ks-float-bottom">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A8EAA]">Sugestão rápida</p>
                <p className="mt-2 font-serif text-[16px] text-[#2A2039]">Look casual + leve</p>
                <p className="mt-1 text-[11px] text-[#857A91]">Ideal para um dia ameno</p>
              </div>
            </div>
          </div>
          <div className="ks-hero-bottom-line" />
        </section>

        <section id="como-funciona" className="py-20 md:py-24">
          <div className="ks-container">
            <div className="mx-auto max-w-[640px] text-center">
              <p className="ks-kicker">Como funciona</p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,2.8rem)] tracking-[-0.04em] text-[#2A2039]">
                Três passos para um closet mais inteligente
              </h2>
              <p className="mt-4 text-[14px] leading-7 text-[#766B84]">
                Sem pressão de comprar mais. O foco é organizar, combinar e se vestir com mais clareza todos os dias.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.number} className="ks-feature-card">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1EAFB] text-[#6E43C8]">
                        <Icon size={20} strokeWidth={1.8} />
                      </span>
                      <span className="font-serif text-[28px] italic text-[#D0C0E4]">{feature.number}</span>
                    </div>
                    <h3 className="mt-8 font-serif text-[22px] tracking-[-0.03em] text-[#2A2039]">{feature.title}</h3>
                    <p className="mt-3 text-[13px] leading-7 text-[#7C718A]">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="inspiracao" className="ks-look-section py-20 md:py-24">
          <div className="ks-container space-y-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="ks-kicker">Inspiração</p>
                <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,2.7rem)] tracking-[-0.04em] text-[#2A2039]">
                  Explore atmosferas de estilo
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {INTERACTIVE_STYLES.map((style, index) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyleIndex(index)}
                    className={`rounded-full px-5 py-2.5 text-[12px] font-semibold transition-all ${
                      selectedStyleIndex === index
                        ? "bg-[#6E43C8] text-white shadow-md shadow-[#6E43C8]/20"
                        : "border border-[#E5D9F4] bg-white text-[#6B6179] hover:border-[#B9A3D9]"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-8 rounded-[28px] border border-[#EAE3F1] bg-white p-6 md:grid-cols-12 md:p-8">
              <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#9A8EAA]">
                    <span>{currentStyle.season}</span>
                    <span>·</span>
                    <span>{currentStyle.occasion}</span>
                  </div>
                  <h3 className="font-serif text-[32px] tracking-[-0.03em] text-[#2A2039]">{currentStyle.label}</h3>
                  <p className="text-[13px] leading-7 text-[#7C718A]">{currentStyle.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[#F0EBF5] pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A8EAA]">Cartela</span>
                  <div className="flex gap-2">
                    {currentStyle.palette.map((color) => (
                      <span key={color} className="h-7 w-7 rounded-full border border-black/10" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 grid gap-4 sm:grid-cols-2">
                {currentStyle.pieces.map((piece) => (
                  <div key={piece.name} className="ks-piece-card">
                    <div className="ks-piece-swatch" style={{ backgroundColor: piece.color }}>
                      <span className="relative z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#5E526F]">
                        {piece.category}
                      </span>
                    </div>
                    <div className="p-3">
                      <h4 className="text-[14px] font-semibold text-[#2A2039]">{piece.name}</h4>
                      <p className="mt-1 text-[11px] text-[#8B8097]">{piece.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="duvidas" className="py-20 md:py-24">
          <div className="ks-container max-w-3xl">
            <div className="text-center">
              <p className="ks-kicker">Dúvidas</p>
              <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,2.6rem)] tracking-[-0.04em] text-[#2A2039]">Perguntas frequentes</h2>
            </div>
            <div className="mt-10 space-y-3">
              {FAQS.map((item, idx) => (
                <div key={item.q} className="overflow-hidden rounded-2xl border border-[#EAE3F1] bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[14px] font-semibold text-[#2A2039]"
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={18} className={`shrink-0 text-[#9A8EAA] transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-[#F0EBF5] px-6 pb-5 pt-3 text-[13px] leading-7 text-[#7C718A]">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-24">
          <div className="ks-container">
            <div className="ks-cta-panel relative overflow-hidden rounded-[32px] px-8 py-14 text-center text-white md:px-16 md:py-16">
              <div className="ks-cta-orb ks-cta-orb-one" />
              <div className="ks-cta-orb ks-cta-orb-two" />
              <span className="ks-cta-star">✦</span>
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Comece hoje</p>
                <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] tracking-[-0.04em]">
                  Seu próximo look pode nascer do que você já tem.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-[14px] leading-7 text-white/75">
                  Crie sua conta, organize o closet e experimente combinações com mais leveza.
                </p>
                <Link href="/cadastro" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[13px] font-bold text-[#5936A0] transition-all hover:-translate-y-0.5 hover:bg-[#F4EEFB]">
                  Criar conta grátis <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#EAE3F1] bg-white py-10">
        <div className="ks-container flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-[#6E43C8] font-serif text-[18px] italic text-white">K</span>
            <span className="font-serif text-[17px] font-semibold text-[#2A2039]">
              Kloset <span className="italic text-[#7953C8]">Styles</span>
            </span>
          </div>
          <p className="text-[12px] text-[#9A8EAA]">© {new Date().getFullYear()} Kloset Styles. Seu guarda-roupa, suas soluções.</p>
          <Link href="/login" className="text-[12px] font-semibold text-[#6E43C8] hover:text-[#4F2E9B]">
            Entrar <ArrowUpRight size={13} className="ml-1 inline" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
