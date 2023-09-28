import {ReactElement} from "react";
import Typography from "@mui/material/Typography";
import {IconButton, Paper} from "@mui/material";
import * as React from "react";

interface Props {
    answerText: String
    onAnswer: Function
    correct: boolean
}

function Answer({answerText, onAnswer, correct}: Props): ReactElement {
    return (
        <>
            <IconButton onClick={() => onAnswer(correct)} sx={{width: "100%"}}>
                <Paper
                    sx={{
                        padding: 2, borderRadius: "50px", margin: "5px",
                        backgroundColor: "#cecbf5", boxShadow: 3, color: "black", width: "100%",
                        "&:hover": { backgroundColor: "secondary.main" }
                    }}>
                    <Typography sx={{color: "black", textAlign: "center"}}>{answerText}</Typography>
                </Paper>
            </IconButton>
        </>
    );
}

export default Answer;
