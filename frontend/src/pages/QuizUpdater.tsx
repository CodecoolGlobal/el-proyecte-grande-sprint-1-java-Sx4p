import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import QuizForm, {Quiz} from "../components/QuizForm";

const getQuizById = (id: string) => {
    return fetch(`/api/quiz/${id}`).then((res: Response) => res.json());
}

const updateQuizInDB = (quiz: Quiz) => {
    return fetch(`/api/quiz/${quiz.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
    })
    //.then((res: Response) => res.json());
};

const QuizUpdater = () => {
    const {id} = useParams();
    const [quiz, setQuiz] = useState<Quiz>();

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
            return <div>Loading...</div>
        }
        return <QuizForm quiz={quiz} onSave={updateQuizInDB}/>
    }

    return (
        <div>
            {render()}
        </div>
    );
};

export default QuizUpdater;


