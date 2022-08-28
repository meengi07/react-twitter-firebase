import { authService } from "fbase";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";

// eslint-disable-next-line import/no-anonymous-default-export
const Profile =  ({refreshUser,user}) => {
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
    <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input 
                onChange={onChange} 
                type="text" 
                placeholder="Display Name" 
                value={newDisplayName} 
                autoFocus 
                className="formInput"
            />
             <input
                type="submit"
                value="Update Profile"
                className="formBtn"
                style={{
                    marginTop: 10,
                }}
            />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            Log Out
        </span>
    </div>
)};

export default Profile;