import React, {ReactElement} from "react";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props{
    handleDeleteQuiz: Function,
    quizName: string
}

function DeleteQuizButton({handleDeleteQuiz, quizName}: Props): ReactElement{
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}><DeleteForeverIcon/></Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete " + quizName + "?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {handleClose(); handleDeleteQuiz()}} autoFocus>
                        Confirm delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteQuizButton;