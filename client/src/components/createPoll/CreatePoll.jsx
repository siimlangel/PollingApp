import React, {useState} from 'react'
import axios from "axios";

import {useSelector} from "react-redux";

import "./createpoll.css";

export const CreatePoll = () => {

    const token = useSelector(state => state.token);

    const [error, setError] = useState(null);
    const [link, setLink] = useState(null);

    const initialState = {
        title: "",
        description: "",
        answers: [
            {
                text: "",
                votes: 0,
            }
        ]
    }

    const [poll, setPoll] = useState(initialState)

    const addAns = () => {
        if (poll.answers.length > 10) return
        setPoll(prevPoll => {
            return {
                ...prevPoll,
                answers: [...prevPoll.answers, {text: "", votes:0}]
            }
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        setError(null);
        // Remove blank answers
        const pollToSubmit = {
            ...poll,
            answers: poll.answers.filter(ans => ans.text !== "")
        };

        axios
        .post("/users/polls",{poll: pollToSubmit}, {headers: {Authorization: token}})
        .then(res => {
            setPoll(initialState);
            const pollLink = `http://localhost:3000/poll/${res.data.uuid}`;
            setLink(pollLink);
        })
        .catch(err => {
            setError("Couldn't save your poll, try again");
            console.log(err.response);
        });
        
    }

    const handleChange = e => {
        e.persist();
        
        setPoll(prevPoll => {
            return {
                ...prevPoll,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleAnsChange = (e, i) => {
        e.persist();
        setPoll(prevPoll => {
            const prevAnswers = prevPoll.answers.slice();
            prevAnswers[i].text = e.target.value;
            
            return {
                ...prevPoll,
                answers: prevAnswers
            }
        })
    }

    return (
        <div>
            <h1 className="createpoll-title">Create your poll here !</h1>
            
            <form onSubmit={onSubmit}>
                <label htmlFor="">Title: </label>
                <input value={poll.title} required type="text" name="title" onChange={handleChange}/>

                <label htmlFor="">Description: </label>
                <input value={poll.description} required type="text" name="description" onChange={handleChange}/>
                <h2>Answers: </h2>
                {poll.answers.map((ans, i) => {
                    return (
                        <div key={i}>
                            
                            <input
                            className="answer-input"
                            type="text" 
                            value={ans.text}
                            placeholder="answer" 
                            onChange={(e) => handleAnsChange(e, i)} 
                            onClick={i == poll.answers.length -1 ? addAns: undefined} 
                            onFocus={i == poll.answers.length -1 ? addAns: undefined} />

                            
                        </div>
                    );
                })}

                <button type="submit" className="savepoll-btn"> Save </button>
            </form>
            {error && <div>{error}</div>}
            {link && <div className="linktopoll-container">Link to your poll: <a href={link}>{link}</a></div>}
        </div>
    )
}
