// import { authService } from "fbase";
import React, {useState} from "react";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authService } from "fbase";

const Auth = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [newAccount, setNewAccount] = useState(true);
const [error, setError] = useState("");
const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email") {
        setEmail(value);
    } else if(name === "password") {
        setPassword(value);
    }
};
const onSubmit = async(event) => {
    event.preventDefault();
    try{
        let data;
        if(newAccount) {
            //create account
            const auth = getAuth();
            data = await createUserWithEmailAndPassword(
                auth, email, password
            );
        } else {
            //Log in
            const auth = getAuth();
            data = await signInWithEmailAndPassword(
                auth, email, password
            );
        }   
        console.log(data);
    } catch(error) {
        setError(error.message)
    }
    
};
const toggleAccount = () => setNewAccount((prev) => !prev);
const onSocialClick = async (event) => {
    const {
        target: { name },
    } = event;
    const auth = getAuth();
    
    if(name === "google") {
        let google = new GoogleAuthProvider();
        let data = await signInWithPopup(auth, google);
        let credential = GoogleAuthProvider.credentialFromResult(data);
        let token = credential.accessToken;
        let user = data.user;
       
    } else if (name === "github") {
        let github = new GithubAuthProvider();
        let data = await signInWithPopup(auth, github);
        let credential = GithubAuthProvider.credentialFromResult(data);
        let token = credential.accessToken;
        let user = data.user;
    }
    

}
return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
            {error}
        </form>
        <span onClick={toggleAccount}>
            {newAccount ? "Sign in" : "Create Account"}
        </span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with GitHub</button>
        </div>
    </div>    
    );

}


export default Auth;