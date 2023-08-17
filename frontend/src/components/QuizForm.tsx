import * as React from "react";
import {
    Button,
    FormControlLabel,
    FormGroup, RadioGroup,
    TextField,
    Typography,
    Stack,
    FormLabel, FormControl
} from "@mui/material";
import Radio from '@mui/material/Radio';
import {FormEvent} from "react";
import {Question, QuestionListElement} from "./QuestionListElement";
import {AddQuestionPopup} from "./AddQuestionPopup";
import Box from "@mui/material/Box";
import {NavigateFunction, useNavigate} from "react-router-dom";

function submitQuiz(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log(e);
}


const testQuestions: Question[] = [
    {
        id: 1, name: "Q1", answers: [{id: 1, name: "A1", correct: false},
            {id: 2, name: "A2", correct: false},
            {id: 3, name: "A3", correct: false},
            {id: 4, name: "A4", correct: false}]
    },
    {
        id: 2, name: "Q2", answers: [{id: 1, name: "A1", correct: false},
            {id: 2, name: "A2", correct: false},
            {id: 3, name: "A3", correct: false},
            {id: 4, name: "A4", correct: false}]
    },
    {
        id: 2, name: "Q2", answers: [{id: 1, name: "A1", correct: false},
            {id: 2, name: "A2", correct: false},
            {id: 3, name: "A3", correct: false},
            {id: 4, name: "A4", correct: false}]
    }
]

export default function QuizForm() {
    return (
        <form action="/" onSubmit={submitQuiz}>
            <FormControl sx={{width: "90%", margin: "5%"}}>
                <FormLabel sx={{
                    fontSize: "40px",
                    color: "text.primary",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)",
                    margin: "auto"
                }}>Create / Edit Quiz</FormLabel>
                <FormGroup sx={{
                    padding: 3,
                    marginTop: "10px",
                    borderRadius: 2,
                    border: "3px solid",
                    borderColor: "primary.main",
                    backgroundColor: "background.default"
                }}>
                    <TextField label="Title" sx={{marginBottom: 2, backgroundColor: "background.paper"}}
                               name="title" variant="outlined" placeholder="Title of the quiz"/>
                    <Typography component="legend" sx={{
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                        fontSize: "20px",
                        color: "text.primary"
                    }}>Difficulty:</Typography>
                    <RadioGroup row>
                        <FormControlLabel value="easy" control={<Radio/>} label="Easy"></FormControlLabel>
                        <FormControlLabel value="medium" control={<Radio/>} label="Medium"></FormControlLabel>
                        <FormControlLabel value="hard" control={<Radio/>} label="Hard"></FormControlLabel>
                    </RadioGroup>
                    <Typography component="legend" sx={{
                        marginTop: "5px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                        fontSize: "20px",
                        color: "text.primary"
                    }}>Added Questions:</Typography>
                    <Stack sx={{
                        minHeight: "20vh", maxHeight: "40vh", overflow: "auto", borderRadius: 2,
                        border: "2px solid", borderColor: "primary.main", padding: "10px", margin: "5px"
                    }}>
                        {testQuestions.map((question: Question) => (<QuestionListElement question={question}/>))}
                    </Stack>
                    <AddQuestionPopup/>
                    <Button type="submit" variant="outlined" sx={{backgroundColor: "background.paper"}}>Submit</Button>
                </FormGroup>
            </FormControl>
        </form>
    );
}