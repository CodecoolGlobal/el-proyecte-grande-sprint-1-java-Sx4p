import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {ReactElement} from "react";

interface Props {
    message: string;
}

export default function ErrorAlert({message}: Props): ReactElement {
    return (
        <Stack sx={{width: "100%"}} spacing={2}>
            <Alert variant="filled" severity="error" className="errorAlert">
                {message}
            </Alert>
        </Stack>
    );
}