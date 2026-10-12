import { useState, useEffect } from "react";

const WMO_CODES = {
  0: { label: "Cielo despejado", icon: "☀️", color: "text-amber-400" },
  1: { label: "Mayormente despejado", icon: "🌤️", color: "text-amber-300" },
  2: { label: "Parcialmente nublado", icon: "⛅", color: "text-sky-300" },
  3: { label: "Nublado", icon: "☁️", color: "text-slate-300" },
  45: { label: "Niebla", icon: "🌫️", color: "text-slate-400" },
  48: { label: "Niebla con escarcha", icon: "🌫️", color: "text-slate-400" },
  51: { label: "Llovizna ligera", icon: "🌦️", color: "text-blue-300" },
  53: { label: "Llovizna moderada", icon: "🌦️", color: "text-blue-400" },
  55: { label: "Llovizna densa", icon: "🌧️", color: "text-blue-500" },
  61: { label: "Lluvia ligera", icon: "🌧️", color: "text-blue-400" },
  63: { label: "Lluvia moderada", icon: "🌧️", color: "text-blue-500" },
  65: { label: "Lluvia intensa", icon: "🌧️", color: "text-blue-600" },
  71: { label: "Nevada ligera", icon: "🌨️", color: "text-indigo-200" },
  73: { label: "Nevada moderada", icon: "🌨️", color: "text-indigo-300" },
  75: { label: "Nevada fuerte", icon: "❄️", color: "text-indigo-400" },
  80: { label: "Chaparrones leves", icon: "🌦️", color: "text-blue-400" },
  81: { label: "Chaparrones moderados", icon: "🌧️", color: "text-blue-500" },
  82: { label: "Chaparrones intensos", icon: "⛈️", color: "text-blue-600" },
  95: { label: "Tormenta eléctrica", icon: "⛈️", color: "text-amber-500" },
  96: { label: "Tormenta con granizo", icon: "⛈️", color: "text-amber-600" },
  99: { label: "Tormenta severa", icon: "⛈️", color: "text-red-500" }
};

const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const URL_API_METEO =
  "https://api.open-meteo.com/v1/forecast?latitude=-24.7859&longitude=-65.4117&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FArgentina%2FSalta";

export default function ClimaSalta() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  useEffect(() => {
    let activo = true;

    async function cargarInicial() {
      try {
        const respuesta = await fetch(URL_API_METEO);
        if (!respuesta.ok) {
          throw new Error("No se pudo conectar con la API de meteorología");
        }
        const datos = await respuesta.json();
        if (activo) {
          setClima(datos);
          setError(null);
        }
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarInicial();
    return () => {
      activo = false;
    };
  }, []);

  const refrescarClima = async () => {
    try {
      setActualizando(true);
      const respuesta = await fetch(URL_API_METEO);
      if (!respuesta.ok) {
        throw new Error("No se pudo conectar con la API de meteorología");
      }
      const datos = await respuesta.json();
      setClima(datos);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActualizando(false);
    }
  };

  if (cargando) {
    return (
      <div className="w-full my-10 py-12 text-center text-on-surface-variant animate-pulse bg-surface-container rounded-2xl border border-outline-variant/30">
        <p className="text-lg">Obteniendo datos meteorológicos de Salta, Argentina...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full my-8 p-6 text-center text-error bg-surface-container rounded-2xl border border-error/30">
        <p className="mb-3 font-semibold">Error al consultar el clima: {error}</p>
        <button
          type="button"
          onClick={refrescarClima}
          className="px-4 py-2 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary/90 transition-colors text-sm"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const current = clima?.current;
  const daily = clima?.daily;
  const infoWmo = WMO_CODES[current?.weather_code] || {
    label: "Desconocido",
    icon: "🌡️",
    color: "text-primary"
  };

  return (
    <section className="w-full my-8">
      <div className="text-center mb-6">
        <span className="text-primary font-semibold text-xs tracking-wider uppercase">
          Meteorología
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mt-1">
          Clima en Salta, Argentina (Open-Meteo)
        </h2>
        <p className="text-on-surface-variant text-sm mt-1 max-w-xl mx-auto">
          Condiciones atmosféricas y pronóstico semanal para la ciudad de Salta.
        </p>
      </div>
      <div className="bg-surface-container-low rounded-2xl border border-outline-variant/40 p-6 sm:p-8 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Salta Capital, Argentina
              </span>
              <span className="text-xs text-on-surface-variant font-mono">1.180 m s. n. m.</span>
            </div>

            <div className="flex items-center gap-4 my-2">
              <span className="text-6xl sm:text-7xl select-none" role="img" aria-label={infoWmo.label}>
                {infoWmo.icon}
              </span>
              <div>
                <span className="text-5xl sm:text-6xl font-extrabold text-on-surface tracking-tight">
                  {Math.round(current?.temperature_2m)}°C
                </span>
                <p className="text-base sm:text-lg font-medium text-on-surface-variant capitalize">
                  {infoWmo.label}
                </p>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant/80 mt-1">
              Sensación térmica:{" "}
              <span className="text-on-surface font-semibold">
                {Math.round(current?.apparent_temperature)}°C
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-surface-container-high/60 border border-outline-variant/30 rounded-xl p-3.5 text-center">
              <span className="text-xs text-on-surface-variant block mb-1">💧 Humedad</span>
              <span className="text-lg font-bold text-on-surface">
                {current?.relative_humidity_2m}%
              </span>
            </div>

            <div className="bg-surface-container-high/60 border border-outline-variant/30 rounded-xl p-3.5 text-center">
              <span className="text-xs text-on-surface-variant block mb-1">💨 Viento</span>
              <span className="text-lg font-bold text-on-surface">
                {current?.wind_speed_10m} <span className="text-xs font-normal">km/h</span>
              </span>
            </div>

            <div className="bg-surface-container-high/60 border border-outline-variant/30 rounded-xl p-3.5 text-center">
              <span className="text-xs text-on-surface-variant block mb-1">🌧️ Precipitación</span>
              <span className="text-lg font-bold text-on-surface">
                {current?.precipitation} <span className="text-xs font-normal">mm</span>
              </span>
            </div>

            <div className="bg-surface-container-high/60 border border-outline-variant/30 rounded-xl p-3.5 text-center">
              <span className="text-xs text-on-surface-variant block mb-1">🔺 Máxima hoy</span>
              <span className="text-lg font-bold text-amber-400">
                {Math.round(daily?.temperature_2m_max?.[0] || 0)}°C
              </span>
            </div>

            <div className="bg-surface-container-high/60 border border-outline-variant/30 rounded-xl p-3.5 text-center">
              <span className="text-xs text-on-surface-variant block mb-1">🔻 Mínima hoy</span>
              <span className="text-lg font-bold text-sky-400">
                {Math.round(daily?.temperature_2m_min?.[0] || 0)}°C
              </span>
            </div>

            <div className="bg-surface-container-high/60 border border-outline-variant/30 rounded-xl p-3.5 text-center">
              <span className="text-xs text-on-surface-variant block mb-1">☔ Prob. lluvia</span>
              <span className="text-lg font-bold text-primary">
                {daily?.precipitation_probability_max?.[0] || 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
          <span>Actualizado: {new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })} hs</span>
          <button
            type="button"
            onClick={refrescarClima}
            disabled={actualizando}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-highest border border-outline-variant/40 hover:text-primary transition-colors cursor-pointer text-xs font-medium disabled:opacity-50"
          >
            <svg
              className={`w-3.5 h-3.5 ${actualizando ? "animate-spin text-primary" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {actualizando ? "Actualizando..." : "Actualizar clima"}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-on-surface mb-3 flex items-center gap-2">
          <span>📅 Pronóstico para los próximos 7 días</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {daily?.time?.map((fecha, idx) => {
            const dateObj = new Date(`${fecha}T12:00:00-03:00`);
            const diaNombre = idx === 0 ? "Hoy" : DIAS_SEMANA[dateObj.getDay()];
            const diaNumero = dateObj.getDate();
            const wCode = daily.weather_code[idx];
            const wInfo = WMO_CODES[wCode] || { label: "Clima", icon: "⛅" };
            const tempMax = Math.round(daily.temperature_2m_max[idx]);
            const tempMin = Math.round(daily.temperature_2m_min[idx]);
            const probLluvia = daily.precipitation_probability_max[idx];

            return (
              <div
                key={fecha}
                className={`flex flex-col items-center justify-between p-3.5 rounded-xl border text-center transition-all ${
                  idx === 0
                    ? "bg-surface-container-high border-primary/40 shadow-sm"
                    : "bg-surface-container border-outline-variant/30 hover:border-outline-variant/60"
                }`}
              >
                <div>
                  <span className={`text-xs font-bold block ${idx === 0 ? "text-primary" : "text-on-surface"}`}>
                    {diaNombre}
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono">{diaNumero}</span>
                </div>

                <span className="text-3xl my-2 select-none" role="img" aria-label={wInfo.label}>
                  {wInfo.icon}
                </span>

                <div className="w-full">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                    <span className="text-amber-400">{tempMax}°</span>
                    <span className="text-sky-400">{tempMin}°</span>
                  </div>
                  {probLluvia > 20 && (
                    <span className="text-[10px] text-primary/90 mt-1 block font-mono">
                      💧 {probLluvia}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
