import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

// Crear el Context
export const CategoriasContext = createContext();

// Provider es donde se encuentra las funciones y state

const CategoriasProvider = (props) => {

   // Crear el state del Context
   const [categorias, guardarCategorias] = useState([]);
   
   // Ejecutar el llamado a la api
   useEffect(() => {
      const obtenerCategorias = async () => {
         const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
         const categorias = await axios.get(url);         
         guardarCategorias(categorias.data.drinks);
      }
      // `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin&c=${categoria}`
      obtenerCategorias();
   },[])
   return (
      <CategoriasContext.Provider
         value={{ 
            categorias
         }}
      >
         { props.children }
      </CategoriasContext.Provider>
   );

};

export default CategoriasProvider;