import { useState, useEffect } from "react";
import AccordionGallery from "./AccordionGallery";

const TECH_WALLPAPERS = [
  "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=900&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&auto=format&fit=crop&q=80", 
];

export default function ProyectosGithub() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarProyectos() {
      try {
        setCargando(true);
        const respuesta = await fetch(
          "https://api.github.com/search/repositories?q=stars:>50000&sort=stars&order=desc&per_page=6"
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener los repositorios de GitHub");
        }

        const datos = await respuesta.json();

        setProyectos(datos.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarProyectos();
  }, []);

  if (cargando) {
    return (
      <div className="py-8 text-center text-on-surface-variant animate-pulse">
        Cargando repositorios destacados de GitHub...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        Error al cargar proyectos: {error}
      </div>
    );
  }

  const galleryItems = proyectos.map((repo, i) => ({
    image: TECH_WALLPAPERS[i % TECH_WALLPAPERS.length],
    label: `${repo.name} · ⭐ ${(repo.stargazers_count / 1000).toFixed(0)}k`,
    link: repo.html_url,
    alt: repo.name
  }));

  return (
    <section className="w-full my-8">
      <div className="text-center mb-6">
        <span className="text-primary font-semibold text-xs tracking-wider uppercase">
          Ecosistema Open Source & Tendencias
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mt-1">
          Proyectos Populares en GitHub (Open Source)
        </h2>
        <p className="text-on-surface-variant text-sm mt-1 max-w-xl mx-auto">
          Pasa el cursor o haz clic para expandir y explorar los repositorios con mayor impacto global.
        </p>
      </div>

      {galleryItems.length > 0 && (
        <div className="mb-8">
          <AccordionGallery
            items={galleryItems}
            defaultIndex={1}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#adc6ff"
            overlayColor="#0a0e16"
            textColor="#dfe2ee"
            height={440}
            radius={16}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
        {proyectos.map((repo) => (
          <article
            key={repo.id}
            className="flex flex-col justify-between p-5 bg-surface-container rounded-2xl border border-outline-variant/30 shadow-sm hover:border-primary/40 transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                  className="w-11 h-11 rounded-full border border-outline-variant/40 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-on-surface hover:text-primary transition-colors">
                    {repo.name}
                  </h3>
                  <span className="text-xs text-on-surface-variant">
                    @{repo.owner.login}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-3 mb-4 leading-relaxed">
                {repo.description || "Sin descripción disponible."}
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
              <span className="font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">
                {repo.language || "Multiplataforma"}
              </span>
              <span>⭐ {repo.stargazers_count.toLocaleString()}</span>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Ver repo ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
