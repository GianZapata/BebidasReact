import React from 'react';
import Formulario from './components/Formulario';
import Header from './components/Header';
// Importar styled components npm i @emotion/styled @emotion/react 
import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContext';
import ListaReceta from './components/ListaReceta';
import ModalProvider from './context/ModalContext';

function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>
          <Header/>
          <div className="container mt-5">
            <div className="row">
              <Formulario/>
            </div>
            <ListaReceta/>
          </div>
        </ModalProvider>
      </RecetasProvider>    
    </CategoriasProvider>
  );
}

export default App;
