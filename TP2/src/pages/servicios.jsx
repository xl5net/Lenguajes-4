import React from 'react';
import { serviciosIT } from "../data/serviciosIT";
import DepthCarousel from "../components/DepthCarousel";

export default function Servicios() {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
      <header className="text-center max-w-3xl mb-8">
        <span className="text-primary font-semibold text-xs sm:text-sm tracking-widest uppercase">
          Especialización & Práctica Profesional
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight mt-2 mb-4">
          Servicios y Habilidades Tecnológicas
        </h1>
        <p className="text-on-surface-variant text-base sm:text-lg">
          Desarrollo de arquitectura backend de alta concurrencia, modelado avanzado de datos relacionales, seguridad con autenticación OTP y hardening de infraestructura.
        </p>
      </header>

      <section className="w-full max-w-5xl mb-16">
        <div className="text-center mb-2">
          <span className="text-xs font-medium text-on-surface-variant/80 uppercase tracking-wider flex items-center justify-center gap-1.5">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Vista interactiva 3D — Arrastra o usa las flechas
          </span>
        </div>

        <DepthCarousel
          items={serviciosIT}
          autoAdvance={false}
          itemWidth="440px"
          renderItem={(item) => (
            <article className="overflow-hidden bg-surface-container-low rounded-2xl border border-outline-variant/50 shadow-xl flex flex-col text-left">
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-surface-container-high">
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-surface-container-lowest/80 backdrop-blur-md text-primary text-xs font-semibold px-3 py-1 rounded-full border border-outline-variant/30">
                  {item.nivel}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-on-surface mb-2 leading-snug">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-3 mb-4 leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                    Tecnologías principales:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tecnologias.map((tec, idx) => (
                      <span
                        key={idx}
                        className="bg-surface-container-highest/90 border border-outline-variant/30 text-on-surface-variant px-2.5 py-1 rounded-md text-xs font-mono"
                      >
                        {tec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )}
        />
      </section>

      <hr className="w-full max-w-5xl my-4 border-outline-variant/30" />

      <section className="w-full max-w-5xl my-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface">
            Detalle Integral de Servicios
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Explora la información completa de cada área técnica desarrollada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviciosIT.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between overflow-hidden bg-surface-container-low rounded-2xl border border-outline-variant/40 p-6 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                    {item.nivel}
                  </span>
                  <span className="text-xs font-mono text-on-surface-variant/70">
                    ID #{item.id}
                  </span>
                </div>

                <div className="rounded-xl overflow-hidden h-40 mb-4 bg-surface-container-high">
                  <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <h3 className="text-xl font-bold text-on-surface mb-3">
                  {item.titulo}
                </h3>

                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                  {item.descripcion}
                </p>
              </div>

              <div>
                <span className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2.5">
                  Stack Tecnológico:
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.tecnologias.map((tec, indice) => (
                    <span
                      key={indice}
                      className="bg-surface-container-highest border border-outline-variant/40 text-on-surface px-2.5 py-1 rounded-lg text-xs font-mono hover:text-primary transition-colors"
                    >
                      {tec}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}