import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            <p>&copy; 2023 To-Do List App</p>
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const LoginPage = ({}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setEmailError("");
        setPasswordError("");

        // email and password validation
        if (!email) {
            setEmailError("Email is required");
            setLoading(false);
            return;
        }
        if (!password) {
            setPasswordError("Password is required");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(
                "http://localhost:5000/user/login",
                {
                    email,
                    password,
                }
            );
            console.log(data);
            const userData = data.user;
            if (rememberMe) {
                localStorage.setItem("userInfo", JSON.stringify(userData));
            } else {
                sessionStorage.setItem("userInfo", JSON.stringify(userData));
            }
            navigate("/"); // Redirect after login
        } catch (error) {
            setError(
                error.response?.data?.message || "An unexpected error occurred"
            );
        }
        setLoading(false);
    };

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe); // Toggle "Remember Me" state
    };

    useEffect(() => {
        const userInfo =
            localStorage.getItem("userInfo") ||
            sessionStorage.getItem("userInfo");
        if (userInfo) {
            navigate("/"); // Redirect if user is already logged in
        }
    }, [navigate]);

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                {loading && <Loading />}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    {error && <ErrorMessage message={error}></ErrorMessage>}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            error={!!passwordError}
                            helperText={passwordError}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    checked={rememberMe}
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>

                        <Link to="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;
