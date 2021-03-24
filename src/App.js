import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Nav from "./Components/Nav/Nav";
import s from './App.module.css';
import {BrowserRouter, Route} from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import News from "./Components/News/News";
import Settings from "./Components/Settings/Settings";


const App = (props) => {
    return (
        <BrowserRouter>
            <div className={s.AppWrapper}>
                <Header/>
                <div className={s.main}>
                    <Nav/>
                    <div className={s.content}>
                        <Route path="/Profile" render={() => <Profile profilePage={props.state.profilePage} addPost = {props.addPost} postTextChange = {props.postTextChange} />}/>
                        <Route exact path="/" render={() => <Profile profilePage={props.state.profilePage} addPost = {props.addPost} postTextChange = {props.postTextChange}/>}/>
                        <Route path="/Dialogs" render={() => <Dialogs dialogsPage={props.state.dialogsPage} sendMassage = {props.sendMassage} massageTextChange = {props.massageTextChange}/>}/>
                        <Route path="/News" render={() => <News/>}/>
                        <Route path="/Settings" render={() => <Settings/>}/>
                    </div>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
