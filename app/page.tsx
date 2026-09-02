"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

/* ------------------------------------------------------------------ */
/*  Setup notes (read me):                                             */
/*  1) Add Font Awesome + Google Fonts to app/layout.tsx <head>:       */
/*     <link rel="stylesheet"                                          */
/*       href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/    */
/*             6.5.1/css/all.min.css" />                               */
/*     <link href="https://fonts.googleapis.com/css2?family=Kanit:     */
/*       wght@500;600;700;800&family=Inter:wght@400;500;600            */
/*       &display=swap" rel="stylesheet" />                            */
/*  2) Add `scroll-smooth` to the <html> tag in layout.tsx.            */
/*  3) This file is a single self-contained page component — drop it   */
/*     at app/page.tsx (or app/sama-shop/page.tsx).                    */
/* ------------------------------------------------------------------ */

type Accent = {
  accent: string;
  accentSoft: string;
};

const heading = "font-['Kanit',sans-serif] font-bold";
const kanit = "font-['Kanit',sans-serif]";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Top Up", href: "#categories" },
  { label: "Gift Cards", href: "#products" },
  { label: "Promotions", href: "#promotions" },
  { label: "Contact", href: "#contact" },
  { label: "Cart", href: "/cart" },
  { label: "Menu", href: "/menu" },
];

const categories: (Accent & { icon: string; name: string; sub: string })[] = [
  { icon: "fa-cube", name: "Roblox", sub: "Top up Robux", accent: "#16a34a", accentSoft: "#dcfce7" },
  { icon: "fa-fire", name: "Free Fire", sub: "Top up Diamonds", accent: "#4f46e5", accentSoft: "#eef0fe" },
  { icon: "fa-crosshairs", name: "Valorant", sub: "Top up VP", accent: "#0891b2", accentSoft: "#cffafe" },
  { icon: "fa-parachute-box", name: "PUBG Mobile", sub: "Top up UC", accent: "#2563eb", accentSoft: "#dbeafe" },
  { icon: "fa-hand-fist", name: "Mobile Legends", sub: "Top up Diamonds", accent: "#d97706", accentSoft: "#fef3c7" },
  { icon: "fa-wand-magic-sparkles", name: "Genshin Impact", sub: "Top up Genesis Crystals", accent: "#db2777", accentSoft: "#fce7f3" },
];

const products: (Accent & { icon: string; name: string; pkg: string; price: string })[] = [
  { icon: "fa-fire", name: "Free Fire 100 Diamonds", pkg: "Top up directly via player ID", price: "$1.79", accent: "#4f46e5", accentSoft: "#eef0fe" },
  { icon: "fa-chess-knight", name: "RoV 300 Coupons", pkg: "Buy heroes and skins", price: "$5.39", accent: "#9333ea", accentSoft: "#f3e8ff" },
  { icon: "fa-parachute-box", name: "PUBG Mobile 60 UC", pkg: "Top up directly via player ID", price: "$1.05", accent: "#2563eb", accentSoft: "#dbeafe" },
  { icon: "fa-wand-magic-sparkles", name: "Genshin Impact 60 Genesis Crystals", pkg: "Top up via UID", price: "$1.05", accent: "#db2777", accentSoft: "#fce7f3" },
  { icon: "fa-hand-fist", name: "Mobile Legends 50 Diamonds", pkg: "Top up directly via player ID", price: "$0.89", accent: "#d97706", accentSoft: "#fef3c7" },
  { icon: "fa-crosshairs", name: "Valorant 475 Points", pkg: "Top up via Riot ID", price: "$4.79", accent: "#0891b2", accentSoft: "#cffafe" },
  { icon: "fa-cube", name: "Roblox 400 Robux", pkg: "Top up via username", price: "$4.49", accent: "#16a34a", accentSoft: "#dcfce7" },
  { icon: "fa-wallet", name: "$9 Mobile Top-up Card", pkg: "Works with any carrier", price: "$9.00", accent: "#475569", accentSoft: "#e2e8f0" },
];

const promotions: (Accent & { icon: string; title: string; desc: string; cta: string })[] = [
  { icon: "fa-percent", title: "10% Off Instantly", desc: "Top up $15 or more, use code SAMA10 to get an instant discount at checkout", cta: "Use code now", accent: "#4f46e5", accentSoft: "#eef0fe" },
  { icon: "fa-gift", title: "Top Up, Get a Bonus", desc: "Top up $30 or more and get an instant $1.50 bonus credited automatically", cta: "See details", accent: "#16a34a", accentSoft: "#dcfce7" },
  { icon: "fa-user-plus", title: "New Member Deal", desc: "Sign up today and get $0.60 off instantly on your first top-up", cta: "Sign up now", accent: "#2563eb", accentSoft: "#dbeafe" },
];

const whyUs: (Accent & { icon: string; title: string; desc: string })[] = [
  { icon: "fa-bolt", title: "Instant Top-Up", desc: "Automated top-up system credits your account within 10 seconds, no need to wait for an admin", accent: "#4f46e5", accentSoft: "#eef0fe" },
  { icon: "fa-shield-halved", title: "100% Secure", desc: "Payments run on internationally standard, fully encrypted systems, so every transaction is safe", accent: "#16a34a", accentSoft: "#dcfce7" },
  { icon: "fa-headset", title: "24/7 Support", desc: "Our team is ready to help every day, no days off, whenever you need us", accent: "#2563eb", accentSoft: "#dbeafe" },
];

const reviews = [
  { initials: "TN", name: "Tanakorn S.", tag: "Free Fire top-up", text: "Super fast — I hit buy and the diamonds landed instantly. Been using this for 2 years and never once let down." },
  { initials: "PC", name: "Pimchanok W.", tag: "RoV top-up", text: "Better prices than anywhere else, support replies fast, and the service is genuinely great. Highly recommend." },
  { initials: "KS", name: "Kittisak A.", tag: "PUBG Mobile top-up", text: "Safe and reliable. I top up UC every month and have never had a single issue." },
];

function CategoryCard({ icon, name, sub, accent, accentSoft }: (typeof categories)[number]) {
  return (
    <div
      className="cursor-pointer rounded-[14px] border border-[#e7e9ee] bg-white p-6 px-3.5 text-center shadow-[0_1px_2px_rgba(16,24,40,.04),0_1px_3px_rgba(16,24,40,.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(16,24,40,.08),0_2px_6px_rgba(16,24,40,.05)]"
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e7e9ee")}
    >
      <div
        className="mx-auto mb-3 flex h-[50px] w-[50px] items-center justify-center rounded-[13px] text-[19px]"
        style={{ background: accentSoft, color: accent }}
      >
        <i className={`fa-solid ${icon}`} />
      </div>
      <div className={`${kanit} mb-0.5 text-sm font-semibold`}>{name}</div>
      <div className="text-[11.5px] text-[#9aa1ac]">{sub}</div>
    </div>
  );
}

function ProductCard({ icon, name, pkg, price, accent, accentSoft }: (typeof products)[number]) {
  return (
    <div className="flex flex-col gap-4 rounded-[14px] border border-[#e7e9ee] bg-white p-[18px] shadow-[0_1px_2px_rgba(16,24,40,.04),0_1px_3px_rgba(16,24,40,.06)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(16,24,40,.08),0_2px_6px_rgba(16,24,40,.05)]">
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px] text-base"
          style={{ background: accentSoft, color: accent }}
        >
          <i className={`fa-solid ${icon}`} />
        </div>
        <div>
          <div className={`${kanit} text-[13.5px] font-semibold leading-tight`}>{name}</div>
          <div className="mt-0.5 text-[11.5px] text-[#9aa1ac]">{pkg}</div>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className={`${kanit} text-base font-bold`}>{price}</div>
        <button
          aria-label="Buy now"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f8fa] text-[13px] text-[#6b7280] transition-colors hover:bg-indigo-600 hover:text-white"
        >
          <i className="fa-solid fa-cart-plus" />
        </button>
      </div>
    </div>
  );
}

function PromoCard({ icon, title, desc, cta, accent, accentSoft }: (typeof promotions)[number]) {
  return (
    <div
      className="flex flex-col gap-3 rounded-[14px] border border-[#e7e9ee] bg-white p-[26px_22px] shadow-[0_1px_2px_rgba(16,24,40,.04),0_1px_3px_rgba(16,24,40,.06)]"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-[11px] text-base"
        style={{ background: accentSoft, color: accent }}
      >
        <i className={`fa-solid ${icon}`} />
      </div>
      <h3 className={`${heading} text-lg`}>{title}</h3>
      <p className="text-[13px] leading-relaxed text-[#6b7280]">{desc}</p>
      <div className="flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: accent }}>
        {cta} <i className="fa-solid fa-arrow-right" />
      </div>
    </div>
  );
}

function WhyItem({ icon, title, desc, accent, accentSoft }: (typeof whyUs)[number]) {
  return (
    <div className="p-2.5 text-center">
      <div
        className="mx-auto mb-[18px] flex h-[68px] w-[68px] items-center justify-center rounded-full text-[25px]"
        style={{ background: accentSoft, color: accent }}
      >
        <i className={`fa-solid ${icon}`} />
      </div>
      <h3 className={`${kanit} mb-2.5 text-base font-semibold`}>{title}</h3>
      <p className="mx-auto max-w-[270px] text-[13px] leading-[1.7] text-[#6b7280]">{desc}</p>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#14151a]" style={{ fontFamily: "'Inter','Kanit',sans-serif" }}>
      {/* floating animation keyframes */}
      <style>{`
        @keyframes floatSoft { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>

      {/* ---------------- Header ---------------- */}
      <header className="sticky top-0 z-50 border-b border-[#e7e9ee] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-12 py-[15px]">
          <a href="#home" className="flex flex-shrink-0 items-center gap-[11px]">
            <div className={`${kanit} flex h-9 w-9 items-center justify-center rounded-[9px] bg-indigo-600 text-sm font-extrabold text-white`}>
              S
            </div>
            <div className={`${kanit} text-lg font-extrabold`}>
              Super <span className="text-indigo-600">Store</span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-[#6b7280] transition-colors hover:text-[#14151a]">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#cart"
              aria-label="Shopping cart"
              className="relative flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full border border-[#e7e9ee] bg-white text-sm text-[#6b7280] hover:border-[#d0d3da] hover:text-[#14151a]"
            >
              <i className="fa-solid fa-cart-shopping" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                3
              </span>
            </a>
            <button className={`${kanit} hidden rounded-[10px] border border-[#e7e9ee] bg-white px-[18px] py-[9px] text-[13px] font-semibold text-[#14151a] hover:border-indigo-600 hover:text-indigo-600 md:inline-flex`}>
              Sign Up
            </button>
            <button onClick={() => router.push('/login')} className={`${kanit} hidden rounded-[10px] bg-indigo-600 px-[18px] py-[9px] text-[13px] font-semibold text-white hover:bg-indigo-700 md:inline-flex`}>
              Log In
            </button>
            <button
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[9px] border border-[#e7e9ee] bg-white text-[15px] text-[#14151a] md:hidden"
            >
              <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"}`} />
            </button>
          </div>
        </div>

        {/* mobile panel */}
        <div
          className={`overflow-hidden border-b border-[#e7e9ee] bg-white transition-[max-height] duration-300 md:hidden ${mobileOpen ? "max-h-[420px]" : "max-h-0"
            }`}
        >
          <div className="flex flex-col gap-1 px-5 pb-[22px] pt-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-[#e7e9ee] py-3 text-[14.5px] text-[#6b7280]"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3.5 flex gap-2.5">
              <button className={`${kanit} flex-1 rounded-[10px] border border-[#e7e9ee] bg-white py-[9px] text-[13px] font-semibold`}>
                Sign Up
              </button>
              <button className={`${kanit} flex-1 rounded-[10px] bg-indigo-600 py-[9px] text-[13px] font-semibold text-white`}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section id="home" className="scroll-mt-[88px] px-5 py-9 sm:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1180px] items-center gap-11 md:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eef0fe] px-3.5 py-1.5 text-[12.5px] font-semibold text-indigo-600">
              <i className="fa-solid fa-bolt" /> # อันดับ 1 ในไทย ร้านเติมเกมและบริการที่ดีที่สุด
            </div>
            <h1 className={`${heading} mb-4 text-[26px] leading-[1.2] sm:text-[32px] md:text-[42px]`}>
              รวดเร็ว สะดวกง่าย  —{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                ปลอดภัย บริการตลอด 24 ชั่วโมง
              </span>
            </h1>
            <p className="mb-7 max-w-[470px] text-[15px] leading-[1.75] text-[#6b7280]">
              บริการเติมเงินเกมที่รวดเร็ว ปลอดภัย และคุ้มค่าที่สุด ครอบคลุมเกมยอดนิยมกว่า 20 เกม พร้อมทีมงานที่พร้อมดูแลคุณตลอด 24 ชั่วโมง
            </p>
            <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button className={`${kanit} inline-flex items-center justify-center gap-2 rounded-[10px] bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700`}>
                <i className="fa-solid fa-bolt" /> เติมเงินทันที
              </button>
              <button className={`${kanit} inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#e7e9ee] bg-white px-6 py-3 text-sm font-semibold text-[#14151a] hover:border-indigo-600 hover:text-indigo-600`}>
                View All Promotions
              </button>
            </div>
            <div className="flex gap-8">
              <div>
                <b className={`${kanit} block text-xl font-bold text-indigo-600`}>100M+</b>
                <span className="text-xs text-[#9aa1ac]">Customers served</span>
              </div>
              <div>
                <b className={`${kanit} block text-xl font-bold text-indigo-600`}>20+</b>
                <span className="text-xs text-[#9aa1ac]">Games supported</span>
              </div>
              <div>
                <b className={`${kanit} block text-xl font-bold text-indigo-600`}>10 sec</b>
                <span className="text-xs text-[#9aa1ac]">Average top-up time</span>
              </div>
            </div>
          </div>

          <div className="relative hidden min-h-[360px] items-center justify-center md:flex">
            <div
              className="relative w-[290px] rounded-2xl border border-[#e7e9ee] bg-white p-6 shadow-[0_10px_24px_rgba(16,24,40,.08),0_2px_6px_rgba(16,24,40,.05)]"
              style={{ animation: "floatSoft 6s ease-in-out infinite" }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#eef0fe] text-[15px] text-indigo-600">
                    <i className="fa-solid fa-fire" />
                  </div>
                  <div>
                    <div className={`${kanit} text-[13.5px] font-semibold`}>Free Fire</div>
                    <div className="text-[10.5px] text-[#9aa1ac]">#SS-88210</div>
                  </div>
                </div>
              </div>
              <div className={`${kanit} mb-1 text-[30px] font-bold`}>520 เพชร</div>
              <div className="mb-[18px] text-[13px] text-[#6b7280]">Total paid $9.29</div>
              <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-3.5 py-1.5 text-[12.5px] font-semibold text-green-600">
                <i className="fa-solid fa-circle-check" /> Top-up successful
              </div>
              <div className="mb-3.5 h-px bg-[#e7e9ee]" />
              <div className="flex justify-between text-[11px] text-[#9aa1ac]">
                <span>Today at 2:32 PM</span>
                <span>ID: 384710225</span>
              </div>
            </div>

            <div
              className="absolute right-[-6px] top-1.5 flex items-center gap-2.5 rounded-xl border border-[#e7e9ee] bg-white px-[15px] py-[11px] shadow-[0_10px_24px_rgba(16,24,40,.08),0_2px_6px_rgba(16,24,40,.05)]"
              style={{ animation: "floatSoft 5.5s ease-in-out infinite .4s" }}
            >
              <i className="fa-solid fa-arrow-trend-up text-[14px] text-green-600" />
              <div>
                <b className={`${kanit} block text-[13px] font-bold`}>2,481 orders</b>
                <span className="text-[10px] text-[#9aa1ac]">completed today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section id="categories" className="scroll-mt-[88px] px-5 py-14 sm:px-12">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <h2 className={`${heading} mb-2 text-[22px] sm:text-[28px]`}>Popular Game Categories</h2>
          <p className="text-sm leading-relaxed text-[#6b7280]">Pick the game you want to top up, instantly — every major publisher covered</p>
        </div>
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <CategoryCard key={c.name} {...c} />
          ))}
        </div>
      </section>

      {/* ---------------- Products ---------------- */}
      <section id="products" className="scroll-mt-[88px] px-5 py-14 sm:px-12">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <h2 className={`${heading} mb-2 text-[22px] sm:text-[28px]`}>Best Sellers</h2>
          <p className="text-sm leading-relaxed text-[#6b7280]">The top-up packages our customers reach for most</p>
        </div>
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      {/* ---------------- Promotions ---------------- */}
      <section id="promotions" className="scroll-mt-[88px] px-5 py-14 sm:px-12">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <h2 className={`${heading} mb-2 text-[22px] sm:text-[28px]`}>Special Promotions</h2>
          <p className="text-sm leading-relaxed text-[#6b7280]">Updated every week — better value on every top-up</p>
        </div>
        <div className="mx-auto grid max-w-[1180px] gap-[18px] md:grid-cols-3">
          {promotions.map((p) => (
            <PromoCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* ---------------- Why us ---------------- */}
      <section className="px-5 py-14 sm:px-12">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <h2 className={`${heading} mb-2 text-[22px] sm:text-[28px]`}>Why Top Up With Us</h2>
          <p className="text-sm leading-relaxed text-[#6b7280]">Every detail is designed with your peace of mind in mind</p>
        </div>
        <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-3 md:gap-[22px]">
          {whyUs.map((w) => (
            <WhyItem key={w.title} {...w} />
          ))}
        </div>
      </section>

      {/* ---------------- Reviews ---------------- */}
      <section className="px-5 py-14 sm:px-12">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <h2 className={`${heading} mb-2 text-[22px] sm:text-[28px]`}>What Customers Say</h2>
          <p className="text-sm leading-relaxed text-[#6b7280]">Real feedback from Super Stire customers</p>
        </div>
        <div className="mx-auto grid max-w-[1180px] gap-[18px] md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-[14px] border border-[#e7e9ee] bg-white p-[22px] shadow-[0_1px_2px_rgba(16,24,40,.04),0_1px_3px_rgba(16,24,40,.06)]">
              <div className="mb-3 flex items-center gap-3">
                <div className={`${kanit} flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-bold text-white`}>
                  {r.initials}
                </div>
                <div>
                  <div className={`${kanit} text-sm font-semibold`}>{r.name}</div>
                  <div className="text-[11px] text-[#9aa1ac]">{r.tag}</div>
                </div>
              </div>
              <div className="mb-2.5 tracking-[2px] text-[12.5px] text-yellow-500">★★★★★</div>
              <p className="text-[13px] leading-[1.7] text-[#6b7280]">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer id="contact" className="scroll-mt-[88px] mt-4 border-t border-[#e7e9ee] bg-white px-5 pb-6 pt-14 sm:px-12">
        <div className="mx-auto grid max-w-[1180px] gap-9 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-[11px]">
              <div className={`${kanit} flex h-9 w-9 items-center justify-center rounded-[9px] bg-indigo-600 text-sm font-extrabold text-white`}>
                S
              </div>
              <div className={`${kanit} text-lg font-extrabold`}>
                Super <span className="text-indigo-600">Store</span>
              </div>
            </div>
            <p className="my-[13px] max-w-[250px] text-[12.5px] leading-[1.7] text-[#6b7280]">
              The fastest, safest online game top-up store in Thailand. Open 24/7, every day.
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: "fa-brands fa-facebook-f", label: "Facebook" },
                { icon: "fa-brands fa-instagram", label: "Instagram" },
                { icon: "fa-brands fa-line", label: "LINE" },
                { icon: "fa-brands fa-x-twitter", label: "X" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#e7e9ee] bg-white text-[13px] text-[#6b7280] hover:border-indigo-600 hover:text-indigo-600"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`${kanit} mb-[15px] text-sm font-semibold`}>Quick Links</h4>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="mb-2.5 block text-[13px] text-[#6b7280] hover:text-indigo-600">
                {l.label}
              </a>
            ))}
          </div>

          <div>
            <h4 className={`${kanit} mb-[15px] text-sm font-semibold`}>Popular Categories</h4>
            {["Free Fire", "RoV", "PUBG Mobile", "Valorant"].map((g) => (
              <a key={g} href="#products" className="mb-2.5 block text-[13px] text-[#6b7280] hover:text-indigo-600">
                {g}
              </a>
            ))}
          </div>

          <div>
            <h4 className={`${kanit} mb-[15px] text-sm font-semibold`}>Contact Us</h4>
            <span className="mb-2.5 block text-[13px] text-[#6b7280]">
              <i className="fa-solid fa-envelope mr-2 w-[15px] text-[#9aa1ac]" />support@superstore.co
            </span>
            <span className="mb-2.5 block text-[13px] text-[#6b7280]">
              <i className="fa-brands fa-line mr-2 w-[15px] text-[#9aa1ac]" />@superstore
            </span>
            <span className="mb-2.5 block text-[13px] text-[#6b7280]">
              <i className="fa-solid fa-phone mr-2 w-[15px] text-[#9aa1ac]" />02-123-4567
            </span>
            <span className="mb-2.5 block text-[13px] text-[#6b7280]">
              <i className="fa-solid fa-clock mr-2 w-[15px] text-[#9aa1ac]" />Open 24 hours a day
            </span>
          </div>
        </div>

        <div className="mx-auto mt-[38px] flex max-w-[1180px] flex-wrap justify-between gap-2 border-t border-[#e7e9ee] pt-5 text-[11.5px] text-[#9aa1ac]">
          <span>© 2026 Super Store. All rights reserved.</span>
          <span>All games and trademarks are the property of their respective owners.</span>
        </div>
      </footer>
    </div>
  );
}