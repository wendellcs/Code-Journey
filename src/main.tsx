import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from './Pages/Home/index.tsx';
import { Dashboard } from './Pages/Dashboard/index.tsx';
import { Login } from './Pages/Login/index.tsx';
import App from './App.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{
      path: '/',
      element: <Home />
    },
    {
      path: '/dashboard',
      element: <Dashboard/>
    },
    {
      path: '/login',
      element: <Login/>
    }
  ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
