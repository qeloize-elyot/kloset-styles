"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Heart, UserRound, ShoppingBag,
  Sun, Cloud, CloudRain, Snowflake, Shirt, Sparkles, Palette,
  Moon, SunMedium, Menu, X, Wind
} from "lucide-react";

const categories = [
  ["Roupas", "photo-1483985988355-763728e1935b"],
  ["Acessórios", "photo-1584917865442-de89df76afd3"],
  ["Calçados", "photo-1543163521-1bf539c55dd2"],
  ["Casacos", "photo-1548624149-f2b6a9c4b6c1"],
  ["Blusas", "photo-1564257577-7c7b4f6c6f11"],
  ["Calças", "photo-1541099649105-f69ad21f3246"],
  ["Saias", "photo-1583496661160-fb5886a0aaaa"],
  ["Joias", "photo-1611652022419-a9419f74343d"],
  ["Beleza", "photo-1529139574466-a303027c1d8b"],
];

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [weather, setWeather] = useState("Nublado");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("kloset-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.ksTheme = theme;
    window.localStorage.setItem("kloset-theme", theme);
  }, [theme]);

  return (
  <div className="ks-home min-h-screen overflow-hidden">
    <div className="ks-topline"><i>✦</i><span>Seu estilo começa com o que você já tem</span><i>✦</i></div>
    <header className="ks-header"><div className="ks-container ks-header-inner">
      <Link href="/" className="ks-logo"><BrandMark/><span className="ks-logo-word">Kloset<span>Styles</span></span></Link>
      <nav className="ks-nav"><a href="#categorias">Categorias</a><a href="#looks">Looks</a><a href="#sobre">Sobre</a><a href="#clima">Clima</a></nav>
      <div className="ks-header-actions">
        <button type="button" className="ks-theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Alternar tema">{theme === "light" ? <Moon size={16}/> : <SunMedium size={16}/>}</button>
        <Link href="/login" className="ks-icon-button" aria-label="Entrar"><UserRound size={18}/></Link>
        <Link href="/dashboard" className="ks-button ks-button-dark">Meu closet <ArrowUpRight size={14}/></Link>
      </div>
    </div></header>
    <main>
      <section className="ks-hero"><div className="ks-container ks-hero-grid">
        <div className="ks-hero-copy">
          <p className="ks-eyebrow">Guarda-roupa digital</p>
          <h1>Vista-se de <em>você.</em></h1>
          <p className="ks-hero-subtitle">Todos os dias.</p>
          <p className="ks-hero-description">Organize suas peças, descubra suas cores e monte looks com o que você já tem.</p>
          <div className="ks-hero-buttons">
            <Link href="/cadastro" className="ks-button ks-button-soft">Começar agora <ArrowRight size={16}/></Link>
            <a href="#looks" className="ks-button ks-button-outline">Ver looks</a>
          </div>
        </div>
        <div className="ks-hero-visual">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80" alt="Look editorial"/>
        </div>
      </div></section>
    </main>
    <footer className="ks-footer"><div className="ks-container ks-footer-inner"><Link href="/" className="ks-logo"><BrandMark/><span className="ks-logo-word">Kloset<span>Styles</span></span></Link><p>© {new Date().getFullYear()} Kloset Styles</p><div><Link href="/perfil">Minha conta</Link><Link href="/cadastro">Criar conta</Link></div></div></footer>
  </div>
  );
}

function BrandMark({ light = false }: { light?: boolean }) {
  return <span className={`ks-brand-mark ${light ? "ks-brand-mark-light" : ""}`} aria-hidden>
    <svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="currentColor" opacity=".15"/><path d="M14 34V14h6.2c3.6 0 5.8 1.9 5.8 4.8 0 2.1-1.1 3.6-2.9 4.3 2.2.7 3.5 2.4 3.5 4.8 0 3.2-2.4 5.1-6.2 5.1H14zm4.1-12.2h1.8c1.7 0 2.7-.8 2.7-2.1s-1-2-2.6-2H18.1v4.1zm0 8.4h2.1c1.9 0 3-.9 3-2.3s-1.1-2.2-3-2.2h-2.1v4.5z" fill="currentColor"/></svg>
  </span>;
}
