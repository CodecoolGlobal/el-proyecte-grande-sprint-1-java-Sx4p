import {ReactElement} from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent} from "@mui/material";
import Button from "@mui/material/Button";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import {QuizDetails} from "./QuizList";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteQuizButton from "./DeleteQuizButton";
import {useNavigate} from "react-router-dom";

export default function QuizListElement({id, name, author, numberOfQuestions, difficulty, editable}: QuizDetails): ReactElement {
    const navigate = useNavigate();

    const handleDeleteQuiz = async () => {
        console.log(id);
        const res = await fetch("/api/quiz/" + id, {
            method: "DELETE"
        });
        if (res.ok) {
            window.location.reload();
        } else {
            //TODO display error message
        }
    };

    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <Card variant={"outlined"}
                      sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: {xs: "column", md: "row"},
                          borderRadius: "30px",
                          backgroundColor: "#938aff",
                          paddingRight: "8px",
                          marginBottom: "5px"
                      }}>
                    <CardContent
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "80%",
                            justifyContent: "space-between",
                            flexDirection: {xs: "column", md: "row"},
                            borderRadius: "30px",
                            backgroundColor: "primary.main",
                            boxShadow: "5px 0px 6px rgba(0, 0, 0, 0.2)"
                        }}>
                        <Typography variant={"h6"} fontWeight={"bold"} width={"30%"}
                                    textAlign={{xs: "center", md: "left"}}>
                            {name}
                        </Typography>
                        <Typography>
                            Questions: {numberOfQuestions}
                        </Typography>
                        <LightbulbIcon htmlColor={difficulty} sx={{backgroundColor: "#938aff", borderRadius: "50px"}}/>
                        <Typography>
                            Author: {author}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size={"medium"} variant={"contained"}
                                sx={{borderRadius: "30px"}}><PlayArrowIcon/></Button>
                        {editable && <Button size={"medium"} variant={"contained"}
                                             onClick={() => navigate("/edit/quiz/" + id)} sx={{borderRadius: "30px"}}>
                            <EditIcon/>
                        </Button>}
                        <DeleteQuizButton handleDeleteQuiz={handleDeleteQuiz} quizName={name}/>
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
}