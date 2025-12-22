"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#06142b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* TOP */}
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Logo */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/assets/titan.png"
                alt="Titán"
                width={200}
                height={200}
                className="h-auto w-full object-contain"
                priority
              />
            </Link>
          </div>

          {/* LA EMPRESA */}
          <div>
            <h4 className="text-sm font-bold tracking-wide">LA EMPRESA</h4>
            <div className="mt-3 h-0.5 w-10 bg-[#1450ff]" />
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>
                <Link
                  href="https://titancemento.com/presentacion-corporativa/"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Presentación Corporativa
                </Link>
              </li>
              <li>
                <Link
                  href="http://138.121.202.135:9090/proveedores/"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Proveedores
                </Link>
              </li>
              <li>
                <Link
                  href="http://138.121.202.135:9090/pqr/registro/menu.php"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PQR
                </Link>
              </li>
              <li>
                <Link
                  href="https://titancemento.com/mapa-de-sitio/"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mapa de Sitio
                </Link>
              </li>
              <li>
                <Link
                  href="https://titancemento.com/accionistas/"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Accionistas
                </Link>
              </li>
            </ul>
          </div>

          {/* ENLACES */}
          <div>
            <h4 className="text-sm font-bold tracking-wide">
              ENLACES DE <br className="hidden lg:block" /> INTERÉS
            </h4>
            <div className="mt-3 h-0.5 w-10 bg-[#1450ff]" />
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>
                <Link
                  href="https://titancemento.com/bim/"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BIM
                </Link>
              </li>
              <li>
                <Link
                  href="https://titancemento.com/contacto/"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="https://decoblock.co/"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Decoblock
                </Link>
              </li>
              <li>
                <Link
                  href="https://titancemento.com/blog/"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* PRODUCTOS */}
          <div>
            <h4 className="text-sm font-bold tracking-wide">PRODUCTOS</h4>
            <div className="mt-3 h-0.5 w-10 bg-[#1450ff]" />
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>Alcantarillado</li>
              <li>Infraestructura</li>
              <li>Espacio Público</li>
              <li>Edificaciones</li>
            </ul>
          </div>
        </div>

        {/* SEDES */}
        <div className="mt-14 grid gap-10 text-center text-sm lg:grid-cols-3">
          {[
            {
              city: "COTA CUNDINAMARCA",
              lines: [
                "+57 3138701599",
                "601 3353550",
                "Titancemento@titancemento.com",
              ],
            },
            {
              city: "GIRARDOTA – ANTIOQUIA",
              lines: ["+57 320 4568455", "mhernandez@titancemento.com"],
            },
            {
              city: "SOLEDAD – ATLÁNTICO",
              lines: ["+57 310 2589080", "pmartinez@titancemento.com"],
            },
          ].map((s) => (
            <div key={s.city}>
              <div className="font-semibold tracking-wide">{s.city}</div>
              <div className="mt-4 space-y-1 text-white/80">
                {s.lines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* LEGAL */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/70 sm:flex-row sm:justify-between">
          <Link
            href="https://titancemento.com/wp-content/uploads/Politica-tratamiento-de-datos-V3-08-2024aprobada.pdf"
            className="hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Tratamiento de Datos Personales
          </Link>
          <div>
            Powered By{" "}
            <span className="font-semibold text-white">
              Dirección de Sistemas
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
