import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: []
  }
]);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
