import {ReactElement, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {Box, LinearProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import QuizListElement from "./QuizListElement";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<QuizDetails[] | null>(null);

    const fetchQuizzes = async () => {
        const res = await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        });
        if (res.status === 200) {
            const data = await res.json();
            setQuizzes(data);
        } else {
            localStorage.clear();
            navigate("/login");
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
        setQuizzes(null);
        fetchQuizzes();
    }, [fetchUrl]);

    return (
        <Container maxWidth={"lg"}>
            <Typography variant={"h4"} mb={4}>
                {siteTitle}
            </Typography>
            <Stack bgcolor={"primary.light"} padding={"30px"} borderRadius={"40px"}>
                {quizzes ?
                    (
                        <>
                            {quizzes.map((quiz: QuizDetails, i: number) => (
                                <QuizListElement key={i}
                                                 id={quiz.id}
                                                 name={quiz.name}
                                                 numberOfQuestions={quiz.numberOfQuestions}
                                                 difficulty={QuizDifficulty[quiz.difficulty as DifficultyDescription]}
                                                 author={quiz.author}
                                                 editable={editable}/>
                            ))}
                        </>
                    ) :
                    (<Box sx={{width: '100%'}}>
                        <LinearProgress sx={{height: "10px", borderRadius: "50px"}}/>
                    </Box>)
                }
            </Stack>
        </Container>
    );
}

export default QuizList;