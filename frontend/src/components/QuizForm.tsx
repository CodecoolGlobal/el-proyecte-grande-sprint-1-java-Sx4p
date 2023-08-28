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
import {ReactElement, useEffect, useState} from "react";
import {Question, Answer, QuestionListElement} from "./QuestionListElement";
import {AddQuestionPopup} from "./AddQuestionPopup";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Quiz} from "@mui/icons-material";
import ErrorAlert from "./ErrorAlert";

export interface Quiz {
    id: number,
    userId: number,
    name: string,
    questions: Question[],
    creationDate: Date,
    difficulty: string
}

interface Props {
    quiz: Quiz
    onSave: (quiz: Quiz, navigate: NavigateFunction) => void;
}

export default function QuizForm({quiz, onSave}: Props): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [isInvalidQuiz, setIsInvalidQuiz] = useState(false);

    useEffect(() => {
        setQuestions(quiz.questions);
        setTitle(quiz.name);
        setDifficulty(quiz.difficulty);
    }, []);

    useEffect(() => {
        if (title !== "" || difficulty !== "") {
            setIsInvalidQuiz(false)
        }
    }, [title, difficulty]);

    function submitQuiz(): void {

        if (title === "" || difficulty === "") {
            setIsInvalidQuiz(true);
        } else {
            const quiz: Quiz = {
                id: 3, userId: 1, name: title, questions: questions,
                creationDate: new Date(), difficulty: difficulty
            };
            onSave(quiz, navigate);
        }
    }

    const handleSaveQuestion = (question: string, correctAnswer: string, wrongAnswers: string[]): void => {
        const answers: Answer[] = [...wrongAnswers, correctAnswer]
            .map(answer => ({id: 0, answer: answer, rightAnswer: answer === correctAnswer}));
        const questionForSave: Question = {id: Math.floor(Math.random() * 500), question: question, answers: answers}
        setQuestions([...questions, questionForSave]);
    }

    const handleDeleteQuestion = (questionId: number): void => {
        const newQuestions: Question[] = questions.filter((question: Question): boolean => question.id !== questionId);
        setQuestions(newQuestions);
    }

    return (
        <form action="/">
            <FormControl sx={{width: "90%", margin: "5%"}}>
                <FormLabel sx={{
                    fontSize: "40px",
                    color: "text.primary",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)",
                    margin: "auto"
                }}>{quiz.name ? "Edit Quiz" : "Create Quiz"}</FormLabel>
                <FormGroup sx={{
                    padding: 3,
                    marginTop: "10px",
                    borderRadius: 2,
                    border: "3px solid",
                    borderColor: "primary.dark",
                    backgroundColor: "background.default"
                }}>
                    <TextField label="Title" sx={{marginBottom: 2, backgroundColor: "background.paper"}}
                               name="title" variant="outlined" placeholder="Title of the quiz"
                               defaultValue={quiz.name}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
                    <Typography component="legend" sx={{
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                        fontSize: "20px",
                        color: "text.primary"
                    }}>Difficulty:</Typography>
                    <RadioGroup row defaultValue={quiz.difficulty}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDifficulty(e.target.value)}>
                        <FormControlLabel name="diff" value="EASY" control={<Radio/>} label="Easy"></FormControlLabel>
                        <FormControlLabel name="diff" value="MEDIUM" control={<Radio/>}
                                          label="Medium"></FormControlLabel>
                        <FormControlLabel name="diff" value="HARD" control={<Radio/>} label="Hard"></FormControlLabel>
                    </RadioGroup>
                    {questions.length > 0 && <><Typography component="legend" sx={{
                        marginTop: "5px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                        fontSize: "20px",
                        color: "text.primary"
                    }}>Added Questions:</Typography>
                        <Stack sx={{
                            minHeight: "20vh", maxHeight: "40vh", overflow: "auto", borderRadius: 2,
                            border: "2px solid", borderColor: "primary.main", padding: "10px", margin: "5px"
                        }}>
                            {questions.map((question: Question, index: number) => (
                                <QuestionListElement handleDeleteQuestion={handleDeleteQuestion} question={question}
                                                     key={index}/>))}
                        </Stack></>}
                    <AddQuestionPopup handleSaveQuestion={handleSaveQuestion}/>
                    <Button variant="outlined" onClick={submitQuiz}
                            sx={{backgroundColor: "background.paper"}}>Submit</Button>
                </FormGroup>
            </FormControl>
            {isInvalidQuiz && <ErrorAlert message={"Please fill out every field!"}/>}
        </form>
    );
}