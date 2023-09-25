import {ReactElement} from "react";
import {AppBar, SvgIconTypeMap, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import QuizIcon from '@mui/icons-material/Quiz';
import CreateIcon from '@mui/icons-material/Create';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {Link, Outlet, useNavigate} from "react-router-dom"
import Box from "@mui/material/Box";
import QuizBuzzLogo from "../images/QuizBuzzLogo.png";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

interface Page {
    name: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    path: string
}

const pages: Page[] = [
    {"name": 'Quiz List', "icon": FormatListBulletedIcon, path: "/list"},
    {"name": 'My Quizzes', "icon": QuizIcon, path: "/myquizzes"},
    {"name": 'Create Quiz', "icon": CreateIcon, path: "/create/quiz"}
];

function Layout(): ReactElement {
    const navigate = useNavigate();
    const handleLog = () => {
       if(localStorage.getItem("username") === null) {
           navigate("/login")
       } else {
           localStorage.clear()
           navigate("/")
       }
    }

    return (
        <>
            <AppBar variant="elevation" position={"sticky"}
                    sx={{marginBottom: "2vh", backgroundColor: "#242426"}}>
                <Toolbar>
                    <Link to={"/"}><Box component={"img"} src={QuizBuzzLogo} alt={"QuizBuzz logo"} height={70}/></Link>
                    {pages.map((page: Page, i: number) => (
                        <Link to={page.path} key={i}>
                            <MenuItem>
                                <Typography sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: '600'
                                }}>
                                    <page.icon sx={{marginRight: {md: "8px"}}}/>
                                    <Typography sx={{display: {xs: "none", md: "inline-block"}}}>
                                    {page.name}
                                      </Typography>
                                </Typography>
                            </MenuItem>
                        </Link>
                    ))}
                   <Grid container justifyContent="flex-end">
                    {localStorage.getItem("username") !== null ?
                        <Typography sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            marginRight: {xs: '9px', md: '9px', lg: '20px'},
                            fontWeight: '600'

                        }}>
                            {localStorage.getItem("username")}
                        </Typography> : null}
                    <Button sx={{ backgroundColor: "secondary.main", borderRadius: "50px"}} onClick={handleLog}>
                        {localStorage.getItem("username") === null ?
                            <LoginIcon sx={{color: "white"}}/> : <LogoutIcon sx={{color: "white"}}/>}
                    </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </>
    );
}

export default Layout;