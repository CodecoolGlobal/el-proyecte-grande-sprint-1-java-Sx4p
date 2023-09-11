import {ReactElement} from "react";
import {AppBar, SvgIconTypeMap, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import QuizIcon from '@mui/icons-material/Quiz';
import CreateIcon from '@mui/icons-material/Create';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {Link, Outlet} from "react-router-dom"
import Box from "@mui/material/Box";
import QuizBuzzLogo from "../images/QuizBuzzLogo.png";

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
    return (
        <>
            <AppBar variant="elevation" position={"sticky"}
                    sx={{marginBottom: "2vh", backgroundColor: "#242426"}}>
                <Toolbar>
                    <Link to={"/"}><Box component={"img"} src={QuizBuzzLogo} alt={"QuizBuzz logo"} height={70}/></Link>
                    {pages.map((page: Page, i) => (
                        <Link to={page.path} key={i}>
                            <MenuItem>
                                <Typography sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    margin: '3px',
                                    fontWeight: '600'
                                }}>
                                    <page.icon sx={{marginRight: '8px'}}/>
                                    {page.name}
                                </Typography>
                            </MenuItem>
                        </Link>
                    ))}
                    <Button sx={{marginLeft: "auto", backgroundColor: "secondary.main", borderRadius: "50px"}}
                            href="/login">
                        <LoginIcon sx={{color: "white"}}/>
                    </Button>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </>
    );
}

export default Layout;