import React, { useState } from 'react'
import "./pollbrowser.css";
import { useHistory } from "react-router-dom";

export const PollSnippet = ({poll}) => {

    let history = useHistory();

    const [hovering, setHovering] = useState(false);


    const toPoll = () => {
        /* redirect to poll */
        history.push(`/poll/${poll.uuid}`)
    }

    return (
        <div className="pollsnippet-container" 
        onClick={toPoll} 
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        >
            <div>
                <h1>{poll.title}</h1>
            </div>
            <div>
                {hovering && <p>Description: {poll.description}</p>}
            </div>
        </div>
    )
}
