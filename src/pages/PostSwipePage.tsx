import React from "react";
import {Link} from "react-router-dom";

const PostSwipePage : React.FC = () => (
    <>
        <ul>
            <li><Link to="/">Go to onboarding</Link></li>
            <li><Link to="/thankyou">Go to Thank You page</Link></li>
        </ul>
    </>
)

export default PostSwipePage