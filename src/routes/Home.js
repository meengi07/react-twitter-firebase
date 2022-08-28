import React, {useEffect, useState} from "react";
import {dbService} from "fbase";
import { collection,  query, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

 const Home = ( {userObj} ) => {
    
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
   
   
 return (
        <div>
           <NweetFactory userObj={userObj} />
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