"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Inicio", href: "/" },
  /*  { label: "Productos", href: "#productos" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "BIM", href: "#bim" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" }, */
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06142b]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-white">
            <Image
              src="/assets/logo-titan.svg"
              alt="Logo Titán"
              fill
              sizes="36px"
              className="object-contain p-1 transition-transform duration-200 group-hover:scale-110"
              priority
            />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">
              Manufacturas de cemento{" "}
              <span className="text-white/60">Titán</span>
            </div>
            <div className="text-xs text-white/55">Plataforma</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="#cotizar"
            className="ml-2 rounded-xl bg-[#1450ff] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#1450ff]/25 transition hover:bg-[#0b3aa4]"
          >
            Cliente
          </Link>
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#06142b]/95">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <div className="grid gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-white/85 hover:bg-white/10"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="#cotizar"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-[#1450ff] px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Cotizar
              </Link>

              <div className="mt-3 text-xs text-white/45">
                © {year} TuMarca Tracking
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
