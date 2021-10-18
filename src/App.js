import React, {Suspense} from 'react';
import s from './App.module.css';
import {Redirect, Route} from "react-router-dom";
import SettingsContainer from "./Components/Settings/Settings";
import NewsPageContainer from "./Components/NewsPage/NewsPageContainer";
import ProfilePageContainer from "./Components/ProfilePage/ProfilePageContainer";
import FriendsPageContainer from "./Components/FriendsPage/FriendsPageContainer";
import NavContainer from "./Components/Nav/NavContainer";
import WithRouterDialogsPageContainer from "./Components/DialogsPage/DialogsPageContainer";
import {connect} from "react-redux";
import {checkAuthMeThunkCreator, setSessionIsStartThunkCreator} from "./Redux/Reducers/AppReducer";
import {MainPreloader} from "./Assets/Preloaders/mainPreloader";
import {CheckAuthRedirect} from "./HOC/CheckAuth";

const UsersPageContainer = React.lazy(() => import('./Components/UsersPage/UsersPageContainer'))

const mapStateToProps = (state) => {
    return {
        sessionIsStart: state.app.sessionIsStart
    }
}

class App extends React.Component {
    componentDidMount() {
        if (localStorage.getItem("userToken")) {
            this.props.setSessionIsStartThunkCreator()
        }
    }

    render() {
        if (!this.props.sessionIsStart) {
            if (!localStorage.getItem("userToken")) {
                return <Redirect to={"/"}/>
            }
            return <div className={s.preloaderBar}>
                <MainPreloader/>
            </div>
        }
        return (
            <div className={s.wrapper}>
                <NavContainer/>
                <div className={s.content}>
                    <Route path="/AuthUser/ProfilePage/:profileId?" render={() => <ProfilePageContainer/>}/>
                    <Route path="/AuthUser/DialogsPage/:dialogId?"
                           render={() => <WithRouterDialogsPageContainer/>}/>
                    <Route exact path="/AuthUser/UsersPage" render={() => <Suspense
                        fallback={<div className={s.lazyLoadPreloaderBar}><MainPreloader/></div>}>
                        <UsersPageContainer/>
                    </Suspense>

                    }/>

                    <Route path="/AuthUser/NewsPage" render={() => <NewsPageContainer/>}/>
                    <Route path="/AuthUser/Settings" render={() => <SettingsContainer/>}/>
                    <Route exact path="/AuthUser/FriendsPage" render={() => <FriendsPageContainer/>}/>
                </div>
            </div>
        );

    }
}


export default connect(mapStateToProps, {
    checkAuthMeThunkCreator,
    setSessionIsStartThunkCreator,
    CheckAuthRedirect
})(App);
