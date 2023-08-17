import {QuizDetails} from "../pages/QuizList";
import {ReactElement} from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, Divider, Paper, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function QuizListElement({name, author, questionQuantity, difficulty}: QuizDetails): ReactElement {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card variant={"outlined"} sx={{display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: {xs: "column", md: "row"}}}>
                <CardContent sx={{display: "flex", alignItems: "center", width: "80%", justifyContent: "space-between", flexDirection: {xs: "column", md: "row"}}}>
                    <Typography variant={"h6"} fontWeight={"bold"}>{name}</Typography>
                    <Typography>Questions: {questionQuantity}</Typography>
                    <Typography color={difficulty}>difficulty</Typography>

                    <Typography>Author: {author}</Typography>
                </CardContent>
                <CardActions>
                    <Button size={"medium"} variant={"outlined"}>Take quiz</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}