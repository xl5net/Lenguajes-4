import React from 'react';

export default function Inicio() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-margin-mobile">
      <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight text-center mb-8">
        TP2 - lenguajes 4
      </h1>
      <div className="max-w-2xl text-center">
        <h2 className="text-headline-sm text-primary mb-4">¿Qué es React?</h2>
        <p className="text-body-lg text-on-surface-variant">
          React es una biblioteca de JavaScript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre.
        </p>
      </div>
    </div>
  );
}