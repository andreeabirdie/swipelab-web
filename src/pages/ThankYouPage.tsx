import strings from "../strings.json"
import React from "react";
import {Box, useTheme} from "@mui/material";

type ThankYouPageProps = {
    experimentId: String
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({experimentId}) => {
    const theme = useTheme();
    return (
        <div style={{textAlign: "center"}}>
            <h2>{strings.thank_you_title}</h2>
            <h3>{strings.thank_you_info}</h3>
            <h3>Email: <a href="mailto:swipelab.ku@gmail.com">swipelab.ku@gmail.com</a></h3>
            <h3>
                {strings.thank_you_participant_id}
                <span style={{ color: theme.palette.primary.main, userSelect: "text" }}>{experimentId}</span>
            </h3>
            <Box
                className="version">{strings.version}</Box>
        </div>
    );
};

export default ThankYouPage