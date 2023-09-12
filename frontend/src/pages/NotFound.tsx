import Typography from "@mui/material/Typography";
import {ReactElement} from "react";

interface Props {
    variant?: string
}

function NotFound({variant}:Props): ReactElement{

    if(variant == "QUIZ"){
        return (<>
            <Typography variant={"h1"}>Quiz not found</Typography>
        </>);
    } else {
        return <>
            <Typography variant={"h1"}>Page not found</Typography>
        </>
    }
}

export default NotFound;