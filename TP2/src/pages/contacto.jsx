import React from 'react';

export default function Contacto() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-margin-mobile">
      <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight text-center mb-8">
        Contacto
      </h1>
      <div className="bg-surface-container-low p-space-xl rounded-xl border border-outline-variant max-w-md w-full text-center">
        <h2 className="text-headline-sm text-primary mb-6">Mis Datos</h2>

        <div className="flex flex-col gap-space-md text-left">
          <div>
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider">Nombre:</span>
            <p className="text-body-lg text-on-surface">Ignacio Giangrieco</p>
          </div>
          <div>
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider">Email:</span>
            <p className="text-body-lg text-on-surface">gmailgenerico@gmail.com</p>
          </div>
          <div>
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider">Teléfono:</span>
            <p className="text-body-lg text-on-surface">1111122233</p>
          </div>
          <div>
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider">GitHub:</span>
            <a href="https://github.com/xl5net/Lenguajes-4" target="_blank" rel="noopener noreferrer" className="text-body-lg text-on-surface text-primary hover:underline cursor-pointer">[https://github.com/xl5net/Lenguajes-4]</a>
          </div>
        </div>
      </div>
    </div>
  );
}
