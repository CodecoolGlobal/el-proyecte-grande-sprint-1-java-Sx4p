import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import {Theme} from "@emotion/react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import QuizList from "./components/QuizList";
import QuizCreator from "./pages/QuizCreator";
import QuizUpdater from "./pages/QuizUpdater";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/list",
                element: <QuizList editable={false} siteTitle={"Available quizzes"} fetchUrl={"/api/quiz/all/details"}/>
            },
            {
                path: "/myquizzes",
                element: <QuizList editable={true} siteTitle={"Quizzes made by USERNAME"}
                                   fetchUrl={"/api/quiz/all/details"}/>
            },
            {
                path: "/create/quiz",
                element: <QuizCreator/>
            },
            {
                path: "/edit/quiz/:id",
                element: <QuizUpdater/>
            }
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
            primary: {
                main: '#6457f7',
                light: '#ffffff',
                dark: '#fa6705',
            },
            secondary: {
                main: '#fa6705'
            },
            background: {
                default: '#000000',
                paper: '#ffffff',
            },
            text: {
                primary: '#ffffff',
            },
        },
        typography: {
            fontFamily: 'Rubik',
            fontSize: 15,
            fontWeightLight: 200,
            fontWeightBold: 700,
            button: {
                fontFamily: 'PT Sans',
            },
        },
    }
);

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </>
    );
}

export default App;
