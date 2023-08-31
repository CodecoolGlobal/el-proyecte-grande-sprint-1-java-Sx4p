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
            const quizToSave: Quiz = {
                id: quiz.id, userId: 1, name: title, questions: questions,
                creationDate: new Date(), difficulty: difficulty
            };
            onSave(quizToSave, navigate);
        }
    }

    const handleSaveQuestion = (question: string, correctAnswer: string, wrongAnswers: string[]): void => {
        const answers: Answer[] = [...wrongAnswers, correctAnswer]
            .map(answer => ({answer: answer, rightAnswer: answer === correctAnswer}));
        const questionForSave: Question = {question: question, answers: answers}
        setQuestions([...questions, questionForSave]);
    }

    const handleDeleteQuestion = (questionName: string): void => {
        const newQuestions: Question[] = questions.filter((question: Question): boolean => question.question !== questionName);
        setQuestions(newQuestions);
    }

    return (
        <form action="/">
            <FormControl sx={{width: "90%", marginLeft: "5%"}}>
                <FormLabel sx={{
                    fontSize: "40px",
                    color: "text.primary",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)",
                    margin: "auto",
                }}>
                    {quiz.name ? "Edit Quiz" : "Create Quiz"}
                </FormLabel>
                <FormGroup sx={{
                    padding: 8,
                    marginTop: "10px",
                    borderRadius: "50px",
                    backgroundColor: "primary.light",
                    color: "black"
                }}>
                    <TextField label="Title" sx={{marginBottom: 5, input: {color: "black"}}}
                               name="title" variant="outlined" placeholder="Title of the quiz"
                               defaultValue={quiz.name}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                    <Typography component="legend" sx={{
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                        fontSize: "20px",
                        color: "black"
                    }}>
                        Difficulty:
                    </Typography>
                    <RadioGroup row defaultValue={quiz.difficulty}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDifficulty(e.target.value)}>
                        <FormControlLabel name="diff" value="EASY" control={<Radio/>} label="Easy"></FormControlLabel>
                        <FormControlLabel name="diff" value="MEDIUM" control={<Radio/>}
                                          label="Medium"></FormControlLabel>
                        <FormControlLabel name="diff" value="HARD" control={<Radio/>} label="Hard"></FormControlLabel>
                    </RadioGroup>
                    <>
                        <Stack direction={{xs: 'column', md: 'row'}}
                               spacing={{sx: 2, md: "79%"}}
                               sx={{display: 'flex', alignItems: 'center', flexGrow: 1, margin: "5px"}}>
                            <Typography component="legend" sx={{
                                marginTop: 4,
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                                fontSize: "20px",
                                color: "black"
                            }}>
                                {questions.length > 0 ? "Added Questions:" : "Add Question:"}
                            </Typography>
                            <AddQuestionPopup handleSaveQuestion={handleSaveQuestion}/>
                        </Stack>
                        {questions.length > 0 &&
                            <Stack sx={{
                                minHeight: "20vh", maxHeight: "40vh", overflow: "auto", borderRadius: "50px",
                                border: "2px solid", borderColor: "primary.main", padding: "10px",
                                '&::-webkit-scrollbar': {display: "none"}
                            }}>
                                {questions.map((question: Question, index: number) => (
                                    <QuestionListElement handleDeleteQuestion={handleDeleteQuestion} question={question}
                                                         key={index}/>))}
                            </Stack>}
                    </>
                    <Button variant="outlined" onClick={submitQuiz}
                            sx={{
                                borderRadius: "50px", marginTop: "30px", width: "15%", marginLeft: "auto",
                                backgroundColor: "secondary.main", color: "text.primary",
                                '&:hover': {backgroundColor: "primary.light", color: "primary.main"}
                            }}>
                        Submit
                    </Button>
                </FormGroup>
            </FormControl>
            {isInvalidQuiz && <ErrorAlert message={"Please fill out every field!"}/>}
        </form>
    );
}