import Typography from "@mui/material/Typography";
import {ReactElement} from "react";
import Container from "@mui/material/Container";
import {CardMedia} from "@mui/material";
import quizLogo from "../images/quizlogo.png";
import * as React from "react";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

interface Props {
    correctAnswers: number,
    incorrectAnswers: number
}

function QuizSummary({correctAnswers, incorrectAnswers}: Props): ReactElement {
    return (
        <Container sx={{textAlign: "center"}}>
            <CardMedia sx={{padding: "1em 1em 0 1em", objectFit: "contain"}}
                       object-fit={"none"} component={"img"}
                       height="150px"
                       width="150px"
                       image={quizLogo}
            />
            <Divider sx={{backgroundColor: "#efefef", light: "true", height: "5px", borderRadius: "50%"}}/>
            <Typography sx={{color: "primary.main", fontSize: "40px", margin: "5px", fontWeight: "bolder"}}>Game
                finished!</Typography>
            <Divider sx={{
                backgroundColor: "#efefef",
                light: "true",
                height: "5px",
                borderRadius: "50%",
                marginBottom: "40px"
            }}/>
            <Typography variant={"h6"} sx={{color: "green", fontWeight: "bolder"}}>Correct
                answers: {correctAnswers} </Typography>
            <Typography variant={"h6"} sx={{color: "red", fontWeight: "bolder"}}>Incorrect
                answers: {incorrectAnswers}</Typography>
            <Link to={"/list"}><Button sx={{
                borderRadius: "50px", marginTop: "50px", width: "20%", height: "50px",
                backgroundColor: "secondary.main", color: "text.primary", fontSize: "20px",
                '&:hover': {backgroundColor: "primary.light", color: "primary.main"}
            }}>Check Quizzes</Button></Link>
        </Container>
    );
}

export default QuizSummary;