import { Alert } from "@mui/material";
import React from "react";

const ErrorMessage = ({ message }) => {
    return <Alert severity="error">{message}</Alert>;
};

export default ErrorMessage;
