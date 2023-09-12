import {ReactElement} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";
import * as React from "react";

interface Props {
    answerText: String
}

function Answer({answerText}: Props):ReactElement{
    return (
        <>
            <Paper
                sx={{
                    padding: 2, borderRadius: "50px", margin: "5px",
                    backgroundColor: "#f1f0fc", boxShadow: 3, color: "black"
                }}>
                <Typography sx={{color: "black", textAlign: "center"}}>{answerText}</Typography>
            </Paper>
        </>
    );
}

export default Answer;