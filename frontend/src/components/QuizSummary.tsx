import Typography from "@mui/material/Typography";
import {ReactElement} from "react";

interface Props {
    correctAnswers: number,
    incorrectAnswers: number
}

function QuizSummary({correctAnswers, incorrectAnswers}: Props): ReactElement {
    return (
        <>
            <Typography variant={"h6"} color={"black"}>Game finished!</Typography>
            <Typography variant={"h6"} color={"black"}>Correct answers: {correctAnswers} Incorrect answers: {incorrectAnswers}</Typography>
        </>
    );
}

export default QuizSummary;