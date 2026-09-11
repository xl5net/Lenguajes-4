import React from 'react';

export default function Servicios() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-margin-mobile">
      <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight text-center mb-8">
        Nuestros Servicios
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-5xl w-full">
        <div className="bg-surface-container-low p-space-lg rounded-xl border border-outline-variant">
          <h3 className="text-headline-sm text-primary mb-2">Desarrollo Web</h3>
          <p className="text-body-md text-on-surface-variant">Creamos aplicaciones web modernas y responsivas utilizando las últimas tecnologías como React, Tailwind y Node.js para asegurar un rendimiento óptimo.</p>
        </div>
        <div className="bg-surface-container-low p-space-lg rounded-xl border border-outline-variant">
          <h3 className="text-headline-sm text-primary mb-2">Consultoría IT</h3>
          <p className="text-body-md text-on-surface-variant">Asesoramiento experto para optimizar la infraestructura tecnológica de tu empresa y mejorar los procesos de desarrollo y despliegue.</p>
        </div>
        <div className="bg-surface-container-low p-space-lg rounded-xl border border-outline-variant">
          <h3 className="text-headline-sm text-primary mb-2">Diseño UI/UX</h3>
          <p className="text-body-md text-on-surface-variant">Diseñamos interfaces intuitivas y atractivas centradas en la experiencia del usuario, asegurando que tus productos no solo funcionen bien, sino que se vean increíbles.</p>
        </div>
      </div>
    </div>
  );
}