import {ReactElement} from "react";
import Answer from "./Answer";
import Grid from "@mui/material/Grid";
import {QuizAnswer, QuizQuestion} from "../pages/Game";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";


interface Props {
    question: QuizQuestion
    onAnswer: Function
}

function Question({question, onAnswer}: Props): ReactElement {
    return (
        <>
            <Paper
                sx={{
                    padding: 2,
                    borderRadius: "30px",
                    margin: "5px",
                    background: "linear-gradient(180deg, rgba(162,155,242,1) 0%, rgba(206,203,245,1) 100%)",
                    boxShadow: 3,
                    color: "black",
                    height: "15vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <Typography textAlign={"center"} variant={"h6"}>{question.question}</Typography>
            </Paper>
            <Grid container>
                {question.answers.map((answer: QuizAnswer, i: number) => (
                    <Grid item xs={12} md={6} key={i}>
                        <Answer onAnswer={onAnswer} answerText={answer.answer} correct={answer.rightAnswer}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Question;
