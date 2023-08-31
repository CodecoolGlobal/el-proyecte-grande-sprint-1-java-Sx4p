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

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
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
                main: '#2196f3',
                light: '#3ec8fe',
                dark: '#1d6fb1',
            },
            secondary: {
                main: '#d50000',
            },
            background: {
                default: '#e1f5fe',
                paper: 'rgba(255,255,255,0.9)',
            },
            text: {
                primary: '#000000',
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
