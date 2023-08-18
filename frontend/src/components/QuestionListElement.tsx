import * as React from 'react';
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";

export interface Answer {
    id: number,
    answer: string,
    rightAnswer: boolean
}

export interface Question {
    id: number,
    question: string,
    answers: Array<Answer>
}

interface Props {
    question: Question
}

export const QuestionListElement = ({question}: Props) => {
    return (
        <Paper sx={{
            padding: 2, borderRadius: 2, border: "1px solid", borderColor: "primary.dark",
            margin: "6px", textAlign: "center", backgroundColor: "background.paper"
        }}>
            {question.question}
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} sx={{justifyContent: "center"}}>
                {question.answers.map((answer: Answer, index: number) => (<Grid item xs={5} sx={{
                        padding: 2, borderRadius: 2, border: "1px solid",
                        borderColor: "primary.dark", margin: "5px"
                    }} key={index}>{answer.answer}</Grid>)
                )}
            </Grid>
        </Paper>
    );
};