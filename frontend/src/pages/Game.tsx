import {ReactElement, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Question from "../components/Question";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useNavigate, useSearchParams} from "react-router-dom";
import QuizSummary from "../components/QuizSummary";
import {CardMedia} from "@mui/material";
import quizLogo from "../images/quizlogo.png";

interface Quiz {
    id: number,
    creationDate: string,
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
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    const quizId = searchParams.get("quiz");

    const fetchQuiz = async () => {
        const res = await fetch("/api/quiz/" + quizId, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        });
        if (res.status != 403) {
            if (res.status != 404) {
                const data = await res.json();
                setQuiz(data);
                console.log(data);
            } else navigate(quizNotFoundUrl);
        } else {
            localStorage.clear();
            navigate("/login");
        }
    }

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setCorrectAnswers(correctAnswers + 1);
        }
        if (currentRound !== quiz?.questions.length) {
            setCurrentRound(currentRound + 1);
        } else {
            setGameFinished(true);
        }
    }

    useEffect(() => {
        if (quizId == null) {
            navigate(quizNotFoundUrl);
        }
        fetchQuiz();

    }, []);

    if (quiz != null) {
        return (<>
            <Container
                sx={{
                    backgroundColor: "background.paper",
                    width: "80vw",
                    borderRadius: "50px",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    marginBottom: "30px"
                }}>
                {gameFinished ? <QuizSummary correctAnswers={correctAnswers}
                                             incorrectAnswers={quiz.questions.length - correctAnswers}/> :
                    <>
                        <Typography variant={"h4"}
                                    color={"black"}>Question {currentRound} of {quiz.questions.length}:</Typography>
                        <Typography color={"black"}>Correct: {correctAnswers}</Typography>
                        <Box sx={{marginTop: "10px"}}>
                            <CardMedia sx={{padding: "1em 1em 0 1em", objectFit: "contain"}}
                                       object-fit={"none"} component={"img"}
                                       height="150px"
                                       width="150px"
                                       image={quizLogo}
                            />
                            <Question onAnswer={handleAnswer} question={quiz.questions[currentRound - 1]}/>
                        </Box>
                    </>}
            </Container>
        </>)
            ;
    } else return <></>;
}

export default Game;
