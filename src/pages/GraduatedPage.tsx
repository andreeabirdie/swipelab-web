import {Box} from "@mui/material";
import strings from "../strings.json";
import React from "react";

const GraduatedPage: React.FC = () => {
    return (
        <div style={{textAlign: "center"}}>
            <h2>{strings.final_thanks}</h2>
            <h3>{strings.final_info}</h3>
            <br/>
            <h3>{strings.final_poster}</h3>
            <h3>You can still email us at <a href="mailto:swipelab.ku@gmail.com">swipelab.ku@gmail.com</a> for any questions.</h3>
            <br/>
            <h3><a href={strings.dk_link}>Access through the Royal Danish Library</a></h3>
            <h3><a href={strings.research_gate_link}>Request access on ResearchGate</a></h3>
            <Box
                className="version">{strings.version}</Box>
        </div>
    );
}

export default GraduatedPage