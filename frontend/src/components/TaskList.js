import { React, useState, useEffect, cloneElement } from "react";
import { makeStyles } from "@mui/styles";
import {
    List,
    ListItem,
    IconButton,
    ListItemText,
    Button,
    Modal,
    Backdrop,
    Fade,
    Box,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { Container } from "@mui/system";

function generate(element) {
    return [0, 1, 2].map((value) =>
        cloneElement(element, {
            key: value,
        })
    );
}

const useStyles = makeStyles((theme) => ({
    modalButton: {
        display: "flex",
        justifyContent: "center",
        padding: "20px",
    },
    textField: {
        width: "100%", // Adjust this value to change the width as needed
    },
    buttonDiv: {
        display: "flex",
        justifyContent: "end",
        width: "100%",
        alignItems: "center",
        padding: "10px",
    },
    buttonStyle: {
        margin: "10px",
    },
}));

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const TaskList = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [task, setTask] = useState([]);
    const [taskName, setTaskName] = useState("");
    const id = "64db20ab63fd90ea4b654529";

    const addNewTask = async () => {
        try {
            await axios.post(`http://localhost:5000/task/`, {
                name: "taskName",
            });
            fetchTasks();
        } catch (error) {
            console.error("Error adding new task:", error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/task/${id}`
            );
            setTask(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleInputChange = (e) => {
        setTaskName(e.target.value);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Container>
            <div>
                <div className={classes.modalButton}>
                    <Button
                        onClick={handleOpen}
                        variant="contained"
                        size="medium"
                    >
                        Add new task
                    </Button>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Task
                            </Typography>
                            {taskName}
                            <TextField
                                required
                                id="filled-required"
                                placeholder="Write your new task"
                                variant="filled"
                                className={classes.textField}
                                value={taskName} // Controlled component with the task state
                                onChange={handleInputChange}
                            />
                            <div className={classes.buttonDiv}>
                                <div className={classes.buttonStyle}>
                                    <Button
                                        variant="contained"
                                        href="#contained-buttons"
                                        color="success"
                                        onClick={addNewTask}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className={classes.buttonStyle}>
                                    <Button
                                        variant="contained"
                                        href="#contained-buttons"
                                        color="error"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
            <List>
                {generate(
                    <ListItem
                        secondaryAction={
                            <div>
                                <IconButton edge="end" aria-label="create">
                                    <CreateIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        }
                    >
                        <ListItemText>Single-line item</ListItemText>
                    </ListItem>
                )}
            </List>
        </Container>
    );
};

export default TaskList;
