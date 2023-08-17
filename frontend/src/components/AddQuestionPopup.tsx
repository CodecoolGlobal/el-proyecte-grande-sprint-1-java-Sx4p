import * as React from 'react';
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {ChangeEvent, useState} from "react";

interface Props {
    handleSaveQuestion: Function
}

export const AddQuestionPopup = ({handleSaveQuestion}: Props) => {
    const [open, setOpen] = React.useState(false);
    const [questionName, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [answers, setAnswers] = useState(["", "", ""]);

    const handleWrongAnswers = (event: ChangeEvent<HTMLTextAreaElement>, index: number): void => {
        const newValue: string = event.currentTarget.value;

        setAnswers((oldAnswers: string[]) => {
            let copy: string[] = [...oldAnswers];
            copy[index] = newValue;
            return copy;
        })
    }

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <Box textAlign="center">
            <Button variant="outlined" onClick={handleClickOpen}
                    sx={{margin: "5px", backgroundColor: "background.paper"}}>
                Add new question
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new question to the quiz</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new question, and four answers, where one of them is the correct answer!
                    </DialogContentText>
                    <TextField autoFocus margin="dense" id="question" label="Question" type="question" fullWidth
                               variant="standard"
                               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}/>
                    <TextField autoFocus margin="dense" id="right" label="Correct answer" type="right" fullWidth
                               variant="standard"
                               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCorrectAnswer(e.target.value)}/>
                    {answers.map((answer: string, index: number) => (
                        <TextField autoFocus margin="dense" key={index} label="Answer" type="right"
                                   fullWidth
                                   variant="standard"
                                   value={answer}
                                   onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleWrongAnswers(e, index)}/>))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose();
                        handleSaveQuestion(questionName, correctAnswer, answers)
                        setAnswers(["", "", ""])
                    }}>Add question</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};