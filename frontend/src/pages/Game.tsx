import {ReactElement, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Question from "../components/Question";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate, useSearchParams} from "react-router-dom";

interface Quiz {
    id: number,
    creationDate: string,
    //userId: number,
    difficulty: string,
    name: string,
    questions: QuizQuestion[]
}

export interface QuizQuestion {
    id: number,
    question: string,
    answers: QuizAnswer[]
}

export interface QuizAnswer {
    id: number,
    answer: string,
    rightAnswer: boolean
}

const quizNotFoundUrl = "/quiz404";

function Game(): ReactElement {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const [currentRound, setCurrentRound] = useState(1);
    const [quiz, setQuiz] = useState<Quiz|null>(null);

    const quizId = searchParams.get("quiz");

    const fetchQuiz = async () => {
        const res = await fetch("/api/quiz/" + quizId);
        if(res.status != 404){
            const data = await res.json();
            setQuiz(data);
            console.log(data);
        } else navigate(quizNotFoundUrl);
    }

    useEffect(() => {
        if(quizId == null){
            navigate(quizNotFoundUrl);
        }
        fetchQuiz();

    }, []);

    if (quiz != null) {
        return <>
            <Container
                sx={{backgroundColor: "background.paper", width: "80vw", height: "80vh", borderRadius: "50px", paddingTop: "30px"}}>
                <Typography variant={"h4"}
                            color={"black"}>Question {currentRound} of {quiz.questions.length}:</Typography>
                <Box sx={{marginTop: "15vh"}}>
                    <Question question={quiz.questions[currentRound - 1]}/>
                </Box>
            </Container>
            <Button onClick={() => setCurrentRound(currentRound + 1)}>next</Button>
        </>;
    } else return <></>;
}

export default Game;