import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'transition-colors duration-150 text-primary font-headline-sm'
      : 'font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors duration-150';

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-7xl mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-gutter">
          <nav className="flex items-center justify-center gap-space-xl mx-auto">
            <NavLink to="/" className={navLinkClass}>
              Inicio
            </NavLink>
            <NavLink to="/servicios" className={navLinkClass}>
              Servicios
            </NavLink>
            <NavLink to="/contacto" className={navLinkClass}>
              Contacto
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="w-full pt-16 flex-1 bg-surface">
        <Outlet />
      </main>
    </>
  );
}
