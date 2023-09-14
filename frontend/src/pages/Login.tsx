import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ReactElement, useEffect, useState} from "react";
import {CardMedia, Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";
import quizLogo from "../images/quizlogo.png";

export default function Login(): ReactElement {
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoginFailed(false);
        const loginData = new FormData(event.currentTarget);
        try {
            const res = await fetch("/api/user/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": loginData.get("username"),
                        "password": loginData.get("password")
                    })
                }
            );
            if (res.status === 200) {
                const response = await res.json();
                localStorage.setItem("token", response["token"]);
                localStorage.setItem("username", response["username"]);
                navigate("/list")
            } else {
                setLoginFailed(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/list");
        }
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <CardMedia sx={{padding: "1em 1em 0 1em", objectFit: "contain"}}
                           object-fit={"none"} component={"img"}
                           height="150px"
                           width="150px"
                           image={quizLogo}
                />
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        sx={{
                            "& fieldset": {
                                borderColor: "primary.light"
                            },
                            "&:hover fieldset": {
                                borderWidth: 2
                            },
                            "& label": {
                                color: "white"
                            }
                        }}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        sx={{
                            "& fieldset": {
                                borderColor: "primary.light"
                            },
                            "&:hover fieldset": {
                                borderWidth: 2
                            },
                            "& label": {
                                color: "white"
                            }
                        }}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href={"/register"} variant="body2">
                                {"Don't have an account? Register!"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar open={loginFailed} autoHideDuration={5000} onClose={() => setLoginFailed(false)}>
                <Alert severity={"error"}>
                    Incorrect username/password!
                </Alert>
            </Snackbar>
        </Container>
    );
}