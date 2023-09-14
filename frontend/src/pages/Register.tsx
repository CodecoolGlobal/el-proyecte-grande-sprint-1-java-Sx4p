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
import quizLogo from "../images/quizlogo.png"
import {useNavigate} from "react-router-dom";

export default function Register(): ReactElement {
    const [registrationFailed, setRegistrationFailed] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setRegistrationFailed(false);
        setRegistered(false);
        const loginData = new FormData(event.currentTarget);
        try {
            const res = await fetch("/api/user/register", {
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
                setRegistered(true);
            } else {
                if (res.status === 422) {
                    setErrorMessage("The password must be at least 8 characters!");
                }
                if (res.status === 409) {
                    setErrorMessage("This username is already taken!");
                }
                setRegistrationFailed(true);
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
                <CardMedia object-fit={"none"} component={"img"}
                           sx={{padding: "1em 1em 0 1em", objectFit: "contain"}}
                           height="150px"
                           image={quizLogo}
                />
                <Typography component="h1" variant="h5">
                    Register
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
                        registration
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href={"/login"} variant="body2">
                                {"Have an account? Log In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar open={registrationFailed} autoHideDuration={5000}>
                <Alert severity={"error"}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={registered} autoHideDuration={5000}>
                <Alert severity={"success"}>
                    Successful registration! Please log in!
                </Alert>
            </Snackbar>
        </Container>
    );
}