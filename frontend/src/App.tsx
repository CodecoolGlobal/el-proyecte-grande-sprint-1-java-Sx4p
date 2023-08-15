import React, { createContext} from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import {Theme} from "@emotion/react";
import {createTheme} from "@mui/material/styles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
    ]
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

const theme: Theme = createTheme(
    {
      palette: {
        mode: 'light',
        primary: {
          main: '#128792',
        },
        secondary: {
          main: '#f50000',
        },
      },
      typography: {
        fontFamily: 'Droid Serif',
      },
    }
);
export const ThemeContext = createContext(theme);

function App() {
  return (
      <ThemeContext.Provider value={theme}>
        <div>
          <RouterProvider router={router}/>
        </div>
      </ThemeContext.Provider>
  );
}

export default App;
