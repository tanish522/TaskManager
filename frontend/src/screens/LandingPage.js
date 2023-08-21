import "../App.css";
import { Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TaskList from "../components/TaskList";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    footer: {
        marginTop: "auto",
    },
}));

function LandingPage() {
    const classes = useStyles();
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <div className={classes.mainContainer}>
                    <Header></Header>
                    <div className={classes.content}>
                        <TaskList></TaskList>
                    </div>
                    <div className={classes.footer}>
                        <Footer></Footer>
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default LandingPage;
