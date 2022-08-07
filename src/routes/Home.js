import React, {useEffect, useState} from "react";
import {dbService} from "fbase";
import { collection, addDoc, getDocs, query, onSnapshot, doc, orderBy } from "firebase/firestore";
import { async } from "@firebase/util";
import Nweet from "components/Nweet";

 const Home = ( {userObj} ) => {
    
    const [tweet, setTweet] = useState("");
    const [ntweets, setNtweets] = useState([]);
    

    useEffect(() => {
        const q = query(collection(dbService, "ntweet"));
        onSnapshot(q, snapshot => {
            const tweetArr = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }));

            setNtweets(tweetArr);
        })
        // getNtweets();
    }, []);
    const onSubmit = async(event) => {
        event.preventDefault();
        await addDoc(collection(dbService,"ntweet"),{
            text: tweet, 
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });    
        setTweet("");
 }
    const onChange = (e) => {
        const {
            target: { value }, 
        } = e;
        setTweet(value);
    }
    
 return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Tweet" />
            </form>
            <div>
                {ntweets.map((nweet) => (
                  <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                   )
                )}
            </div>
        </div>
    );
 };

 export default Home;