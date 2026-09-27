import React, { useState } from 'react';
import { useForm } from "react-hook-form";
export default function Contacto() {

  const { register, handleSubmit, reset , formState: {errors} } = useForm();
  const [mensajeExito, setMensajeExito] = useState(false);

  const onSubmit = (data) => {
    console.log(data)

    setMensajeExito(true)

    reset()

    setTimeout(() => {
      setMensajeExito(false);
    }, 2000);
  } 

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
      <div className="bg-surface-container-low p-space-xl rounded-xl border border-outline-variant max-w-md w-full text-center mt-8 mb-8">
        <h2 className="text-headline-sm text-primary mb-6">Formulario</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-space-md text-left">
          
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-on-surface-variant uppercase tracking-wider">Apellido y Nombre:</label>
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
            <label className="font-label-md text-on-surface-variant uppercase tracking-wider">Email:</label>
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
            <label className="font-label-md text-on-surface-variant uppercase tracking-wider">Texto:</label>
            <textarea 
              rows="4"
              placeholder='Ingrese un texto'
              className="w-full bg-surface-container-highest border border-outline-variant rounded-md px-3 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 resize-none"
              {...register("texto", {maxLength: 300})}
            />
          </div>

          <div className="mt-2">
            <button
              type='submit'
              className="w-full bg-primary text-on-primary font-label-md uppercase tracking-wider py-3 px-4 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-container-low"
            > 
              Enviar
            </button>
            {mensajeExito &&(
              <p className="text-green-600 font-bold mt-4">
                Mensaje enviado correctamente!!!
              </p>
            )}
          </div>
          
        </form>
      </div>
    </div>
  );
}
