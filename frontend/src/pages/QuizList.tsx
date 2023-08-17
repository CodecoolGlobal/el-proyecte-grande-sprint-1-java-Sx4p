import {ReactElement, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import QuizListElement from "../components/QuizListElement";
import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Question} from "../components/QuestionListElement";

export const QuizDifficulty = {
    EASY: "#2b9f00",
    MEDIUM: "#f5c400",
    HARD: "#c90d00"
}

type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface QuizDetails {
    name: string,
    numberOfQuestions: number,
    difficulty: string,
    author: string
}

function QuizList(): ReactElement{
    const [quizzes, setQuizzes] = useState<QuizDetails[] | null>(null);

    const fetchQuizzes = async () => {
        const res = await fetch("/api/quiz/all/details");
        const data = await res.json();

        console.log(data)
        setQuizzes(data);
    }

    useEffect(() => {
        fetchQuizzes();
    },[]);

    if(quizzes){
        return(
                <Container maxWidth={"lg"}>
                    <Typography variant={"h4"} mb={4}>
                        Available quizzes:
                    </Typography>
                    <Stack>
                        {quizzes.map((quiz: QuizDetails, i: number) => (
                            <QuizListElement key={i}
                                             name={quiz.name}
                                             numberOfQuestions={quiz.numberOfQuestions}
                                             difficulty={QuizDifficulty[quiz.difficulty as Difficulty]}
                                             author={quiz.author}
                            />
                        ))}
                    </Stack>
                </Container>
            );
    } else return (<></>)
}

export default QuizList;