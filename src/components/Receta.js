import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

const Receta = ({receta}) => {
   // Configuracion del modal de material-ui
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   // extrar los valores del contest
   const { informacion, guardarIdReceta, guardarInformacion } = useContext(ModalContext);
   // Extraer variables
   const { idDrink, strDrink, strDrinkThumb } = receta;

   // Muestra y formatea los ingredientes 
   const mostrarIngredientes = informacion => {
      let ingredientes = [];
      for(let i = 1; i < 10; i++ ) {
         if (informacion[`strIngredient${i}`]) {
            ingredientes.push(
               <li key={i}>
                  {informacion[`strIngredient${i}`]}
                  {informacion[`strMeasure${i}`]}
               </li>               
            )
         }
      }
      return ingredientes;
   }
   return ( 
      <div className="col-md-4 mb-3">
         <div className="card">
            <h2 className="card-header">{strDrink}</h2>
            <img className="card-img-top" src={strDrinkThumb} alt={`Imagen de ${strDrink}`} />
            <div className="card-body">
               <button
                  type="button"
                  className="btn btn-block btn-primary"
                  onClick={() => {
                     guardarIdReceta(idDrink)
                     handleOpen()
                  }}
               >Ver Receta</button>
            <Modal
               aria-labelledby="transition-modal-title"
               aria-describedby="transition-modal-description"
               open={open}
               onClose={() => {
                  guardarIdReceta(null)
                  handleClose()
                  guardarInformacion({})
               }}
               closeAfterTransition
               BackdropComponent={Backdrop}
               BackdropProps={{
                  timeout: 500,
               }}
            >
               <Fade in={open}>
                  <Box sx={style}>
                     <h2>{informacion.strDrink}</h2>
                     <h3 className="mt-4">Instrucciones</h3>
                     <p>
                        {informacion.strInstructions}
                     </p>
                     <img className="img-fluid my-4" src={informacion.strDrinkThumb} alt={informacion.strDrink}/>
                     <h3>Ingredientes y cantidades</h3>
                     <ul>
                        { mostrarIngredientes(informacion) }
                     </ul>
                  </Box>
               </Fade>
            </Modal>
            </div>
         </div>
      </div>
   );
}

export default Receta ;