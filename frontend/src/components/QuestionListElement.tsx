import * as React from 'react';
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from "@mui/material/Typography";

export interface Answer {
    answer: string,
    rightAnswer: boolean
}

export interface Question {
    question: string,
    answers: Array<Answer>
}

interface Props {
    question: Question
    handleDeleteQuestion: (questionName: string) => void;
}

export const QuestionListElement = ({question, handleDeleteQuestion}: Props) => {
    return (
        <Paper sx={{
            padding: 2, borderRadius: "50px", boxShadow: 3,
            margin: "6px", textAlign: "center", backgroundColor: "#f1f0fc", color: "black"
        }}>
            <Typography sx={{
                alignItems: 'center',
                marginBottom: '10px',
                fontWeight: '600'
            }}>
                {question.question}
                <Button sx={{borderRadius: "50px", marginLeft: 1}}
                        onClick={() => handleDeleteQuestion(question.question)}>
                    <DeleteForeverIcon/>
                </Button>
            </Typography>

            <Grid container rowSpacing={1} direction={{xs: 'column', md: 'row'}} columnSpacing={{xs: 1, sm: 2, md: 3}}
                  sx={{justifyContent: "center"}}>
                {question.answers.map((answer: Answer, index: number) => (<Grid item xs={5} key={index}>
                        <Paper
                            sx={{
                                padding: 2, borderRadius: "50px", margin: "5px",
                                backgroundColor: "primary.light", boxShadow: 3, color: "black"
                            }}>
                            {answer.answer}
                        </Paper>
                    </Grid>)
                )}
            </Grid>
        </Paper>
    );
};