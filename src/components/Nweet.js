import { async } from "@firebase/util";
import { dbService } from "fbase";
import {doc, deleteDoc, updateDoc} from "firebase/firestore"
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const nweetRef = doc(dbService, "ntweet", `${nweetObj.id}`);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want delete this nweet?");
        if(ok) {
            await deleteDoc(nweetRef);
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async(event) => {
        event.preventDefault();
        await updateDoc(nweetRef, {
            text:newNweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {target:{value},
        } = event;
        setNewNweet(value);
    };
    return (
        <div>
            {editing ? (
            <>
              {isOwner &&  ( 
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your nweet" value={newNweet} required onChange={onChange}/>
                        <input type="submit" value="Update nweet" />
                    </form> 
                    <button onClick={toggleEditing}>Cancel</button>
                </>
                )}
            </>
            ) : (
            <>
                <h4>{nweetObj.text}</h4>
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Edit Nweet</button>    
                    </>
                )}
            </>
            )}
        </div>
)};

export default Nweet;