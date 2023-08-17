import * as React from 'react';
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export const AddQuestionPopup = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <Box textAlign="center">
            <Button variant="outlined" onClick={handleClickOpen}
                    sx={{margin: "5px", backgroundColor: "background.paper"}}>
                Add new question
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new question to the quiz</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new question, and four answers, where one of them is the correct answer!
                    </DialogContentText>
                    <TextField autoFocus margin="dense" id="question" label="Question" type="question" fullWidth
                               variant="standard"/>
                    <TextField autoFocus margin="dense" id="right" label="Correct answer" type="right" fullWidth
                               variant="standard"/>
                    <TextField autoFocus margin="dense" id="answer2" label="Answer" type="right" fullWidth
                               variant="standard"/>
                    <TextField autoFocus margin="dense" id="answer3" label="Answer" type="right" fullWidth
                               variant="standard"/>
                    <TextField autoFocus margin="dense" id="answer4" label="Answer" type="right" fullWidth
                               variant="standard"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add question</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};