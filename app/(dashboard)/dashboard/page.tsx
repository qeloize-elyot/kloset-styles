import Link from "next/link";
import { ArrowUpRight, Camera, CloudSun, Shirt, Sparkles } from "lucide-react";

const actions = [
  {
    href: "/analise",
    number: "01",
    icon: Camera,
    title: "Descubra suas cores",
    text: "Explore seu subtom e crie uma paleta para orientar suas escolhas.",
    label: "Começar análise",
  },
  {
    href: "/guarda-roupa",
    number: "02",
    icon: Shirt,
    title: "Organize seu closet",
    text: "Adicione suas roupas e tenha tudo organizado em um só lugar.",
    label: "Ver meu closet",
  },
  {
    href: "/looks",
    number: "03",
    icon: Sparkles,
    title: "Monte novos looks",
    text: "Encontre combinações para diferentes ocasiões e condições de clima.",
    label: "Criar combinação",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-9 pb-20 sm:pb-4">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7953C8]">Seu espaço pessoal</p>
          <h1 className="mt-3 font-serif text-[36px] leading-tight tracking-[-0.045em] text-[#2A2039] sm:text-[46px]">Seu closet, <span className="italic text-[#7953C8]">suas possibilidades.</span></h1>
          <p className="mt-3 max-w-[540px] text-[13px] leading-7 text-[#81758F]">Tudo começa com as peças que você já tem. Organize, experimente e encontre novas formas de expressar seu estilo.</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E6DDF0] bg-white px-4 py-2 text-[10px] font-semibold text-[#746780] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#8C6AC5]" /> Seu espaço de estilo
        </div>
      </div>

      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#302044] via-[#4A3270] to-[#7650B4] p-7 text-white shadow-[0_28px_70px_-48px_rgba(67,43,104,0.75)] sm:p-10">
        <div className="relative z-10 max-w-[600px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/80"><Sparkles size={12} /> Comece por aqui</div>
          <h2 className="mt-5 max-w-[570px] font-serif text-3xl leading-[1.1] tracking-[-0.035em] sm:text-4xl">Um guarda-roupa mais inteligente começa com uma boa organização.</h2>
          <p className="mt-4 max-w-[440px] text-[12px] leading-7 text-white/70">Cadastre suas primeiras peças e abra espaço para combinações que acompanham sua rotina.</p>
          <Link href="/guarda-roupa" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[11px] font-bold text-[#5936A0] transition-all hover:-translate-y-0.5 hover:bg-[#F4EEFB]">Adicionar minhas peças <ArrowUpRight size={14} /></Link>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-24 h-[360px] w-[360px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-1 top-[-40px] h-[250px] w-[250px] rounded-full border border-dashed border-white/15" />
        <div className="pointer-events-none absolute bottom-[-145px] right-[17%] h-[280px] w-[280px] rounded-full bg-white/[0.06] blur-2xl" />
        <span className="pointer-events-none absolute right-[10%] top-[20%] hidden font-serif text-[100px] italic leading-none text-white/[0.12] lg:block">K</span>
      </section>

      <section>
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#9A8EAA]">Seu próximo passo</p>
            <h2 className="mt-2 font-serif text-[27px] tracking-[-0.035em] text-[#302440]">O que vamos fazer hoje?</h2>
          </div>
          <p className="text-[11px] text-[#94899F]">Escolha por onde começar</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} className="group rounded-[23px] border border-[#EAE3F1] bg-white p-6 shadow-[0_14px_35px_-32px_rgba(51,31,79,0.45)] transition-all hover:-translate-y-1 hover:border-[#D6C4EC] hover:shadow-[0_20px_40px_-30px_rgba(89,56,145,0.35)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2ECFA] text-[#7045C5] transition-transform group-hover:scale-105"><Icon size={19} strokeWidth={1.8} /></span>
                  <span className="font-serif text-[23px] italic text-[#C5B4DC]">{action.number}</span>
                </div>
                <h3 className="mt-6 font-serif text-[21px] tracking-[-0.025em] text-[#332646]">{action.title}</h3>
                <p className="mt-2 min-h-[58px] text-[11px] leading-6 text-[#857A91]">{action.text}</p>
                <div className="mt-5 flex items-center justify-between border-t border-[#F0EBF5] pt-4 text-[10px] font-bold text-[#7045C5]">
                  {action.label}<ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[23px] border border-dashed border-[#D9CDE8] bg-[#F7F3FB] p-7 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#7650C3] shadow-sm"><Shirt size={19} /></div>
            <div>
              <h3 className="font-serif text-[21px] text-[#352748]">Seu closet está esperando por você</h3>
              <p className="mt-2 max-w-[470px] text-[11px] leading-6 text-[#81758F]">Quando você adicionar suas primeiras peças, elas vão aparecer aqui para facilitar a organização e a criação de looks.</p>
              <Link href="/guarda-roupa" className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold text-[#7045C5] hover:text-[#4F2E9B]">Adicionar primeira peça <ArrowUpRight size={13} /></Link>
            </div>
          </div>
        </div>
        <div className="rounded-[23px] border border-[#EAE3F1] bg-white p-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F2ECFA] text-[#7650C3]"><CloudSun size={18} /></div>
          <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#9A8EAA]">Uma dica para começar</p>
          <p className="mt-2 font-serif text-[19px] leading-snug text-[#352748]">Separe primeiro as peças que você mais usa.</p>
          <p className="mt-2 text-[11px] leading-6 text-[#857A91]">Elas ajudam a criar uma base realista para suas próximas combinações.</p>
        </div>
      </section>
    </div>
  );
}
