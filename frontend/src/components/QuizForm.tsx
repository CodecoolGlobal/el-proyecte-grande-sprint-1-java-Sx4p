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
import {FormEvent, ReactElement, useState} from "react";
import {Question, Answer, QuestionListElement} from "./QuestionListElement";
import {AddQuestionPopup} from "./AddQuestionPopup";
import {useNavigate} from "react-router-dom";
import {QuizDifficulty} from "../pages/QuizList";
import {Quiz} from "@mui/icons-material";

interface Quiz {
    id: number,
    userId: number,
    name: string,
    questions: Question[],
    creationDate: Date,
    difficulty: string
}

const addQuizToDB = (quizData: Quiz) => {
    return fetch(`/api/quiz/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
    }).then((res) => res.json());
};

export default function QuizForm(): ReactElement {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);

    function submitQuiz(e: FormEvent<HTMLFormElement>, questions: Question[]): void {
        e.preventDefault();
        const formData: FormData = new FormData(e.currentTarget);
        const entries: { [p: string]: FormDataEntryValue } = Object.fromEntries(formData.entries());

        const quiz: Quiz = {
            id: 3, userId: 1, name: entries.title.toString(), questions: questions,
            creationDate: new Date(), difficulty: entries.diff.toString()
        };
        console.log(quiz)

        addQuizToDB(quiz).then(r => {
            setQuestions([]);
            navigate("/list")
        })

    }

    const handleSaveQuestion = (question: string, correctAnswer: string, wrongAnswers: string[]) => {
        let questionIdCounter = 1;
        const answers: Answer[] = [...wrongAnswers, correctAnswer]
            .map(answer => ({id: 0, name: answer, correct: answer === correctAnswer}));
        const questionForSave: Question = {id: questionIdCounter, name: question, answers: answers}
        setQuestions([...questions, questionForSave]);
        questionIdCounter++;
    }

    return (
        <form action="/" onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitQuiz(e, questions)}>
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
                        <FormControlLabel name="diff" value="EASY" control={<Radio/>} label="Easy"></FormControlLabel>
                        <FormControlLabel name="diff" value="MEDIUM" control={<Radio/>}
                                          label="Medium"></FormControlLabel>
                        <FormControlLabel name="diff" value="HARD" control={<Radio/>} label="Hard"></FormControlLabel>
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
                        //TODO
{/*                        {questions.map((question: Question, index: number) => (
                            <QuestionListElement question={question} key={index}/>))}*/}
                    </Stack>
                    <AddQuestionPopup handleSaveQuestion={handleSaveQuestion}/>
                    <Button type="submit" variant="outlined" sx={{backgroundColor: "background.paper"}}>Submit</Button>
                </FormGroup>
            </FormControl>
        </form>
    );
}