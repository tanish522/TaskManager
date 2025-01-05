import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "../components/Loading";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

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

const defaultTheme = createTheme();
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const SignUpPage = () => {
    const [loading, setLoading] = new useState(false);
    const [error, setError] = new useState(false);
    const navigate = useNavigate();

    // yup and formik email and password verification
    const validationSchema = yup.object({
        userName: yup
            .string("Enter your username")
            .min(3, "Username should be at least 3 characters")
            .required("Username is required"),
        email: yup
            .string("Enter your email")
            .email("Enter a valid email")
            .required("Email is required"),
        password: yup
            .string("Enter your password")
            .min(8, "Password should be at least 8 characters")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\-_]+$/,
                "Password must contain at least one letter and one number"
            )
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setError("");
            try {
                await axios.post("http://localhost:5000/user/signup", values);
                navigate("/login");
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "An unexpected error occurred"
                );
            } finally {
                setLoading(false);
            }
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(event.currentTarget);

            await axios.post("http://localhost:5000/user/signup", {
                userName: formData.get("userName"),
                email: formData.get("email"),
                password: formData.get("password"),
            });
            alert("Sign up successful");
            // navigate to /login
            navigate("/login");
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                // Handle specific 400 error (Email already in use)
                if (error.response.data.message === "Email already in use") {
                    alert(
                        "The email is already in use. Please use a different email address."
                    );
                } else {
                    alert("An unexpected error occurred. Please try again.");
                }
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
        setLoading(false);
    };

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
                        Sign up
                    </Typography>
                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="UserName"
                                    autoFocus
                                    {...formik.getFieldProps("userName")}
                                    error={
                                        formik.touched.userName &&
                                        Boolean(formik.errors.userName)
                                    }
                                    helperText={
                                        formik.touched.userName &&
                                        formik.errors.userName
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    {...formik.getFieldProps("email")}
                                    error={
                                        formik.touched.email &&
                                        Boolean(formik.errors.email)
                                    }
                                    helperText={
                                        formik.touched.email &&
                                        formik.errors.email
                                    }
                                    inputProps={{
                                        style: { textTransform: "lowercase" },
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...formik.getFieldProps("password")}
                                    error={
                                        formik.touched.password &&
                                        Boolean(formik.errors.password)
                                    }
                                    helperText={
                                        formik.touched.password &&
                                        formik.errors.password
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <Loading size={24} /> : "Sign Up"}
                        </Button>
                        <Link to="/login" variant="body2">
                            Already have an account? Log in
                        </Link>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
};

export default SignUpPage;
