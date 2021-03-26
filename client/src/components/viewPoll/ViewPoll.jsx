import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import axios from "axios";
import "./viewpoll.css";

export const ViewPoll = (props) => {
    const params = useParams();
    const uuid = params.uuid;

    const [poll, setPoll] = useState(null);

    const [error, setError] = useState(null);

    const [submitted, setSubmitted] = useState(false);

    const getPoll = () => {
        setError(null);
        axios
        .get(`/polls/${uuid}`)
        .then(res => {
            const answersWithVoteCheck = res.data.answers.map(ans => {
                return {
                    ...ans,
                    voted: false
                }
            })
            setPoll({...res.data, answers: answersWithVoteCheck});
        })
        .catch(err => {
            setError(err.response.data);
        })
    }

    useEffect(() => {
        getPoll();
    }, [])

    const handleAnsChange = (e, i) => {
        const checked = e.target.checked;
        setPoll(prevPoll => {
            const newAnswers = prevPoll.answers.slice().map(ans => {
                return {
                    ...ans,
                    voted: checked
                }
            });
            

            return {
                ...prevPoll,
                answers: newAnswers
            }
        })
    }

    const submitPoll = () => {
        
        const answersToSubmit = poll.answers.slice().map(ans => {
            // Remove voted field from answers
            const {voted, ...newAns} = ans;

            // Add to vote count
            return {
                ...newAns,
                votes: voted ? newAns.votes + 1: newAns.votes
            }
        })
        const pollToSubmit = {
            ...poll,
            answers: answersToSubmit
        }

        axios
        .post(`/polls/${poll.uuid}`, {poll: pollToSubmit})
        .then(res => setSubmitted(true))
        .catch(err => setError("Couldn't submit your answer, try again"))
    }

    return (
        <div>
            {(poll && !submitted) && (
            <div className="form-container">
                <h1>{poll.title}</h1>
                <p>Description: {poll.description}</p>
                <h1>Choices</h1>
                <div className="ans-container">
                    {poll.answers.map((ans, i) => (
                        <div key={ans.uuid}>
                            <label htmlFor="">{ans.text}  </label>
                            <input type="checkbox" onChange={e => handleAnsChange(e, i)}/>
                        </div>
                    ))}
                </div>
                <button className="answer-submit" onClick={submitPoll}>Submit your answer</button>
            </div>)}
            {error && <div className="error">{error}</div>}

            {submitted && <div className="submit-message">
                <p>Thanks for submitting !</p>
                <a href="/">Back to browsing</a>
                </div>}
        </div>
    )
}
