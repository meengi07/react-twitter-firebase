import { authService } from "fbase";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";

// eslint-disable-next-line import/no-anonymous-default-export
const Profile =  ({refreshUser,user}) => {
    // const [nweets, setNweets] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState(user.displayName);
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async(evnet) => {
        evnet.preventDefault();
        if(user.displayName !== newDisplayName) {
            await updateProfile(user, {
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };

    return (
    <>
        <form onSubmit={onSubmit}>
            <input 
            onChange={onChange} 
            type="text" placeholder="Display Name" 
            value={newDisplayName} />
            <input type="submit" placeholder="Update Profile "/>
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
)};

export default Profile;