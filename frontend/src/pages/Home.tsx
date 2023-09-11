import QuizBuzzLogo from "../images/QuizBuzzLogo.png";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Card, CardContent, Fade, SvgIconTypeMap} from "@mui/material";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import Divider from '@mui/material/Divider';
import {OverridableComponent} from "@mui/material/OverridableComponent"
import VisibilitySensor from 'react-visibility-sensor';

interface Detail {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string },
    text: Array<string>
}

const details: Array<Detail> = [
    {
        icon: AllInclusiveIcon,
        text: ["Endless Quizzes", "Explore a wide range of quizzes on various topics. From history and science to pop culture and sports, there's something to pique your interest."]
    },
    {
        icon: QuizIcon,
        text: ["Custom Quizzes", "Create your own quizzes and share them with the world. Showcase your expertise and creativity."]
    },
    {
        icon: Diversity3Icon,
        text: ["Compete with Friends", "Challenge your friends and family to see who's the ultimate quiz champion. Share your scores and bragging rights on social media."]
    },
    {
        icon: SchoolIcon,
        text: ["Educational Fun", "Learn something new with every quiz you take. Our questions are carefully curated to be informative and engaging."]
    }
]

function Home() {
    const [active, setActive] = useState(false)

    return <>
        <Container sx={{textAlign: "center", padding: "0px", minHeight: "90vh", paddingBottom: "10vh"}}>
            <Container component={"img"} src={QuizBuzzLogo} alt={"QuizBuzz logo"} height={"auto"}/>
            <Typography sx={{fontSize: "30px"}}>Are you ready to test your knowledge, challenge your brain, and have a
                blast while doing it? Look no further!
                <Typography sx={{color: "primary.dark", fontSize: "30px", display: "inline"}}> QuizBuzz </Typography>
                is your one-stop destination for an exciting and
                educational quiz experience. Whether you're a trivia enthusiast or just looking for a fun way to spend
                your time, we've got something for everyone.</Typography>
            <Link to={"/list"}><Button sx={{
                borderRadius: "50px", marginTop: "50px", width: "20%", height: "70px",
                backgroundColor: "secondary.main", color: "text.primary", fontSize: "20px",
                '&:hover': {backgroundColor: "primary.light", color: "primary.main"}
            }}>Check Quizzes</Button></Link>
        </Container>
        <VisibilitySensor onChange={(isVisible: boolean) => setActive(isVisible)} partialVisibility={true}>
            <Fade in={active} timeout={2000}>
                <div>
                    <Divider sx={{backgroundColor: "#242426", light: "true", height: "10px"}}/>
                    <Container sx={{textAlign: "center", padding: "0px", marginTop: "20px"}}>
                        <Typography sx={{fontSize: "30px"}}>Why choose QuizBuzz?</Typography>
                        <Container sx={{
                            display: "flex",
                            overflowX: "scroll",
                            overflowY: "hidden",
                            marginTop: "15px",
                            marginBottom: "30px",
                            border: 2,
                            borderRadius: "20px",
                            borderColor: "#242426"
                        }}>
                            {details.map((detail: Detail) => (
                                <Card sx={{
                                    margin: "30px", minWidth: "350px", backgroundColor: "#242426",
                                    '&:hover': {backgroundColor: "#4b4b4d", color: "primary.dark"}
                                }}>
                                    <CardContent>
                                        <Typography variant="h5" margin="15px"
                                                    sx={{transform: "scale(2.0)", color: "primary.dark"}}>
                                            <detail.icon/>
                                        </Typography>
                                        <Typography variant="h5" margin="15px">{detail.text[0]}</Typography>
                                        <Typography variant="body2">{detail.text[1]}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Container>
                    </Container>
                </div>
            </Fade>
        </VisibilitySensor>
    </>
}

export default Home;
