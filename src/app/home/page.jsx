import Link from "next/link";
import Navbar from "@/components/inicio/Navbar";
import { Clientes } from "@/components/inicio/Clientes";
import Footer from "@/components/inicio/Footer";

const categories = [
  {
    title: "Alcantarillado",
    desc: "Soluciones para redes, cámaras y gestión de aguas.",
    tag: "Infra",
    link: "https://titancemento.com/project_category/alcantarillado/",
  },
  {
    title: "Infraestructura",
    desc: "Elementos para obras civiles y proyectos de gran escala.",
    tag: "Obras",
    link: "https://titancemento.com/project_category/infraestructura/",
  },
  {
    title: "Espacio Público",
    desc: "Mobiliario urbano, bordillos, andenes y señalización.",
    tag: "Ciudad",
    link: "https://titancemento.com/project_category/espacio-publico/",
  },
  {
    title: "Edificaciones",
    desc: "Componentes para estructuras, placas y sistemas modulares.",
    tag: "Build",
    link: "https://titancemento.com/project_category/edificaciones/",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050b18] text-white">
      <Navbar />

      {/* Hero */}
      <main className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-[#1450ff]/20 blur-3xl" />
          <div className="absolute top-64 -right-30 h-105 w-105 rounded-full bg-[#0b3aa4]/20 blur-3xl" />
        </div>

        <section className="relative mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-1 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#1450ff]" />
                Futura plataforma de Manufacturas de Cemento Titán
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                La transformación digital en{" "}
                <span className="text-[#6aa1ff]">&nbsp;Titán</span> es ahora
              </h1>

              <p className="mt-4 max-w-xl text-base text-white/70">
                Interfaz clara, moderna y preparada para integrar Google Maps,
                rutas, estados y mucho más.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#cotizar"
                  className="rounded-xl bg-[#1450ff] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#1450ff]/25 transition hover:bg-[#0b3aa4]"
                >
                  Empezar
                </Link>
                <Link
                  href="#productos"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/85 transition hover:bg-white/10"
                >
                  Ver secciones
                </Link>
              </div>

              {/*  <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {[
                  { k: "GPS", v: "Preciso" },
                  { k: "Rutas", v: "Optimizadas" },
                  { k: "Alertas", v: "En vivo" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-xs text-white/55">{x.k}</div>
                    <div className="mt-1 text-sm font-semibold">{x.v}</div>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Right mock */}
            {/*   <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm">
              <div className="rounded-2xl bg-[#050b18] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Mapa / Panel</div>
                    <div className="text-xs text-white/55">
                      (Aquí pondremos Google Maps)
                    </div>
                  </div>
                  <span className="rounded-full bg-[#1450ff]/15 px-3 py-1 text-xs text-[#6aa1ff]">
                    Online
                  </span>
                </div>

                <div className="mt-4 grid gap-3">
                  <div className="h-44 rounded-2xl border border-white/10 bg-linear-to-b from-white/5 to-transparent" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs text-white/55">Vehículos</div>
                      <div className="mt-1 text-2xl font-semibold">12</div>
                      <div className="mt-1 text-xs text-white/55">
                        10 en ruta • 2 detenidos
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs text-white/55">Alertas</div>
                      <div className="mt-1 text-2xl font-semibold">3</div>
                      <div className="mt-1 text-xs text-white/55">
                        Exceso de tiempo • Zona
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">
                        Últimos eventos
                      </div>
                      <Link
                        href="#proyectos"
                        className="text-xs text-[#6aa1ff] hover:underline"
                      >
                        Ver todo
                      </Link>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-white/75">
                      <li className="flex items-center justify-between">
                        <span>Unidad #04 • Entró a zona</span>
                        <span className="text-xs text-white/45">hace 2m</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Unidad #07 • Parada detectada</span>
                        <span className="text-xs text-white/45">hace 8m</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Unidad #02 • Ruta actualizada</span>
                        <span className="text-xs text-white/45">hace 18m</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* Productos / Categorías */}
        <section
          id="productos"
          className="relative mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20"
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold">Secciones principales</h2>
             {/*  <p className="mt-2 max-w-2xl text-sm text-white/65">
                Cuatro bloques para organizar tu plataforma (luego lo ajustamos
                a tu negocio y a la info real).
              </p> */}
            </div>
            {/*  <Link
              href="#cotizar"
              className="hidden rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 sm:inline-flex"
            >
              Solicitar demo
            </Link> */}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <div
                key={c.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#1450ff]/15 px-3 py-1 text-xs text-[#6aa1ff]">
                    {c.tag}
                  </span>
                  <span className="text-white/35 transition group-hover:text-white/60">
                    →
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-white/65">{c.desc}</p>
                <div className="mt-5 h-px bg-white/10" />
                <Link
                  href={c.link}
                  className="mt-4 text-xs text-white/55"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click para abrir
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Proyectos */}
        <section
          id="proyectos"
          className="mx-auto max-w-6xl px-4 py-14 sm:px-6"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  Productos y proyectos
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/65">
                  Click aquí para ir al portafolio completo de Manufacturas de
                  Cemento Titán.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="https://titancemento.com/"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver portafolio
                </Link>
                {/*  <Link
                  href="#cotizar"
                  className="rounded-xl bg-[#1450ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b3aa4]"
                >
                  Integrar tracking
                </Link> */}
              </div>
            </div>

            {/*   <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {[
                {
                  t: "Rutas activas",
                  d: "Seguimiento por unidad, ETA, paradas y eventos.",
                },
                {
                  t: "Zonas y geocercas",
                  d: "Alertas por entrada/salida y permanencia.",
                },
                {
                  t: "Reportes",
                  d: "Histórico, exportables y métricas por día/semana.",
                },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-white/10 bg-[#050b18]/40 p-5"
                >
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="mt-2 text-sm text-white/65">{x.d}</div>
                </div>
              ))}
            </div> */}
          </div>
        </section>

        {/* BIM / Blog */}
        {/*  <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div
              id="bim"
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold">BIM / Modelos</h3>
              <p className="mt-2 text-sm text-white/65">
                Un espacio para descargas, documentación técnica y recursos.
              </p>
              <Link
                href="#"
                className="mt-5 inline-flex rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                Explorar recursos
              </Link>
            </div>

            <div
              id="blog"
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold">Blog</h3>
              <p className="mt-2 text-sm text-white/65">
                Novedades, guías, actualizaciones del sistema y buenas
                prácticas.
              </p>
              <Link
                href="#"
                className="mt-5 inline-flex rounded-xl bg-[#1450ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b3aa4]"
              >
                Ver publicaciones
              </Link>
            </div>
          </div>
        </section> */}

        {/* Contacto / CTA */}
        <section id="cotizar" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <Clientes />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
