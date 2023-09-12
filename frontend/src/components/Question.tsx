import {ReactElement} from "react";
import Container from "@mui/material/Container";
import Answer from "./Answer";
import Grid from "@mui/material/Grid";
import {QuizAnswer, QuizQuestion} from "../pages/Game";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";


interface Props {
    question: QuizQuestion
}

function Question({question}: Props): ReactElement {
    return (
        <>
            <Paper
                sx={{
                    padding: 2, borderRadius: "10px", margin: "5px",
                    backgroundColor: "#f1f0fc", boxShadow: 3, color: "black"
                }}>
                <Typography textAlign={"center"} variant={"h6"}>{question.question}</Typography>
            </Paper>
            <Grid container>
                {question.answers.map((answer: QuizAnswer, i: number) => (
                    <Grid item xs={12} md={6} key={i}>
                        <Answer answerText={answer.answer}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Question;