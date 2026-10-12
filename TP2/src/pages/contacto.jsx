import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser'; 
import HoldButton from '../components/HoldButton';

export default function Contacto() {

  const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm();
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleHoldSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return false;
    }
    handleSubmit(onSubmit)();
    return true;
  };

  const handleTap = async () => {
    await trigger();
  };

  const handleResetForm = () => {
    reset();
    setMensajeExito(false);
  };

  const onSubmit = (data) => {
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      data,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
        console.log("Email enviado con éxito", result.text);
        setMensajeExito(true);
        reset();
        
        setTimeout(() => {
          setMensajeExito(false);
        }, 2000);
    })
    .catch((error) => {
        console.log("Hubo un error al enviar:", error.text);
        alert("Hubo un error al enviar el mensaje.");
    });
  };
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col items-center">
      <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight text-center mb-6">
        Contacto
      </h1>

      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant w-full mb-6">
        <h2 className="text-headline-sm text-primary mb-4 text-center">Mis Datos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="bg-surface-container-highest/40 p-3 rounded-lg border border-outline-variant/30">
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs block mb-1">Nombre:</span>
            <p className="text-body-md text-on-surface font-medium">Ignacio Giangrieco</p>
          </div>
          <div className="bg-surface-container-highest/40 p-3 rounded-lg border border-outline-variant/30">
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs block mb-1">Email:</span>
            <p className="text-body-md text-on-surface font-medium truncate" title="gmailgenerico@gmail.com">gmailgenerico@gmail.com</p>
          </div>
          <div className="bg-surface-container-highest/40 p-3 rounded-lg border border-outline-variant/30">
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs block mb-1">Teléfono:</span>
            <p className="text-body-md text-on-surface font-medium">1111122233</p>
          </div>
          <div className="bg-surface-container-highest/40 p-3 rounded-lg border border-outline-variant/30">
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs block mb-1">GitHub:</span>
            <a href="https://github.com/xl5net/Lenguajes-4" target="_blank" rel="noopener noreferrer" className="text-body-md text-primary hover:underline font-medium truncate block">
              xl5net/Lenguajes-4 ↗
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
        
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant w-full flex flex-col justify-between">
          <h2 className="text-headline-sm text-primary mb-4 text-center">C</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-space-md text-left">
            
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Apellido y Nombre:</label>
              <input 
                type="text"
                placeholder='Ingrese su apellido y nombre'
                className="w-full bg-surface-container-highest border border-outline-variant rounded-md px-3 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50"
                {...register("ApellidoNombre", {
                  required: "Debe cargar su nombre y apellido.",
                  minLength: {
                    value: 5,
                    message: "Ingrese un nombre y apellido con una extensión mayor a 5 caracteres."
                  }
                })} 
              />
              {errors.ApellidoNombre?.message && (
                <p className="text-error text-label-sm mt-1">{errors.ApellidoNombre.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Email:</label>
              <input 
                type="email"
                placeholder='Ingrese su email'
                className="w-full bg-surface-container-highest border border-outline-variant rounded-md px-3 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50"
                {...register("email", {required: "Ingrese una dirección de email válida"})} 
              />
              {errors.email?.message && (
                <p className="text-error text-label-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Texto:</label>
              <textarea 
                rows="4"
                placeholder='Ingrese un texto'
                className="w-full bg-surface-container-highest border border-outline-variant rounded-md px-3 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 resize-none"
                {...register("texto", {maxLength: 300})}
              />
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <HoldButton
                onHold={handleHoldSubmit}
                onTap={handleTap}
                className="w-full font-label-md uppercase tracking-wider py-3"
                backgroundColor="#262a33"
                fillColor="#adc6ff"
                textColor="#dfe2ee"
                fillTextColor="#002e6a"
                radius={12}
                holdTime={1500}
                resetAfter={2500}
                doneLabel="¡Enviado con éxito!"
                icon={
                  <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                }
                doneIcon={
                  <svg className="w-4 h-4 mr-1 text-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                }
              >
                Mantener para enviar
              </HoldButton>

              <button
                type="button"
                onClick={handleResetForm}
                className="w-full border border-outline-variant hover:border-error/60 bg-surface-container-high/40 hover:bg-error-container/20 text-on-surface-variant hover:text-error font-label-md uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-surface-container-low"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar contenido
              </button>

              {mensajeExito && (
                <p className="text-green-400 font-bold mt-2 text-center text-body-md">
                  Mensaje enviado correctamente!!!
                </p>
              )}
            </div>
            
          </form>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant w-full flex flex-col justify-between">
          <h2 className="text-headline-sm text-primary mb-4 text-center">Ubicación de la Sede</h2>
          <div className="flex-1 w-full min-h-[380px] overflow-hidden rounded-xl border border-outline-variant/40">
            <iframe 
              title='Ubicacion de la sede'
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1811.7910222687208!2d-65.39242814284526!3d-24.741225272146295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc14f9aaaaaab%3A0x69dac60239564277!2sUniversidad%20Cat%C3%B3lica%20de%20Salta!5e0!3m2!1ses-419!2sar!4v1791832705706!5m2!1ses-419!2sar" 
              className="w-full h-full min-h-[380px] border-0"
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>  
  );
}
