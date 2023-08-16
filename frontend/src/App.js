import "./App.css";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <Header></Header>

                <Footer></Footer>
            </Container>
        </ThemeProvider>
    );
}

export default App;
