import React from "react";
import {
    Divider,
    IconButton,
    Toolbar,
    Typography,
    Container,
    Menu,
    MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircleSharp";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    tagline: {
        fontSize: 20,
        textTransform: "uppercase",
        justifyContent: "center",
        fontFamily: "sans-serif",
    },
}));

const Header = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        // dispatch(logout());
        // navigate("/");
    };

    return (
        <AppBar position="static" color="inherit">
            <Container maxWidth="xl">
                <Toolbar>
                    <IconButton color="inherit">
                        <AdbIcon sx={{ display: { md: "flex" } }} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        className={classes.title}
                    >
                        To-Do List
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircleIcon
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        ></AccountCircleIcon>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
                <Divider></Divider>
                <Toolbar className={classes.tagline}>
                    This is a to-do list app
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
