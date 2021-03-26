import React, { useState, useEffect} from 'react'

import axios from "axios";
import { PollSnippet } from './PollSnippet';
import "./pollbrowser.css";
import { Loader } from '../loader/Loader';


export const PollBrowser = () => {

    const [polls, setPolls] = useState([]);
    const [endReached, setEndReached] = useState(false);
    const [loading, setLoading] = useState(false);



    // Generator to fetch polls n at a time
    const getPolls = async function* (){
        const limit = 2; /* polls to fetch at one time */
        let offset = 0; /* index of poll to start from */
        let totalCount = -1; /* check to stop when all polls fetched */
        
        while (offset === 0 || offset < totalCount) {
            
            try {
                setLoading(true);
                const response = await axios
                .get(`/polls/paginate/${offset}/${limit}`);
                
                
                offset += limit; 
                
                totalCount = response.data.totalCount; /* get total number of polls */
            
                const polls = response.data.polls;

                setLoading(false);

                yield polls;
            } catch (e) {
                yield {
                    done: true,
                    value: "error"
                }
            };
        }
    }
    
    // Initalize generator
    const [pollGenerator, setPollGenerator] = useState(getPolls());
    
    const paginate = () => {
        
        pollGenerator.next().then(iterResult => {

            // No more polls to paginate
            if (iterResult.done) {
                setEndReached(true);
                return;
            } 

            setPolls(prevPolls => {
                return [
                    ...prevPolls,
                    ...iterResult.value
                ]
            })
        })
    }

    useEffect(() => {
        pollGenerator.next().then(iterResult => {

            // No more polls to paginate
            if (iterResult.done) {
                setEndReached(true);
                return;
            } 

            setPolls(prevPolls => {
                return [
                    ...prevPolls,
                    ...iterResult.value
                ]
            })
        })
    }, [pollGenerator])





    return (
        <div>
            <div className="pollbrowser-title">Click on a poll to view it</div>
            {polls.map(poll => (
                <PollSnippet key={poll.uuid} poll={poll} />
            ))}
            <div style={{height: "200px"}}></div>
            {loading && <Loader />}
            {!endReached && <div className="loadmore-btn-container"><button onClick={paginate} className="loadmore-btn">Load More</button></div>}
            {endReached && <div className="scrollend-container">Congrats you found the last poll!</div>}
            <div style={{height: "40px"}}></div>
        </div>

    )
}
