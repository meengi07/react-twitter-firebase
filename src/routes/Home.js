import React, {useEffect, useState} from "react";
import {ref, uploadString,getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from 'uuid';
import {dbService, storageService} from "fbase";
import { collection, addDoc, getDocs, query, onSnapshot, doc, orderBy } from "firebase/firestore";
import { async } from "@firebase/util";
import Nweet from "components/Nweet";

 const Home = ( {userObj} ) => {
    
    const [tweet, setTweet] = useState("");
    const [ntweets, setNtweets] = useState([]);
    const [attachment, setAttachment] = useState("");

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
        let attachmentUrl = "";
        if(attachment != "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);    
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
        }
    
        const nweetObj = {
            text: tweet, 
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };
        await addDoc(collection(dbService,"ntweet"), nweetObj);    
        setTweet("");
        setAttachment("");
 }
    const onChange = (e) => {
        const {
            target: { value }, 
        } = e;
        setTweet(value);
    }
    const onFileChange = (event) => {
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;    
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const ClearAttachment = () => setAttachment(null);
 return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Tweet" />
                {attachment && (
                <div>
                    <img src={attachment} width="100px" height="100px" />
                    <button onClick={ClearAttachment}>Clear</button>
                </div>
                    )}
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