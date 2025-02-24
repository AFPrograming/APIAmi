import React from 'react'
import ReactDOM from 'react-dom/client' //Este módulo se utiliza para interactuar con el DOM en el navegador
import App from './pages/App'

//Crea un "root" de React
//Encuentra el elemento en el DOM con el id "root"
//.render(...) Renderiza el componente App dentro del elemento con id "root"
ReactDOM.createRoot(document.getElementById('root')).render(
  //Componente que envuelve a la aplicación para habilitar comprobaciones adicionales durante el desarrollo
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)