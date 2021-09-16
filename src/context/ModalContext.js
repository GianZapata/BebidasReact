import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

   // State del provider
   const [ idreceta, guardarIdReceta ]  = useState(null);
   const [ informacion, guardarInformacion] = useState({});
   // Una vez que tenemos una receta, llamar la api

   useEffect(() => {
      const obtenerReceta = async () => {
         if(!idreceta) return;
         const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`; 
         const resultado = await axios.get(url);
         guardarInformacion(resultado.data.drinks[0]);
      };
      obtenerReceta();
   }, [idreceta])
   return ( 
      <ModalContext.Provider
         value={{ 
            informacion,
            guardarIdReceta,
            guardarInformacion
         }}
      >
         {props.children}
      </ModalContext.Provider>
   );
}

export default ModalProvider;

