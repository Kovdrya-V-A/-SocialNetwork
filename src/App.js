import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import s from './App.module.css';
import {Route} from "react-router-dom";
import Settings from "./Components/Settings/Settings";
// import DialogsPageContainer from "./Components/DialogsPage/DialogsPageContainer";
import NewsPageContainer from "./Components/NewsPage/NewsPageContainer";
import UsersPageContainer from "./Components/UsersPage/UsersPageContainer";
import ProfilePageContainer from "./Components/ProfilePage/ProfilePageContainer";
// import SelectedProfilePageContainer from "./Components/SelectedProfilePage/SelectedProfilePageContainer";
import FriendsPageContainer from "./Components/FriendsPage/FriendsPageContainer";
import NavContainer from "./Components/Nav/NavContainer";
import WithRouterDialogsPageContainer from "./Components/DialogsPage/DialogsPageContainer";
import WithRouterSelectedProfilePageContainer from "./Components/SelectedProfilePage/SelectedProfilePageContainer";

const App = () => {
    return (
            <div className={s.AppWrapper}>
                <Header/>
                <div className={s.main}>
                    <NavContainer/>
                    <div className={s.content}>
                        <Route exact path="/AuthUser" render={() => <ProfilePageContainer/>}/>
                        <Route path="/AuthUser/ProfilePage" render={() => <ProfilePageContainer/>}/>
                        <Route path="/AuthUser/DialogsPage/:dialogId?" render={() => <WithRouterDialogsPageContainer/>}/>
                        <Route exact path = "/AuthUser/UsersPage" render = {() => <UsersPageContainer/>}/>
                        <Route path="/AuthUser/NewsPage" render={() => <NewsPageContainer/>}/>
                        <Route path="/AuthUser/Settings" render={() => <Settings/>}/>
                        <Route path="/AuthUser/userPage/:userId?" render={() => <WithRouterSelectedProfilePageContainer/>}/>
                        <Route exact path="/AuthUser/FriendsPage" render={() => <FriendsPageContainer/>}/>
                    </div>
                </div>
                <Footer/>
            </div>
    );
}

export default App;
