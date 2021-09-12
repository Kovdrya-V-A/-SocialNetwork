import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import s from './App.module.css';
import {Route} from "react-router-dom";
import SettingsContainer from "./Components/Settings/Settings";
import NewsPageContainer from "./Components/NewsPage/NewsPageContainer";
import UsersPageContainer from "./Components/UsersPage/UsersPageContainer";
import ProfilePageContainer from "./Components/ProfilePage/ProfilePageContainer";
import FriendsPageContainer from "./Components/FriendsPage/FriendsPageContainer";
import NavContainer from "./Components/Nav/NavContainer";
import WithRouterDialogsPageContainer from "./Components/DialogsPage/DialogsPageContainer";
import WithRouterSelectedProfilePageContainer from "./Components/SelectedProfilePage/SelectedProfilePageContainer";
import {connect} from "react-redux";
import {checkAuthMeThunkCreator, setSessionIsStartThunkCreator} from "./Redux/Reducers/AppReducer";

const mapStateToProps = (state) => {
    return {
        auth: state.authorizationPage.auth,
        sessionIsStart: state.app.sessionIsStart
    }
}

class App extends React.Component {
    componentDidMount() {
        this.props.setSessionIsStartThunkCreator()
    }

    render() {
        if (!this.props.sessionIsStart) {
            return <div>ЖДИ, ЛОХ ЕБУЧИЙ</div>
        }
        return (
            <div className={s.AppWrapper}>
                <Header/>
                <div className={s.main}>
                    <NavContainer/>
                    <div className={s.content}>
                        <Route exact path="/AuthUser" render={() => <ProfilePageContainer/>}/>
                        <Route path="/AuthUser/ProfilePage" render={() => <ProfilePageContainer/>}/>
                        <Route path="/AuthUser/DialogsPage/:dialogId?"
                               render={() => <WithRouterDialogsPageContainer/>}/>
                        <Route exact path="/AuthUser/UsersPage" render={() => <UsersPageContainer/>}/>
                        <Route path="/AuthUser/NewsPage" render={() => <NewsPageContainer/>}/>
                        <Route path="/AuthUser/Settings" render={() => <SettingsContainer/>}/>
                        <Route path="/AuthUser/userPage/:userId?"
                               render={() => <WithRouterSelectedProfilePageContainer/>}/>
                        <Route exact path="/AuthUser/FriendsPage" render={() => <FriendsPageContainer/>}/>
                    </div>
                </div>
                <Footer/>
            </div>
        );

    }
}


export default connect(mapStateToProps, {
    checkAuthMeThunkCreator,
    setSessionIsStartThunkCreator
})(App);
