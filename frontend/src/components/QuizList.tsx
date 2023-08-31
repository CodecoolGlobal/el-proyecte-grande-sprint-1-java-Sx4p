import {ReactElement, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import QuizListElement from "./QuizListElement";

export enum QuizDifficulty {
    EASY = "#2b9f00",
    MEDIUM = "#f5c400",
    HARD = "#c90d00"
}

type DifficultyDescription = "EASY" | "MEDIUM" | "HARD";

export interface QuizDetails {
    id: number,
    name: string,
    numberOfQuestions: number,
    difficulty: string,
    author: string,
    editable: boolean
}

interface Props {
    siteTitle: string,
    fetchUrl: string,
    editable: boolean
}

function QuizList({fetchUrl, siteTitle, editable}: Props): ReactElement {
    const [quizzes, setQuizzes] = useState<QuizDetails[] | null>(null);

    const fetchQuizzes = async () => {
        const res = await fetch(fetchUrl);
        const data = await res.json();

        console.log(data);
        setQuizzes(data);
    }

    useEffect(() => {
        fetchQuizzes();
    }, []);

    if (quizzes) {
        return (
            <Container maxWidth={"lg"}>
                <Typography variant={"h4"} mb={4}>
                    {siteTitle}
                </Typography>
                <Stack>
                    {quizzes.map((quiz: QuizDetails, i: number) => (
                        <QuizListElement key={i}
                                         id={quiz.id}
                                         name={quiz.name}
                                         numberOfQuestions={quiz.numberOfQuestions}
                                         difficulty={QuizDifficulty[quiz.difficulty as DifficultyDescription]}
                                         author={quiz.author}
                                         editable={editable}/>
                    ))}
                </Stack>
            </Container>
        );
    } else return <></>;
}

export default QuizList;