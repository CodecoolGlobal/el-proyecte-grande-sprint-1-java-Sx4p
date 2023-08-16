import {ReactElement} from "react";
import {AppBar, SvgIconTypeMap, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import QuizIcon from '@mui/icons-material/Quiz';
import CreateIcon from '@mui/icons-material/Create';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {Link} from "react-router-dom"

interface Page {
    name: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    path: string
}

const pages: Page[] = [
    {"name": 'Quiz List', "icon": FormatListBulletedIcon, path: "/list"},
    {"name": 'My Quizzes', "icon": QuizIcon, path: "/my/quizzes"},
    {"name": 'Create Quiz', "icon": CreateIcon, path: "/create/quiz"}
];

function Layout(): ReactElement {
    return (
        <Container className={"header"}>
            <AppBar variant="elevation">
                <Toolbar>
                    <Typography variant="h6" component="a" href="/"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: '5px',
                            marginRight: '8px'
                        }}>
                        QuizBuzz
                    </Typography>
                    {pages.map((page: Page, i) => (
                        <Link to={page.path}>
                        <MenuItem key={i}>
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
                    <Button sx={{marginLeft: "auto"}} href="/login">
                        <LoginIcon sx={{color: "white"}}/>
                    </Button>
                </Toolbar>
            </AppBar>
        </Container>
    );
}

export default Layout;