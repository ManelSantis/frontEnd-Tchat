import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx';
import Cadastro from './pages/Cadastro/cadastro.tsx';
import Criacao from './pages/CriacaoSala/criacaoSala.tsx';
import MainPage from './pages/MainPage/mainPage.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/criacaoSala",
    element: <Criacao />,
  },
  {
    path: "/mainPage",
    element: <MainPage />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
