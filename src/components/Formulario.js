import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

   // El UseContext utiliza un context personalizado en este caso se creo y guarda todos los state, para utilizarlo es desde el padre y despues puede utilizar nota es necesario importar el archivo de esta forma se pueden extraer los datos   
   const { categorias } = useContext(CategoriasContext);
   const { buscarRecetas, guardarConsultar } = useContext(RecetasContext)
   const [busqueda, guardarBusqueda] = useState({
      nombre: '',
      categoria: ''
   });

   const { nombre, categoria } = busqueda;

   // Funcion para leer los datos
   const obtenerDatosReceta = e => {
      guardarBusqueda({
         ...busqueda,
         [e.target.name] : e.target.value
      });
   };

   return ( 
      <form
         className="col-12"
         onSubmit={ e => {
            e.preventDefault();
            buscarRecetas(busqueda);
            guardarConsultar(true);
         }}
      >
         <fieldset className="text-center">
            <legend>Busca bebidas por Categoría o Ingrediente</legend>
         </fieldset>
         <div className="row mt-4">
            <div className="col-md-4">
               <input 
                  type="text" 
                  className="form-control" 
                  name="nombre"
                  placeholder="Buscar por Ingrediente"
                  onChange={obtenerDatosReceta}
                  value={nombre}
               />
            </div>
            <div className="col-md-4">
               <select 
                  name="categoria"
                  className="form-control"
                  onChange={obtenerDatosReceta}
                  value={categoria}
               >
                  <option value="">-- Seleccione Categoría --</option> 
                  {categorias.map(categoria => (
                     <option
                        key={categoria.strCategory}
                        value={categoria.strCategory}
                     >{categoria.strCategory}</option>
                  ))}         
               </select>
            </div>
            <div className="col-md-4">
               <input 
                  type="submit"
                  value="Buscar Bebidas" 
                  className="btn btn-block btn-primary"
               />
            </div>
         </div>
      </form>
   );
}

export default Formulario;