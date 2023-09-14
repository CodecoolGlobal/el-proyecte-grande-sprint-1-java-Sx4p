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
                        backgroundColor: "#f1f0fc", boxShadow: 3, color: "black", width: "100%"
                    }}>
                    <Typography sx={{color: "black", textAlign: "center"}}>{answerText}</Typography>
                </Paper>
            </IconButton>
        </>
    );
}

export default Answer;