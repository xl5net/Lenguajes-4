import NoticiasTech from "../components/NoticiasTech";
import ProyectosGithub from "../components/ProyectosGithub";
import ClimaSalta from "../components/ClimaSalta";

export default function Inicio() {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
      <header className="text-center max-w-3xl mb-12">
        <span className="text-primary font-semibold text-sm tracking-wide uppercase">
          Lenguajes IV — Cátedra Pacheco — TP 4
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tight mt-2 mb-4">
          Hub de Tecnologías & Servicios
        </h1>
        <p className="text-on-surface-variant text-base sm:text-lg">
          Integración de múltiples APIs públicas: artículos de la comunidad tecnológica (Dev.to), proyectos open source destacados (GitHub) y estado del clima en Salta (Open-Meteo).
        </p>
      </header>

      {/* API 1: Dev.to (artículos IT) */}
      <NoticiasTech />

      {/* divisor visual */}
      <hr className="w-full my-8 border-outline-variant/30" />

      {/* API 2: gitHub (proyectos open source) */}
      <ProyectosGithub />

      {/* ddivisor visual */}
      <hr className="w-full my-8 border-outline-variant/30" />

      {/* API 3: open-meteo (clima en Salta, argentina) */}
      <ClimaSalta />
    </div>
  );
}