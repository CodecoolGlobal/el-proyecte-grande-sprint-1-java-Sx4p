import React, {ReactElement} from "react";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";

interface Props {
    handleDeleteQuiz: Function,
    quizName: string
}

function DeleteQuizButton({handleDeleteQuiz, quizName}: Props): ReactElement {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{marginLeft: "10px"}}>
            <Button onClick={handleClickOpen} variant={"contained"} color={"error"}
                    sx={{borderRadius: "30px"}}><DeleteForeverIcon/></Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" color={"black"}>
                    {"Are you sure you want to delete " + quizName + "?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose();
                        handleDeleteQuiz()
                    }} autoFocus>
                        Confirm delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default DeleteQuizButton;