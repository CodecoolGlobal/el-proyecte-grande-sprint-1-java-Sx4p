import React from 'react';
import QuizForm, {Quiz} from "../components/QuizForm";
import {NavigateFunction} from "react-router-dom";

const addQuizToDB = (quizData: Quiz, navigate: NavigateFunction) => {
    return fetch(`/api/quiz/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
    })
        .then(() => navigate("/list"));
};
const QuizCreator = () => {
    return (
        <div>
            <QuizForm quiz={{id: 0, userId: 0, name: "", questions: [], creationDate: new Date(), difficulty: ""}}
                      onSave={addQuizToDB}/>
        </div>
    );
};

export default QuizCreator;
