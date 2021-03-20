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


const App = () => {
    return (
        <BrowserRouter>
            <div className={s.AppWrapper}>
                <Header/>
                <div className={s.main}>
                    <Nav/>
                    <div className={s.content}>
                        <Route path="/Profile" component={Profile}/>
                        <Route path="/Dialogs" component={Dialogs}/>
                        <Route path="/News" component={News}/>
                        <Route path="/Settings" component={Settings}/>

                    </div>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
