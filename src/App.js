import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Nav from "./Components/Nav/Nav";
import s from './App.module.css';
import {Route} from "react-router-dom";
import Settings from "./Components/Settings/Settings";
import DialogsPageContainer from "./Components/DialogsPage/DialogsPageContainer";
import NewsPageContainer from "./Components/NewsPage/NewsPageContainer";
import UsersPageContainer from "./Components/UsersPage/UsersPageContainer";
import ProfilePageContainer from "./Components/ProfilePage/ProfilePageContainer";


const App = () => {
    return (
            <div className={s.AppWrapper}>
                <Header/>
                <div className={s.main}>
                    <Nav/>
                    <div className={s.content}>
                        <Route exact path="/AuthUser" render={() => <ProfilePageContainer/>}/>
                        <Route path="/AuthUser/ProfilePage" render={() => <ProfilePageContainer/>}/>
                        <Route path="/AuthUser/DialogsPage" render={() => <DialogsPageContainer/>}/>
                        <Route path = "/AuthUser/UsersPage" render = {() => <UsersPageContainer/>}/>
                        <Route path="/AuthUser/NewsPage" render={() => <NewsPageContainer/>}/>
                        <Route path="/AuthUser/Settings" render={() => <Settings/>}/>
                    </div>
                </div>
                <Footer/>
            </div>
    );
}

export default App;
