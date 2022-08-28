// import { authService } from "fbase";
import {React} from "react";
import { HashRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({refreshUser,isLoggIn, user}) => {
    
    return (
        <div  style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}>
        <Router>
            {isLoggIn && <Navigation userObj={user} />}
            <Routes>
                {isLoggIn ? (
                     <>
                    
                        <Route exact path='/' element={<Home userObj={user}/>} />
                        <Route exact path='/Profile' element={<Profile user={user} refreshUser={refreshUser}/>}/>
                        <Route path="/" element={<Navigate replace to="/home" />} />
                    </>
                ) : (
                    <>
                        <Route exact path='/' element={<Auth/>}/>
                        
                    </>
                )}
            </Routes>
        </Router>
        </div>
    );
};

export default AppRouter;