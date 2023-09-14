import React, {useEffect, useState} from 'react';
import {NavigateFunction, useParams} from "react-router-dom";
import QuizForm, {Quiz} from "../components/QuizForm";
import {Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";

const getQuizById = (id: string) => {
    return fetch(`/api/quiz/${id}`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token"),
        },
    })
        .then((res: Response) => {
            if (res.ok) {
                return res.json();
            }
        });
}

const QuizUpdater = () => {
    const {id} = useParams();
    const [quiz, setQuiz] = useState<Quiz>();
    const [updateFailed, setUpdateFailed] = useState(false);

    const updateQuizInDB = (quiz: Quiz, navigate: NavigateFunction) => {

        return fetch(`/api/quiz/${quiz.id}`, {
            method: "PUT",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quiz),
        })
            .then((res: Response) => {
                if (res.status === 403) {
                    setUpdateFailed(true)
                } else {
                    navigate("/list");
                }
            });
    };

    useEffect((): void => {
        if (id !== undefined) {
            getQuizById(id).then(quiz => setQuiz(quiz))
        }
    }, [id])

    const render = () => {
        if (id === undefined) {
            return <div>No ID specified!</div>
        }
        if (quiz === undefined) {
            return <div>Not existing quiz!</div>
        }
        return <QuizForm quiz={quiz} onSave={updateQuizInDB}/>
    }

    return (
        <div>
            {render()}
            <Snackbar open={updateFailed} autoHideDuration={5000} onClose={() => setUpdateFailed(false)}>
                <Alert severity={"error"}>
                    No permission to edit this quiz!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default QuizUpdater;


