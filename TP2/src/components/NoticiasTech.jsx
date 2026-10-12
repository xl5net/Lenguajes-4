import { useState, useEffect } from "react";
import FlexCarousel from "./FlexCarousel";

export default function NoticiasTech() {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarNoticias() {
      try {
        setCargando(true);
        const respuesta = await fetch(
          "https://dev.to/api/articles?tag=programming&per_page=6"
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los datos de la API");
        }

        const datos = await respuesta.json();
        setArticulos(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarNoticias();
  }, []);

  if (cargando) {
    return (
      <div className="py-8 text-center text-on-surface-variant animate-pulse">
        Cargando novedades tecnológicas de Dev.to...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        Ha ocurrido un problema: {error}
      </div>
    );
  }

  return (
    <section className="w-full my-8">
      <div className="text-center mb-6">
        <span className="text-primary font-semibold text-xs tracking-wider uppercase">
          Actualidad y Comunidad
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mt-1">
          Noticias y Artículos de Tecnología (Dev.to)
        </h2>
        <p className="text-on-surface-variant text-sm mt-1 max-w-xl mx-auto">
          Desliza o navega a través de las últimas publicaciones sobre programación y desarrollo de la comunidad.
        </p>
      </div>

      <FlexCarousel
        items={articulos}
        autoPlay={true}
        autoPlayInterval={4500}
        cardWidth={340}
        gap={20}
        renderItem={(art) => (
          <article className="h-full flex flex-col justify-between overflow-hidden bg-surface-container rounded-2xl border border-outline-variant/30 shadow-md hover:border-primary/40 transition-colors">
            <div>
              <div className="relative overflow-hidden h-44 bg-surface-container-high">
                <img
                  src={art.cover_image || art.social_image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-3 right-3 bg-surface-container-lowest/80 backdrop-blur-md text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-outline-variant/30">
                  Dev.to
                </span>
              </div>

              <div className="p-5 text-left">
                <h3 className="font-semibold text-base sm:text-lg text-on-surface line-clamp-2 mb-2">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-3 mb-2">
                  {art.description}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
              <span className="truncate max-w-[120px]">✍️ {art.user?.name}</span>
              <span>⏱️ {art.reading_time_minutes} min</span>
              <a
                href={art.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-semibold flex items-center gap-1"
              >
                Leer ↗
              </a>
            </div>
          </article>
        )}
      />
    </section>
  );
}
