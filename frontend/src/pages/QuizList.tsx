import {ReactElement} from "react";
import Container from "@mui/material/Container";
import QuizListElement from "../components/QuizListElement";
import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

export enum QuizDifficulty {
    EASY = "#2b9f00",
    MEDIUM = "#f5c400",
    HARD = "#c90d00"
}

export interface QuizDetails {
    name: string,
    questionQuantity: number,
    difficulty: string,
    author: string
}

const testDetails: QuizDetails[] = [
    {name: "test1", questionQuantity: 3, difficulty: QuizDifficulty.HARD, author: "testuser"},
    {name: "test2", questionQuantity: 7, difficulty: QuizDifficulty.MEDIUM, author: "testuser"},
    {name: "test3", questionQuantity: 31, difficulty: QuizDifficulty.HARD, author: "testuser"},
    {name: "test4", questionQuantity: 45, difficulty: QuizDifficulty.HARD, author: "testuser"},
    {name: "test5", questionQuantity: 3, difficulty: QuizDifficulty.EASY, author: "testuser"},
    {name: "test6", questionQuantity: 7, difficulty: QuizDifficulty.EASY, author: "testuser"},
    {name: "test7", questionQuantity: 0, difficulty: QuizDifficulty.HARD, author: "testuser"},
    {name: "test8", questionQuantity: 0, difficulty: QuizDifficulty.HARD, author: "testuser"},
];

function QuizList(): ReactElement{
    return(
            <Container maxWidth={"lg"}>
                <Typography variant={"h4"} mb={4}>
                    Available quizzes:
                </Typography>
                <Stack>
                    {testDetails.map((testDetail: QuizDetails, i: number) => (
                        <QuizListElement key={i}
                                         name={testDetail.name}
                                         questionQuantity={testDetail.questionQuantity}
                                         difficulty={testDetail.difficulty}
                                         author={testDetail.author}
                        />
                    ))}
                </Stack>
            </Container>
        );
}

export default QuizList;