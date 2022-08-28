// import { authService } from "fbase";
import React from "react";
import { getAuth, GithubAuthProvider, GoogleAuthProvider,  signInWithPopup } from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {

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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
       <AuthForm />
        <div className="authBtns">
            <button onClick={onSocialClick} name="google" className="authBtn" >Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
            <button onClick={onSocialClick} name="github" className="authBtn">Continue with GitHub <FontAwesomeIcon icon={faGithub} /></button>
        </div>
    </div>    
    );

}


export default Auth;