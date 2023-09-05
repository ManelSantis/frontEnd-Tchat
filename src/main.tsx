import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx';
import Cadastro from './pages/Cadastro/cadastro.tsx';
import Criacao from './pages/CriacaoSala/criacaoSala.tsx';
import MainPage from './pages/MainPage/mainPage.tsx';
import Sala from './pages/Sala/sala.tsx';


const router = createBrowserRouter(
  createRoutesFromElements(
      <>
        <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/mainpage" element={<MainPage />}>
          <Route path="/mainpage/criacaoSala" element={<Criacao />} />
          <Route path="/mainpage/sala/:groupName/:groupId" element={<Sala />} />
        </Route>
      </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
