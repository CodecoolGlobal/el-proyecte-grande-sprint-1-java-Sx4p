import * as React from 'react';
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {ChangeEvent, useEffect, useState} from "react";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Alert from "@mui/material/Alert";

interface Props {
    handleSaveQuestion: Function
}

export const AddQuestionPopup = ({handleSaveQuestion}: Props) => {
    const [open, setOpen] = React.useState(false);
    const [questionName, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [answers, setAnswers] = useState(["", "", ""]);
    const [isInvalidQuestion, setIsInvalidQuestion] = useState(false);

    const handleWrongAnswers = (event: ChangeEvent<HTMLTextAreaElement>, index: number): void => {
        const newValue: string = event.currentTarget.value;

        setAnswers((oldAnswers: string[]) => {
            let copy: string[] = [...oldAnswers];
            copy[index] = newValue;
            return copy;
        })
    }

    useEffect(() => {
        const checkAnswers: string[] = answers.filter((answer: string): boolean => answer !== "");
        if (questionName !== "" || correctAnswer !== "" || checkAnswers.length > 0) {
            setIsInvalidQuestion(false)
        }
    }, [questionName, correctAnswer, answers]);


    const checkValidQuestionAndAnswers = (): void => {
        const checkAnswers: string[] = answers.filter((answer: string): boolean => answer === "");
        if (questionName === "" || correctAnswer === "" || checkAnswers.length > 0) {
            setIsInvalidQuestion(true);
        } else {
            handleClose();
            handleSaveQuestion(questionName, correctAnswer, answers);
            setQuestion("");
            setCorrectAnswer("");
            setAnswers(["", "", ""]);
            setIsInvalidQuestion(false);
        }
    }

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setQuestion("");
        setCorrectAnswer("");
        setAnswers(["", "", ""]);
        setIsInvalidQuestion(false);
        setOpen(false);
    };

    return (
        <Box textAlign="center">
            <Button variant="contained" onClick={handleClickOpen}
                    sx={{
                        borderRadius: "50px", backgroundColor: "secondary.main", color: "text.primary",
                        '&:hover': {backgroundColor: "primary.light", color: "primary.main"}
                    }}>
                <PostAddIcon/>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{color: "primary.main"}}>
                    Add new question to the quiz
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new question, and four answers, where one of them is the correct answer!
                    </DialogContentText>
                    <TextField autoFocus margin="dense" id="question" label="Question" type="question" fullWidth
                               variant="standard" sx={{input: {color: "black"}}}
                               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
                    />
                    <TextField autoFocus margin="dense" id="right" label="Correct answer" type="right" fullWidth
                               variant="standard" sx={{input: {color: "black"}}}
                               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCorrectAnswer(e.target.value)}
                    />
                    {answers.map((answer: string, index: number) => (
                        <TextField autoFocus margin="dense" key={index} label="Answer" type="right"
                                   fullWidth
                                   variant="standard"
                                   value={answer}
                                   sx={{input: {color: "black"}}}
                                   onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleWrongAnswers(e, index)}
                        />))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{borderRadius: "30%"}}>
                        Cancel
                    </Button>
                    <Button onClick={checkValidQuestionAndAnswers} sx={{borderRadius: "30%"}}>
                        Add question
                    </Button>
                </DialogActions>
                <Snackbar open={isInvalidQuestion} autoHideDuration={5000} onClose={() => setIsInvalidQuestion(false)}>
                    <Alert severity={"error"}>
                        Please fill out every field!
                    </Alert>
                </Snackbar>
            </Dialog>
        </Box>
    );
};